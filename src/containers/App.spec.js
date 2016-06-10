import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import { App } from './App';
import LoggedIn from './LoggedIn';
import Auth0Lock from './Auth0Lock';

describe('<App />', () => {
  it('should contain <Auth0Lock/> and should not contain <LoggedIn/> when user is not logged in', () => {
    const wrapper = shallow(<App isLoggedIn={false} message=""/>);

    expect(wrapper.find(Auth0Lock)).to.be.length(1);
    expect(wrapper.find(LoggedIn)).to.be.length(0);
  });

  it('should contain <LoggedIn/> and should not contain <Auth0Lock/> when user is not logged in', () => {
    const wrapper = shallow(<App isLoggedIn={true} message=""/>);

    expect(wrapper.find(Auth0Lock)).to.be.length(0);
    expect(wrapper.find(LoggedIn)).to.be.length(1);
  });
});
