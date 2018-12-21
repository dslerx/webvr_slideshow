import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-360';
import Thumbnails from './Thumbnails'
import Background from './Background'
import {connect, setCurrent} from './Store';

class Slideshow extends React.Component {
  state = {
    index: 0,
    hover: 0,
  };

  _setPhoto = picId => {

    this.setState({
      index: picId,
    });
    setCurrent(picId)
  };

  render() {
    const current = this.props.photos[
      this.state.index % this.props.photos.length
    ];
    return (
      <View>
        <View style={styles.wrapper}>
          <Background uri={current.uri} format={current.format} />
          
          <View style={styles.controls}>
            <View>
              <Text style={styles.title}>{current.title}</Text>
            </View>
          </View>
          <Thumbnails photos={this.props.photos} onClick={this._setPhoto} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 1000,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height:35,
    paddingTop: 2,
    paddingBottom: 4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 40,
    height: 33,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: 150,
  },
  exitImage: {
    height: 60,
    width: 90,
    opacity: 0.7,
  },
});


//export default Slideshow
const ConnectedSlideshow = connect(Slideshow);
export default ConnectedSlideshow;
