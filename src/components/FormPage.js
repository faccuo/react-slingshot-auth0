/* eslint react/no-set-state: 0 */

import React, { PropTypes, Component } from 'react';

import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText, FormsyDate } from 'formsy-material-ui/lib';
import FormsyColorPicker from './FormsyColorPicker';

class FormPage extends Component {

  constructor(props, context) {
    super(props, context);


    this.state = {
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    this.props.onSubmit(data);
  }

  render() {
    // DatePicker control is broken: https://github.com/callemall/material-ui/pull/4381
    // Should allow 100 years in the past but right now it's limited by a CSS issue (down to 53y ago).
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 100);

    return (<div style={{
        padding: 20
      }}>
      <Formsy.Form
        onValid={this.enableButton.bind(this)}
        onValidSubmit={this.submitForm.bind(this)}
        onInvalid={this.disableButton.bind(this)}>
        <FormsyText
          name="name"
          validations="isWords"
          validationError="Please only use letters"
          required
          hintText="What is your name?"
          floatingLabelText="Name"
        /><br/>
        <FormsyText
          name="email"
          validations="isEmail"
          validationError="Please use a valid email"
          required
          hintText="What is your email?"
          floatingLabelText="email"
        /><br/>
        <FormsyDate
          name="date"
          required
          floatingLabelText="Date"
          minDate={startDate}
          maxDate={new Date()}
        /><br/>
        <FormsyColorPicker
          name="color"
          title="Favourite color"
          validationError="Please use a valid email"
          required/><br/>
        <br/>
        <RaisedButton
          type="submit"
          label="Submit"
          disabled={!this.state.canSubmit}
        />
      </Formsy.Form>
    </div>);
  }
}

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormPage;
