# React + Redux with Auth0

In this repository, you'll find an example about integrating Auth0 with React+Redux. It's developed on the top of the great [react-slingshot](https://github.com/coryhouse/react-slingshot).

I does not relay on any backend code but a [webtask](https://webtask.io/) that forwards the submitted information to an email address.

The UI relies a lot on [Material-UI](https://github.com/callemall/material-ui) React components.

The app gives you the opportunity to login using [Auth0](https://auth0.com/), fill a form with some basic data and send it to a secure [webtask](https://webtask.io/) endpoint that will forward such data to a preconfigured destination email address.

## How to use it

[Please go directly to the react-slingshot](https://github.com/coryhouse/react-slingshot) to learn how to execute the example.

## Installing [auth0-lock](https://github.com/auth0/lock/) library

From [npm](https://npmjs.org):

```sh
npm install auth0-lock
```

If you are targeting mobile audiences, it's recommended that you add:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## Making [auth0-lock](https://github.com/auth0/lock/) work with [react-slingshot](https://github.com/coryhouse/react-slingshot)

Since [react-slingshot](https://github.com/coryhouse/react-slingshot) is using [webpack](https://webpack.github.io/) we will need to add a couple of extra loaders to make it work:
```sh
npm install json-loader --save-dev
npm install transform-loader --save-dev
```
Then, we need to [add those extra loaders](https://github.com/auth0/lock/blob/master/examples/webpack/webpack.config.js) to our [webpack](https://webpack.github.io/) configuration:
```javascript
{
 test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
  loaders: [
    'transform-loader/cacheable?brfs',
    'transform-loader/cacheable?packageify'
  ]
}, {
  test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
  loader: 'transform-loader/cacheable?ejsify'
}, {
  test: /\.json$/,
  loader: 'json-loader'
}
```

## Using [auth0-lock](https://github.com/auth0/lock/) with React
We defined a custom component that encapsulates login functionality:

```javascript
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import { logInIfNeeded } from '../actions/actions';

class Auth0Lock extends Component {

  componentDidMount() {
    this.props.dispatch(logInIfNeeded());
  }

  render() {
    return (<div></div>);
  }
}

Auth0Lock.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Auth0Lock);

```

It depends on a Redux async action that triggers the functionality:

```javascript
import * as types from '../constants/actionTypes';
import auth0 from '../businessLogic/auth0';
import api from '../businessLogic/api';
import { browserHistory } from 'react-router';

export function logInIfNeeded() {
  return dispatch => {
    if (auth0().isLoggedIn()) {
      dispatch({
        type: types.LOGGED_IN
      });
      browserHistory.replace('/');
    } else {
      dispatch({
        type: types.LOGIN
      });
      auth0().triggerLogin();
    }
  };
}
```

For the **auth0.js** module logic you can check the source and read the [Auth0 React SDK Tutorial](https://auth0.com/docs/client-platforms/react) from the Auth0 site.

## [Webtask](https://webtask.io/) as a backend

One constraint we added to this example is not to depend on any custom backend for the forwarding functionality.
We used a secure [webtask](https://webtask.io/) that using some very simple configuration will deal with the authentication mechanism.
This configuration is as simple as deploying such [webtask](https://webtask.io/) as follows:
```sh
wt create receiveAndEmail.js \
  -s AUTH0_CLIENT_ID=1dHv*********************** \
  -s AUTH0_CLIENT_SECRET=etFW************************** \
  -s AUTH0_DOMAIN=your-auth0-app-custom-domain.auth0.com \
  -s SENDGRID_API_KEY=SG.B******.*************************
```
This is the only needed configuration for us to secure our service logic.

As you can guess, we are using [SendGrid](https://sendgrid.com/) service/library for the sending email functionality.

## Testing

Testing is based on [Mocha framework](https://mochajs.org/) and [Enzyme](https://github.com/airbnb/enzyme).

There is an issue loading [auth0-lock](https://github.com/auth0/lock/) when testing that makes it break since during such process we do not have access to a document. Eventually you could get:
```
ReferenceError: document is not defined
    at insert (/Users/******/react-slingshot-auth0-sample/node_modules/auth0-lock/lib/insert-css/index.js:13:14)
...
```
That was caused by this lines:
```javascript
const Auth0Lock = require('auth0-lock');
const lock = new Auth0Lock('1dHvMOOrGlpF5t9BaLegAerNDZOhlj0J', 'react-slingshot-sample.auth0.com');
...
```
That happens because we are evaluating those lines when loading the container module.
In order **to fix the issue**, even if that is not a good practice in terms of performance and correctness, **we need to wrap those lines** inside a function that, eventually, won't be call during tests running.
So our code ends up as follows:
```javascript
const auth0 = function () {

  const Auth0Lock = require('auth0-lock');
  const lock = new Auth0Lock('1dHvMOOrGlpF5t9BaLegAerNDZOhlj0J', 'react-slingshot-sample.auth0.com');

  return {
    getIdToken: function () {
      let idToken = localStorage.getItem('userToken');
      let authHash = lock.parseHash(window
...
```

The example currently have tests covering **reducers** and the **Auth0Lock** react component.

## Pending tasks
 - Verify the token we have locally stored in order to check is has not already expired. That could be done with [jsrsasign](https://kjur.github.io/jsrsasign/) library.
 - Add more test coverage to existing components.
 - ...

---
## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](http://developers.auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Acknowledgements

Thank you to Daniel Teixeira from [calipho-sib](https://github.com/calipho-sib) for creating the initial version of this SDK.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
