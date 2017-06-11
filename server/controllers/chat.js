import Chat from '../models/chat';

export const create = async(req, res, next) => {
  const credentials = req.body;

  let chat;
  try {
    chat = await Chat.create(credentials);
  } catch ({message}) {
    return next({status: 400, message});
  }

  res.json(chat);
}

export const getChats = async(req, res, next) => {
  const chats = await Chat.find({}, {content: 0});

  if (!chats) {
    return next({status: 400, message: 'empty'});
  }

  res.json(chats)
}

export const getChat = async(req, res, next) => {
  const _id = req.params.id;
  let chat
  try {
    chat = await Chat.findOne({_id});
    if (!chat) {
      throw new Error();
    }
  } catch ({message}) {
    return next({status: 400, message: message});
  }
  res.json(chat)
}
