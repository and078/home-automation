import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ViewError from '@/components/VideoCams/ViewError';
import LigtButton from './LigtButton';

interface VewViewProps {
  name: string,
  ip: string,
  sendState: (pressed: boolean) => void,
}

const VideoWebView = (props: VewViewProps) => {
  console.log("VideoWebView()");
  const streamUrl = process.env.EXPO_PUBLIC_STREAM_API;

  const [key, setKey] = useState<bigint>(0n);

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
              source={{ uri: streamUrl }}
              key={key}
              onError={handleWebViewError}
              renderError={e => <ViewError name={e} />}
            />
          </View>
        </TouchableOpacity>
        <LigtButton/>
      </>

    )
  return (
    <></>
  )
}

const styles = StyleSheet.create({
  webView: {
    // flex: 1,
    // margin: 20,
    backgroundColor: "black",
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 10,
    padding: 15,
  },
});

export default VideoWebView