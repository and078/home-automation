import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar, FlatList } from 'react-native';
import image from '@/assets/images/house.png'
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpecificCamRecords from '@/components/VideoRecords/SpecificCamRecords';

type Camera = {
  id: Number,
  name: string,
  type: string,
  ip: string,
  ws_server_port: Number,
  status: Number
}

type camera_with_records = {
  name: string,
  records: Array<string>
}

export const VideoPage = () => {
  const [camsWithRecords, setCamsWithRecords] = useState<Array<camera_with_records>>([]);
  const [cams, setCams] = useState<Array<Camera>>([]);
  const [cameraRecords, setCameraRecords] = useState<Array<string> | undefined>([]);
  const [isCameraVideosVisible, setIsCameraVideosVisible] = useState<boolean>(false);
  const [currentCamera, setCurrentCamera] = useState<string>('');

  const videoDevicesUrl = process.env.EXPO_PUBLIC_VIDEO_DEVICES_API;
  const recordingVideosEndpoint = process.env.EXPO_PUBLIC_RECORDIG_VIDEOS;

  useFocusEffect(
    useCallback(() => {
      const getCams = async () => {
        const a = await AsyncStorage.getItem('serverIp');
        try {
          if (a && videoDevicesUrl) {
            const camsRes = await fetch(`${a}${videoDevicesUrl}`);
            const camsData = await camsRes.json();
            setCams(camsData.data);
            const recordsRes = await fetch(`${a}${recordingVideosEndpoint}`);
            const recordsData = await recordsRes.json();
            setCamsWithRecords(splitRecordsToCams(camsData.data, recordsData.links));
          }
        } catch (error) {
          console.log('Get cams error: ', error);
        }
      }
      getCams();
    }, [])
  );

  const getCameraNameFromUrl = (url: string) => {
    return url.split('_')?.pop()?.split('.')[0];
  }

  const splitRecordsToCams = (cams: Array<Camera>, allRecords: Array<string>): Array<camera_with_records> => {
    let splitted: Array<camera_with_records> = [];
    cams.forEach(c => {
      splitted.push({
        name: c.name,
        records: allRecords.filter(r => getCameraNameFromUrl(r) === c.name)
      })
    })
    return splitted;
  }

  const cameraPress = (name: string) => {
    setIsCameraVideosVisible(true);
  }

  const getCameraRecords = (camsRecords: Array<camera_with_records>, cameraName: string) => {
    for(let i = 0; i < camsRecords.length; i++) {
      if(camsRecords[i].name === cameraName) {
        setCameraRecords(camsRecords[i].records);
        break;
      }
    }
  } 

  return (
    <>
      {!isCameraVideosVisible ? (
        <View style={styles.container}>
          <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
          <ImageBackground source={image} style={styles.image}>
            <View>
              <Text style={styles.titleText}>
                Cameras records:
              </Text>
            </View>
            <FlatList
              data={cams}
              numColumns={4}
              renderItem={({ item }) => {
                return (
                  <>
                    <TouchableOpacity onPress={() => {
                      getCameraRecords(camsWithRecords, item.name);
                      cameraPress(item.name);
                      setCurrentCamera(item.name);
                    }}>
                      <View style={styles.button}>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>                      
                    </TouchableOpacity>
                  </>
                )
              }}
            />
          </ImageBackground>
        </View>
      ) : (
        <SpecificCamRecords 
          camera={currentCamera} 
          goBack={() => setIsCameraVideosVisible(false)}
          records={cameraRecords}
        />
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
    fontSize: Dimensions.get('window').width / 35,
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
  button: {
      width: Dimensions.get('window').width / 4 - 15,
      height: Dimensions.get('window').height / 12,
      backgroundColor: "#0f505588",
      borderRadius: Dimensions.get('window').height / 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderColor: "#14cee6cc",
      borderWidth: 1,
    },
});

export default VideoPage

