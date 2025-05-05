import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';


interface VideoPrayerProps {
    videoUrl: string
}

const VideoPlayer = (props: VideoPrayerProps) => {

    let player = useVideoPlayer(props.videoUrl, player => {
        player.loop = false;
        player.play();
    });

    const getDateTimeFromUrl = (url: string) => {
        const utcDate = Number(url.split('/').pop()?.split('_')[0]);
        return new Date(utcDate).toLocaleString();
    }

    const getCameraNameFromUrl = (url: string) => {
        return url.split('_').pop()?.split('.')[0];
    }

    return (
        <>
            <View style={styles.contentContainer}>
                <View >
                    <Text style={styles.text} >{getCameraNameFromUrl(props.videoUrl)}</Text>
                    <Text style={styles.text} >{getDateTimeFromUrl(props.videoUrl)}</Text>
                </View>
                <VideoView
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                />
            </View>
        </>
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
        color: 'white',
        fontSize: 10,
        margin: 5
    }
});
