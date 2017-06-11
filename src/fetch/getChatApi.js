const getChatUrl = "/chats/";

function getChatApi(id, token) {
  return fetch(`${getChatUrl}${id}`, {
    method: 'GET',
    headers: {
      'authorization': JSON.parse(token)
    }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

export default getChatApi;
