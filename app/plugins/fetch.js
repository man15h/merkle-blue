const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
const parseText = response => {
  return response.text();
};
export default ({}, inject) => {
  inject('fetch', (url, params) => {
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then(checkStatus)
        .then(parseText)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};
