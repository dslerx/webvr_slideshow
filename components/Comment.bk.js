import React from 'react';
import {
  StyleSheet,
  View,
  asset,
  Animated,
  NativeModules,
} from 'react-360';
import {connect} from './Store';

const {AudioModule} = NativeModules
const Easing = require('Easing');

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.animeDelay = null
    this.animePopup = null

    this.state = {
      opacity: new Animated.Value(0),
      deg: new Animated.Value(0),
      current: 0,
    }
  }
  
  _startAnimation(){

    //Set this to stop anime when a next anime will play
    this.animeDelay = Animated.delay(5000)
    this.animePopup = Animated.parallel([
      Animated.timing(
        // Animate value over time
        this.state.opacity, // The value to drive
        {
          toValue: 1,
          duration: 150,
      }),
      Animated.timing(
        this.state.deg,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.elastic(2)),
        }
      )
    ])
    this.playSE = () => {
      console.log("play se")
      AudioModule.playOneShot({
        source: asset('./sound/comment.mp3'),
        volume: 0.15, // play at 3/10 original volume
      });
    }

    //Play Animation
    this.animeDelay.start((e) => {
      //If this anime was stopped, don't play SE!
      if(e.finished) this.playSE()
      this.animePopup.start()
    })
  }

  componentDidMount() {
    this._startAnimation()
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.current == nextProps.current) return
    //Stop all currrent anime
    if(this.animeDelay) this.animeDelay.stop()
    if(this.animePopup) this.animePopup.stop()
    if(this.playSE) this.playSE = () => {}

    //Play new anime
    this.state.current = nextProps.current
    this.state.opacity.setValue(0)
    this.state.deg.setValue(0)
    this._startAnimation()
  }

  _enterEvent = () => {
    AudioModule.playOneShot({
      source: asset('./sound/page.wav'),
      volume: 0.2, // play at 3/10 original volume
    });
    Animated.timing(
      // Animate value over time
      this.state.opacity, // The value to drive
      {
        toValue: 0.0001,
        duration: 150,
      }).start();
    
  };
  
  _exitEvent = () => {
    Animated.timing(
      // Animate value over time
      this.state.opacity, // The value to drive
      {
        toValue: 1,
        duration: 150,
      }).start();
  };

  render() {

    const current = this.props.photos[
        this.state.current % this.props.photos.length
      ];

    opac = this.state.opacity
    deg = this.state.deg.interpolate({
      inputRange: [0, 1],
      outputRange: ['-10deg', '0deg']
    });

    return (
      <View style={styles.wrapper}>
        <Animated.Image style={{height:230, width:300, opacity: opac, transform: [{rotate: deg}]}} source={asset(current.comment_img)} onExit={this._exitEvent} onEnter={this._enterEvent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 150,
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 1000,
  },
});


//export default Comment
//const ConnectedComment = connect(Comment);
//export default ConnectedComment;