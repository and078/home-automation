import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar } from 'react-native';
import image from '@/assets/images/house.png'
import React from 'react';
import VideoPlayer from '@/components/Video/VideoPlayer';

export const VideoPage = () => {

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
      <ImageBackground source={image} style={styles.image}>
        <VideoPlayer videoUrl='http://89.28.52.164:8000/cam-one_1746368184982.mp4' />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPage

