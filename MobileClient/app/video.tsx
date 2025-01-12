import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar } from 'react-native';
import image from '@/assets/images/house.png'
import React from 'react';

export const Video = () => {
  console.log("VIDEO");
  
  return (
    <View style={styles.container}>
      <StatusBar hidden={false}  backgroundColor="black" barStyle="light-content"/>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Video</Text>
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
});

export default Video

