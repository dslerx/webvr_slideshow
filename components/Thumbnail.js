import React from 'react';
import {
  StyleSheet,
  asset,
  Animated,
  NativeModules,
  VrButton,
} from 'react-360';
import {connect} from './Store';
const {AudioModule} = NativeModules;

class Thumbnail extends React.Component{
  constructor(props) {
    super(props);

    this.thumb = props.thumb
    this.onClick = props.onClick
    this.id = props.id
    this.position = props.position? props.position : 'middle'

    this.state = {
      hover: 0,
      opacity: new Animated.Value(0.6)
    }
  }

  _enterEvent = () => {
    AudioModule.playOneShot({
      source: asset('./sound/button_cursor.wav'),
      volume: 0.5, // play at 3/10 original volume
    });
    Animated.timing(
      // Animate value over time
      this.state.opacity, // The value to drive
      {
        toValue: 1,
        duration: 150,
      }).start();
  };
  
  _exitEvent = () => {
    Animated.timing(
      // Animate value over time
      this.state.opacity, // The value to drive
      {
        toValue: 0.6,
        duration: 150,
      }).start();
  };

  _hoverStyle = () => {
    if(this.state.hover == 0)return(styles.exitImage);
    else return(styles.image);
  }

  _clickEvent = (event) => {
    AudioModule.playOneShot({
      source: asset('./sound/button_enter.wav'),
      volume: 0.3, // play at 3/10 original volume
    });
    this.onClick(this.id);
  };

  render(){
    opac  = this.state.opacity
    leftRad  = this.position == 'first'? 15 : 0
    rightRad = this.position == 'last'? 15 : 0

    return (
      <VrButton onExit={this._exitEvent} onEnter={this._enterEvent} onClick={this._clickEvent}>
        <Animated.Image style={{height:60, width:90, opacity: opac, borderBottomLeftRadius: leftRad, borderBottomRightRadius: rightRad}} source={asset(this.thumb)} />
      </VrButton>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 90,
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitImage: {
    height: 60,
    width: 90,
    opacity: 0.6,
  },
});

const ConnectedThumbnail = connect(Thumbnail);
export default ConnectedThumbnail;