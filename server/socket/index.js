import io from 'socket.io';
import socketioJwt from 'socketio-jwt';

import Chat from '../models/chat';
import config from '../config';

let usernames = [];

const socket = (server) => {
  let IO = io.listen(server);
  let chat;

  IO.use(socketioJwt.authorize({secret: config.secret, handshake: true}))

  IO.on('connection', client => {
    let chat;
    client.on('room', res => {
      chat = res;
      client.join(chat._id);
      usernames.push({user: chat.user, chatName: chat.name});
      let chatUsers = usernames.filter(item => {
        return item.chatName === chat.name
      });
      let chatState = {
        newUser: chat.user,
        countCurrentlyUsers: chatUsers.length
      }
      IO. in(chat._id).emit('connected', chatState)
    })

    client.on('disconnect', res => {
      usernames = usernames.filter((item, index) => {
        return chat.user !== item.user;
      });
      let chatUsers = usernames.filter(item => {
        return item.chatName === chat.name
      });

      let chatState = {
        lostUser: chat.user,
        countCurrentlyUsers: chatUsers.length
      }

      client.broadcast.to(chat._id).emit('disconnected', chatState)
      client.leave(chat._id)
    })

    client.on('message', message => {
      try {
        let newMessage = {
          author: message.login,
          data: message.message
        };

        Chat.update({
          _id: chat._id
        }, {
          $push: {
            'content': newMessage
          }
        }, err => {
          if (err)
            throw new Error

        })
        IO. in(chat._id).emit('client message', newMessage)
      } catch (e) {
        IO.sockets.sockets[client.id].emit('error message', 'your message was not sent')
      }
    })
  });

}

export default socket;
