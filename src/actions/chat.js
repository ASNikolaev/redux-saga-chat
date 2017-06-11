import {
  CREATE_CHAT_REQUESTING,
  GET_CHATS_REQUESTING,
  GET_CHATS_FAILURE,
  GET_CHATS_SUCCESS,
  GET_CHAT_REQUESTING,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAILURE,
  CLEAR_OUT_CHAT
} from '../constants';

export function createChatRequest() {
  return {type: CREATE_CHAT_REQUESTING}
}

export function getChatsRequest() {
  return {type: GET_CHATS_REQUESTING}
}

export function getChatsSuccess(chats) {
  return {type: GET_CHATS_SUCCESS, chats}
}

export function getChatsFailure() {
  return {type: GET_CHATS_FAILURE}
}

export function getChatRequest(id) {
  return {type: GET_CHAT_REQUESTING, id}
}

export function getChatSuccess(chat) {
  return {type: GET_CHAT_SUCCESS, chat}
}
export function getChatFailure() {
  return {type: GET_CHAT_FAILURE}
}

export function clearOutChat() {
  return {type: CLEAR_OUT_CHAT}
}
