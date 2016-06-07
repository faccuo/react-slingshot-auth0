/* eslint react/no-set-state: 0 */

import React, { PropTypes, Component } from 'react';

import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';

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
    return (<div>
      <Paper style={{
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
          />
          <FormsyText
            name="email"
            validations="isEmail"
            validationError="Please use a valid email"
            required
            hintText="What is your email?"
            floatingLabelText="email"
          />
          <RaisedButton
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </Paper>
    </div>);
  }
}

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormPage;
