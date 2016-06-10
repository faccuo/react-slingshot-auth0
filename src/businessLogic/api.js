import 'whatwg-fetch';
import auth0 from './auth0';

const api = function () {

  return {
    send: function (data) {
      return fetch('https://webtask.it.auth0.com/api/run/wt-fabellanc-gmail_com-0/receiveAndEmail?webtask_no_cache=1', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth0().getIdToken()}`
        },
        body: JSON.stringify(data)
      });
    }
  };

};

export default api;
