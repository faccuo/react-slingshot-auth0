import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import { LoggedIn } from './LoggedIn';
import FormPage from '../components/FormPage';
import Loading from '../components/Loading';

describe('<LoggedIn />', () => {

  it('should contain a form when isFetching is false', () => {
    const wrapper = shallow(<LoggedIn isFetching={false} dispatch={() => undefined}/>);

    expect(wrapper.find(FormPage)).to.be.length(1);
  });

  it('should contain a loading view when isFetching is true', () => {
    const wrapper = shallow(<LoggedIn isFetching={true} dispatch={() => undefined}/>);

    expect(wrapper.find(Loading)).to.be.length(1);
  });

});
