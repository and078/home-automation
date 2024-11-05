import { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import ViewError from '@/components/ViewError'

interface VewViewProps {
  videoSource: string,
}

const VideoViewView = (props: VewViewProps) => {
  const [key, setKey] = useState<bigint>(0n);

  const handleWebViewError = () => {
    setTimeout(() => {
      setKey(key + 1n);
    }, 1000);
  };

  return (
    <>
      <WebView
        style={styles.webView}
        source={{ uri: props.videoSource }}
        key={key}
        onError={handleWebViewError}
        renderError={e => <ViewError name={e} />}
      />
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