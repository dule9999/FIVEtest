export default function request(url, options) {
    options = {
        headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
        },
        ...options,
    };
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch((err) => {
        const error = new Error(err);
        throw error;
        });
}

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  function parseJSON(response) {
    return response.json();
  }