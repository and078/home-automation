import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ViewError from '@/components/VideoCams/ViewError';
import LigtButton from './LigtButton';
import MoveButton from './MoveButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordButton from './RecordButton';

interface VewViewProps {
  name: string,
  ip: string,
  port: Number,
  sendState: (pressed: boolean) => void,
}

const VideoWebView = (props: VewViewProps) => {
  console.log("VideoWebView()");
  const streamUrl = process.env.EXPO_PUBLIC_STREAM_API;

  const [key, setKey] = useState<bigint>(0n);
  const [addr, setAddr] = useState<string>('');

	useEffect(() => {
		const getAddress = async () => {
			const a = await AsyncStorage.getItem('serverIp');
			if (a) {
        let newPort = Number(props.port) + 2;
        let replaced = a.substring(0, a.length - 4) + `${newPort}`;
        setAddr(replaced);
      }
      console.log('webview',`${addr}${streamUrl}-${props.port}`);
		}
		getAddress();
	}, [])

  const handleWebViewError = () => {
    setTimeout(() => {
      setKey(key + 1n);
    }, 1000);
  };

  const handlePress = () => {
    props.sendState(false);
  }

  if (streamUrl)
    return (
      <>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.webView}>
            <Text style={styles.text}>{props.name}</Text>
            <WebView
              style={styles.webView}
              source={{ uri: `${addr}${streamUrl}-${props.port}` }}
              key={key}
              onError={handleWebViewError}
              renderError={e => <ViewError name={e} />}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <MoveButton port={props.port} direction="moveLeft" />
          <LigtButton port={props.port} />
          <RecordButton port={props.port} name={props.name} />
          <MoveButton port={props.port} direction="moveRight" />
        </View>
      </>
    )
}

const styles = StyleSheet.create({
  webView: {
    backgroundColor: "black",
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  text: {
    color: '#fff',
    fontSize: 10,
    padding: 15,
  },
});

export default VideoWebView