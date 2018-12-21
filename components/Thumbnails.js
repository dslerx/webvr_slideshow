import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-360';

import Thumbnail from './Thumbnail'

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 150,
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitImage: {
    height: 80,
    width: 120,
    opacity: 0.7,
  },
});

const displayThumb = (photos, onClick) => (
  photos.map((data, index) => {
    if(index == 0){
      pos = 'first'
    }
    else if(index == photos.length-1){
      pos = 'last'
    }else{
      pos = 'middle'
    }
    return(
      <Thumbnail key={data.thumb} thumb={data.thumb} onClick={onClick} id={index} position={pos}/>
    )
  })
)

const Thumbnails = ({photos, onClick}) => {
  return (
    <View style={styles.thumbnails}>
      {displayThumb(photos, onClick)}
    </View>
  );
}

export default Thumbnails