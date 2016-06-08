/* eslint react/no-set-state: 0 */

import React, { Component, PropTypes } from 'react';
import { CompactPicker } from 'react-color';
import TextField from 'material-ui/TextField';

class ColorPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  updateColor(newColor) {
    this.setState({
      color: newColor.hex
    });
    this.props.onChange(newColor.hex);
  }

  render() {
    return (<div>
      <TextField
        disabled={true}
        hintText="Disabled Hint Text"
        floatingLabelText="Favourite color"
        value={this.state.color}
      />
      <div style={{
        width: 245
      }}>
        <CompactPicker onChange={this.updateColor.bind(this)} color={this.state.color}/>
      </div>
    </div>);
  }
}

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
