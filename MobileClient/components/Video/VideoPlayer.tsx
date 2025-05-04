import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native';

interface VideoPrayerProps {
    videoUrl: string
}

const VideoPlayer = (props: VideoPrayerProps) => {

    const player = useVideoPlayer(props.videoUrl, player => {
        player.loop = false;
        player.play();
    });

    return (

        <View style={styles.contentContainer}>
            <View >
            <Text style={styles.text} >{props.videoUrl}</Text>
            </View>
            <VideoView 
                style={styles.video} 
                player={player} 
                allowsFullscreen 
                allowsPictureInPicture
            />
        </View>
    );
}

export default VideoPlayer;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2.5,
    },
    text: {
        magrin: 20,
        color: 'white',
        fontSize: 10
    }
});
