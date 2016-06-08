import 'whatwg-fetch';
import auth0 from './auth0';

const api = (function () {

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  return {
    send: function (data) {
      return fetch('https://webtask.it.auth0.com/api/run/wt-fabellanc-gmail_com-0/receiveAndEmail?webtask_no_cache=1', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth0.getIdToken()}`
        },
        body: JSON.stringify(data)
      }).then(checkStatus);
    }
  };

})();

export default api;
