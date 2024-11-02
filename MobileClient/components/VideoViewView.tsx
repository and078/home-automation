import { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface VewViewProps {
    videoSource: string,
}

const VideoViewView = (props: VewViewProps) => {
  const webRef = useRef<WebView>(null);

  useEffect(() => {
    if(webRef.current) {
      webRef.current.injectJavaScript(`
        location.reload()
      `);
    }
  }, [webRef]);

  return (
    <WebView
        style={styles.webView}
        source={{ uri: props.videoSource }}
      />
  )
}

const styles = StyleSheet.create({
    webView: {
      width: Dimensions.get('window').width - 60,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },

    container: {
      
    } 
  });

export default VideoViewView