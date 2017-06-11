import {signupWatcher} from './signup'
import {loginWatcher, logoutWatcher} from './signin'
import {createChatWatch, getChatsWatch, getChatWatch} from './chat'
import {joinChatWatcher} from './socket'

export default function * IndexSaga() {
  yield[signupWatcher(),
    loginWatcher(),
    logoutWatcher(),
    createChatWatch(),
    getChatsWatch(),
    getChatWatch(),
    joinChatWatcher()]
}
