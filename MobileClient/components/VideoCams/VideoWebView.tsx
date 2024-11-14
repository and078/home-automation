import { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ViewError from '@/components/VideoCams/ViewError'
import { STREAM_API } from "@env";

interface VewViewProps {
  name: string,
  ip: string,
  sendState: (pressed: boolean) => void,
}

const VideoWebView = (props: VewViewProps) => {
  console.log("VideoWebView()");
  // console.log(STREAM_API);
  
  const [key, setKey] = useState<bigint>(0n);

  const handleWebViewError = () => {
    setTimeout(() => {
      setKey(key + 1n);
    }, 1000);
  };

  const handlePress = () => {
    props.sendState(false);
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.webView}>
        <Text style={styles.text}>{props.name}</Text>
        <WebView
          style={styles.webView}
          source={{ uri: STREAM_API }}
          key={key}
          onError={handleWebViewError}
          renderError={e => <ViewError name={e} />}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  webView: {
    backgroundColor: "black",
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  text: {
    color: '#fff',
    fontSize: 10,
    padding: 15,
  },
});

export default VideoWebView