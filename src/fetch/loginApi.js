const loginUrl = `/api/signin`

function loginApi(login, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({login, password})
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

export default loginApi
