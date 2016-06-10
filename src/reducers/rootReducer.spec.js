import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import reducer from './rootReducer';

describe('Reducers::root', () => {
  const getInitialState = () => {
    return {
      isLoggedIn: false,
      isFetching: false,
      data: {}
    };
  };

  const getAppState = () => {
    return {
      isLoggedIn: true,
      isFetching: false,
      data: {
        name: "John"
      },
      message: "Data sent."
    };
  };

  it('should set initial state by default', () => {
    expect(reducer(getInitialState(), {type: 'unknown'})).to.deep.equal(getInitialState()); // Notice use of deep because it's a nested object
  });

  it('should set initial state for LOGIN, UNAUTHENTICATED_REQUEST and LOGOUT for any given state', () => {
    expect(reducer(getAppState(), {type: types.LOGIN})).to.deep.equal(getInitialState());
    expect(reducer(getAppState(), {type: types.UNAUTHENTICATED_REQUEST})).to.deep.equal(getInitialState());
    expect(reducer(getAppState(), {type: types.LOGOUT})).to.deep.equal(getInitialState());
  });

  it('should set isLoggedIn when LOGGED_IN from inital state', () => {
    const expected = Object.assign(getInitialState(), {isLoggedIn: true});
    expect(reducer(getInitialState(), {type: types.LOGGED_IN})).to.deep.equal(expected);
  });

  it('should set isFetching when POST_DATA from any given state', () => {
    const expected = Object.assign(getAppState(), {
      isFetching: true
    });

    let result = reducer(getAppState(), {
      type: types.POST_DATA,
      userData: getAppState().data
    });

    expect(result).to.deep.equal(expected);
  });

  it('should set isFetching when POST_DATA from any given state', () => {
    const expected = Object.assign(getAppState(), {
      isFetching: true
    });

    let result = reducer(getAppState(), {
      type: types.POST_DATA,
      userData: getAppState().data
    });

    expect(result).to.deep.equal(expected);
  });

  it('should stay logged in but clean state when POST_DATA_SAVED/POST_DATA_FAILURE from any given state', () => {
    let message = "Error message";

    const expected = Object.assign(getAppState(), {
      isFetching: false,
      message: message,
      data: {}
    });

    expect(reducer(getAppState(), {
      type: types.POST_DATA_SAVED,
      message: message
    })).to.deep.equal(expected);

    expect(reducer(getAppState(), {
      type: types.POST_DATA_FAILURE,
      message: message
    })).to.deep.equal(expected);
  });
});
