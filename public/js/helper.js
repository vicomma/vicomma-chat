async function postData(url = '', data = {}) {
    // Default options are marked with *
    const headers = {
    'Content-Type': 'application/json',
    }

    return axios.post(url, data, {
        'Access-Control-Allow-Origin': '*',
        headers: headers
    })
}


const getData = (url) => {
  const response = fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const saveLocally = ( profile, data ) => {
    localStorage.setItem(profile,JSON.stringify(data));
}