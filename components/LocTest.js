import React from 'react';
import {
  StyleSheet,
  View,
  asset,
  Image,
  Animated,
} from 'react-360';
import {connect} from './Store';


class LocTest extends React.Component {
  constructor(props) {
    super(props);

  }
  

  render() {

    return (
      <View style={styles.wrapper}>
        <Animated.Image style={{height:1, width:1}} source={asset('fukidashi.png')} />
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
    height: 4,
    width: 4,
    backgroundColor: 'black',
    transform: [
        {translateX: 0},
        {translateZ: 5},
        {rotateX: '-30deg'},
    ],
  },
});


//export default LocTest
const ConnectedLocTest = connect(LocTest);
export default ConnectedLocTest;