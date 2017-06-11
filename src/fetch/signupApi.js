const signupUrl = `/api/signup`

function signupApi(email, login, password) {
  return fetch(`${signupUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, login, password})
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

export default signupApi;
