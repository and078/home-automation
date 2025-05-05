import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar, FlatList } from 'react-native';
import image from '@/assets/images/house.png'
import React, { useCallback, useState } from 'react';
import VideoPlayer from '@/components/Video/VideoPlayer';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VideoPage = () => {
  const [links, setLinks] = useState<Array<string>>([]);
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<string>('');

  const recordingVideosEndpoint = process.env.EXPO_PUBLIC_RECORDIG_VIDEOS;

  useFocusEffect(
    useCallback(() => {
      const getVideos = async () => {
        const a = await AsyncStorage.getItem('serverIp');
        try {
          if (a && recordingVideosEndpoint) {
            const res = await fetch(`${a}${recordingVideosEndpoint}`);
            const data = await res.json();
            setLinks(data.links);
          }

        } catch (error) {
          console.log('video-records-api error', error);
        }
      }
      getVideos();
    }, [])
  );

  const linkClickHandler = (link: string) => {
    setIsVideoPlayerVisible(true);
    setCurrentLink(link);
  }

  const backToListHandler = () => {
    setIsVideoPlayerVisible(false);
  }

  const getDateTimeFromUrl = (url: string) => {
    const utcDate = Number(url.split('/').pop()?.split('_')[0]);
    return new Date(utcDate).toLocaleString();
  }

  const getCameraNameFromUrl = (url: string) => {
    return url.split('_').pop()?.split('.')[0];
  }

  return (
    <>
      {!isVideoPlayerVisible ? (
        <View style={styles.container}>
          <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
          <ImageBackground source={image} style={styles.image}>
            <View>
              <Text style={styles.text}>
                Video Records
              </Text>
            </View>
            <FlatList
              data={links}
              numColumns={1}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.container}>
                      <TouchableOpacity onPress={() => linkClickHandler(item)}>
                        <Text style={styles.text}>{getCameraNameFromUrl(item)} {getDateTimeFromUrl(item)}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )
              }}
            />
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
          <ImageBackground source={image} style={styles.image}>
            <View style={styles.player}>
              <VideoPlayer videoUrl={currentLink} />
            </View>
            <View>
              <TouchableOpacity onPress={backToListHandler}>
                <Text style={styles.text}>Back to list</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  player: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPage

