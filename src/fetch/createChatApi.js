const createChatUrl = "/chats/createChat";

function createChatApi(name, token) {
  return fetch(createChatUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': JSON.parse(token)
    },
    body: JSON.stringify({name})
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

export default createChatApi;
