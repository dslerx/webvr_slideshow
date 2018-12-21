import React from 'react';
import {
  StyleSheet,
  View,
  asset,
  Animated,
  NativeModules,
  VrButton,
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
      dep: new Animated.Value(-1),
      current: 0,
      scale: new Animated.Value(1),
      minimized: false,
    }
  }
  
  _startAnimation(){
    //Reset position
    this.state.opacity.setValue(0)
    this.state.deg.setValue(0)
    this.state.dep.setValue(-1)
    this.state.scale.setValue(1)

    this.playSE = () => {
      AudioModule.playOneShot({
        source: asset('./sound/comment.mp3'),
        volume: 0.15, // play at 3/10 original volume
      });
    }

    //Set this to stop anime when a next anime will play
    this.animeDelay = Animated.delay(5000)
    this.animePopup = Animated.parallel([
      Animated.timing(
        // Animate value over time
        this.state.opacity, // The value to drive
        {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.elastic(2)),
      }),
      Animated.timing(
        this.state.deg,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.elastic(2)),
        }
      ),
      Animated.timing(
        this.state.dep,
        {
          toValue: 0.5,
          duration: 500,
          easing: Easing.in(Easing.elastic(2)),
        }
      )
    ])

    //Play Animation
    this.animeDelay.start((e) => {
      //If this anime was stopped, don't play SE!
      if(e.finished) this.playSE()
      this.animePopup.start()
    })
  }

  _enterAnimation(){  
    //Stop start anime
    if(this.animeDelay) this.animeDelay.stop()
    if(this.animePopup) this.animePopup.stop()

    //Reset enter position
    this.state.opacity.setValue(1)
    this.state.deg.setValue(1)
    this.state.dep.setValue(0.5)
    this.state.scale.setValue(1)

    this.playSE = () => {
      AudioModule.playOneShot({
        source: asset('./sound/comment.mp3'),
        volume: 0.15, // play at 3/10 original volume
      });
    }

    //Play Animation
    this.playSE()

    //Set this to stop anime when a next anime will play
    Animated.sequence([
      Animated.parallel([
        //IN
        Animated.timing(
          this.state.scale,
          {
            toValue: 1.2,
            duration: 50,
            easing: Easing.in(Easing.linear),
          }
        )
      ]),
      //OUT
      Animated.parallel([
        Animated.timing(
          this.state.scale,
          {
            toValue: 1,
            duration: 300,
            easing: Easing.in(Easing.elastic(2)),
          }
        )
      ])
    ]).start()
  }

  _clickAnimation(){  
    //Stop start anime
    if(this.animeDelay) this.animeDelay.stop()
    if(this.animePopup) this.animePopup.stop()

    this.playSE = () => {
      AudioModule.playOneShot({
        source: asset('./sound/comment.mp3'),
        volume: 0.15, // play at 3/10 original volume
      });
    }

    //Play Animation
    this.playSE()

    //Set this to stop anime when a next anime will play
    Animated.timing(
      this.state.scale,
      {
        toValue: 0.3,
        duration: 300,
        easing: Easing.in(Easing.elastic(2)),
      }
    ).start()
  }

  _maximizeAnimation(){
    this.playSE = () => {
      AudioModule.playOneShot({
        source: asset('./sound/comment.mp3'),
        volume: 0.15, // play at 3/10 original volume
      });
    }

    //Play Animation
    this.playSE()

    //Set this to stop anime when a next anime will play
    Animated.timing(
      this.state.scale,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.elastic(2)),
      }
    ).start()
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
    this._startAnimation()
  }

  _enterEvent = () => { 
    if(!this.minimized)this._enterAnimation()
  };

  _clickEvent = () => {
    if(!this.minimized){
      this._clickAnimation()
      this.minimized = true
    }
    else{ 
      this._maximizeAnimation()
      this.minimized = false;
    }
  }

  render() {

    const current = this.props.photos[
        this.state.current % this.props.photos.length
      ];

    opac = this.state.opacity
    deg = this.state.deg.interpolate({
      inputRange: [0, 1],
      outputRange: ['-20deg', '0deg']
    });
    dep = this.state.dep
    scl = this.state.scale

    return (
      <Animated.View style={{
          height:1.6, 
          width:2.1,
          opacity: opac,
          transform: [
            {rotateZ: deg},
            {translateZ: dep},
            //{translateX: -3},
            //{translateY: 2},
            {scaleX:scl},
            {scaleY:scl},
          ]
        }}>
        <VrButton onExit={this._exitEvent} onEnter={this._enterEvent} onClick={this._clickEvent} >
          <Animated.Image style={{height:1.6, width:2.1}} source={asset(current.comment_img)} />
        </VrButton>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 5,
    width: 5,
  },
});


//export default Comment
const ConnectedComment = connect(Comment);
export default ConnectedComment;