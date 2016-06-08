/* eslint react/prefer-es6-class: 0 */

import React from 'react';
import Formsy from 'formsy-react';
import ColorPicker from './ColorPicker';

const FormsyColorPicker = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue(color) {
    this.setValue(color);
  },

  render() {
    return (
      <div>
        <ColorPicker onChange={this.changeValue}/>
      </div>
    );
  }
});

export default FormsyColorPicker;
