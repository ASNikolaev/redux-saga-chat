import {DOWNLOAD_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, CLEAR_OUT_MESSAGES} from '../constants'

export function downloadMessages(messages) {
  return {type: DOWNLOAD_MESSAGES, messages}
}

export function addMessage(message) {
  return {type: ADD_MESSAGE, message}
}

export function deleteMessage(message) {
  return {type: DELETE_MESSAGE, message}
}

export function clearOutMessages() {
  return {type: CLEAR_OUT_MESSAGES}
}
