import React from 'react';
import {
  Environment,
} from 'react-360';

class Background extends React.Component {
  constructor(props) {
    super();
    Environment.setBackgroundImage(props.uri, {format: props.format});
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uri !== this.props.uri ||
      nextProps.format !== this.props.format
    ) {
      Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
    }
  }

  render() {
    return null;
  }
}

export default Background