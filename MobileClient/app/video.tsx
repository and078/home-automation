import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar, FlatList } from 'react-native';
import image from '@/assets/images/house.png'
import React, { useCallback, useState } from 'react';
import VideoPlayer from '@/components/Video/VideoPlayer';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoRecord from '@/components/Video/VideoRecord';

export const VideoPage = () => {
  const [links, setLinks] = useState<Array<string>>([]);
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<string>('');
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const recordingVideosEndpoint = process.env.EXPO_PUBLIC_RECORDIG_VIDEOS;
  const deleteVideoRecordEndpoint = process.env.EXPO_PUBLIC_DELETE_RECORD;
  const videoDevicesUrl = process.env.EXPO_PUBLIC_VIDEO_DEVICES_API;

  useFocusEffect(
    useCallback(() => {
      const getVideos = async () => {
        const a = await AsyncStorage.getItem('serverIp');
        try {
          if (a && recordingVideosEndpoint) {
            const res = await fetch(`${a}${recordingVideosEndpoint}`);
            const data = await res.json();
            setLinks(data.links);
            console.log(data.links);
            
          }

        } catch (error) {
          console.log('video-records-api error', error);
        }
      }
      getVideos();
    }, [wasDeleted])
  );

  const linkClickHandler = (link: string) => {
    setIsVideoPlayerVisible(true);
    setCurrentLink(link);
  }

  const backToListHandler = () => {
    setIsVideoPlayerVisible(false);
  }

  const handleToWatch = (video: string) => {
    linkClickHandler(video)
    console.log('Watch', video);
  }

  const handleToDelete = async (video: string) => {
    try {
      const a = await AsyncStorage.getItem('serverIp');
    const res = await fetch(`${a}${deleteVideoRecordEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'video': video.split('/').pop()
      })
    })
    if (res) {
      setWasDeleted(!wasDeleted);
      console.log('Delete', video.split('/').pop());
    }
    } catch (error) {
      console.log(error);      
    }
    
  }

  return (
    <>
      {!isVideoPlayerVisible ? (
        <View style={styles.container}>
          <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
          <ImageBackground source={image} style={styles.image}>
            <View>
              <Text style={styles.titleText}>
                Video Records
              </Text>
            </View>
            <FlatList
              data={links}
              numColumns={1}
              renderItem={({ item }) => {
                return (
                  <>
                    <VideoRecord
                      wasSelected={item === currentLink ? true : false}
                      recordedVideo={item}
                      pressToDelete={() => handleToDelete(item)}
                      pressToPlay={() => handleToWatch(item)}
                    />
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
            <View>
              <TouchableOpacity onPress={() => {
                  handleToDelete(currentLink.split('/').pop());
                  backToListHandler();
              }}>
                <Text style={styles.deleteText}>Delete</Text>
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
    fontSize: 15,
    margin: 15
  },
  titleText: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 20
  },
  deleteText: {
    color: '#d6040f88',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    margin: 15
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

