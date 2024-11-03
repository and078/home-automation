import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import ViewError from '@/components/ViewError'

interface VewViewProps {
  videoSource: string,
}

const VideoViewView = (props: VewViewProps) => {
  const webRef = useRef<WebView>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [key, setKey] = useState<bigint>(0n);

  const handleWebViewError = () => {
    setIsError(true);
  };

  const reloadWebView = () => {
    setKey(key + 1n); 
    setIsError(false);
  };

  return (
    <>
      {isError ? (
        <TouchableOpacity onPress={reloadWebView}>
          <Text style={styles.text}>
          Reload
          </Text>
        </TouchableOpacity>
      ) : (
        <WebView
          style={styles.webView}
          source={{ uri: props.videoSource }}
          ref={webRef}
          key={key}
          onError={handleWebViewError}
          renderError={e => <ViewError name={e} />}
        />
      )}
        
    </>
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
    fontSize: 20,
    padding: 15,
  },
});

export default VideoViewView