import {JOIN_CHAT_REQUESTING, SEND_MESSAGE, USER_CONNECTED, USER_DISCONNECTED} from '../constants';

export function joinChatRequesting() {
  return {type: JOIN_CHAT_REQUESTING}
}

export function sendMessage(message) {
  return {type: SEND_MESSAGE, message}
}

export function userConnected(chatState) {
  return {type: USER_CONNECTED, chatState}
}

export function userDisconnected(chatState) {
  return {type: USER_DISCONNECTED, chatState}
}
