import Auth0Lock from 'auth0-lock';

const auth0 = (function () {

  const lock = new Auth0Lock('1dHvMOOrGlpF5t9BaLegAerNDZOhlj0J', 'react-slingshot-sample.auth0.com');

  return {

    getIdToken: function () {
      let idToken = localStorage.getItem('userToken');
      let authHash = lock.parseHash(window.location.hash);
      if (!idToken && authHash) {
        if (authHash.id_token) {
          idToken = authHash.id_token;
          localStorage.setItem('userToken', authHash.id_token);
        }
        if (authHash.error) {
          return null;
        }
      }

      return idToken;
    },

    isLoggedIn: function () {
      return this.getIdToken() != null;
    },

    triggerLogin: function () {
      lock.show({
        closable: false
      });
    },

    logout: function () {
      localStorage.removeItem('userToken');
    }

  };

})();

export default auth0;
