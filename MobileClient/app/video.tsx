import { Text, View, StyleSheet } from 'react-native';

export const Video = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Video</Text>
    </View>
    
  )
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
    },
  });

export default Video

