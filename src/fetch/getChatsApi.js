const getChatsUrl = "/chats/";

function getChatsApi(token) {
  return fetch(getChatsUrl, {
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

export default getChatsApi;
