import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface VideoRecordProp {
    wasSelected: boolean,
    recordedVideo: string,
    pressToPlay: (video: string) => void,
    pressToDelete: (video: string) => void
}

const VideoRecord = (props: VideoRecordProp) => {
    const colors = {
        default: '#ffffff00',
        selected: '#ffffff22'
    }

    const getDateTimeFromUrl = (url: string) => {
        const utcDate = Number(url.split('/').pop()?.split('_')[0]);
        return new Date(utcDate).toLocaleString();
    }

    const getCameraNameFromUrl = (url: string) => {
        return url.split('_').pop()?.split('.')[0];
    }

    const linkClickHandler = (link: string) => {
        props.pressToPlay(link);      
    }

    const deleteHandler = (link: string) => {
        props.pressToDelete(link);
    }

    return (
        <>
            <View style={{
                width: Dimensions.get('window').width - 15,
                height: Dimensions.get('window').height / 20,
                backgroundColor: props.wasSelected ? colors.selected : colors.default,
                borderRadius: Dimensions.get('window').height / 40,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderColor: "#14cee6cc",
                borderWidth: 1,
            }}>
                <View style={styles.record}>
                    <TouchableOpacity onPress={() => linkClickHandler(props.recordedVideo)}>
                        <Text style={styles.recordText}>{getCameraNameFromUrl(props.recordedVideo)} {getDateTimeFromUrl(props.recordedVideo)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteHandler(props.recordedVideo)}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    recordText: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15
    },
    deleteText: {
        color: '#d6040f88',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        marginLeft: Dimensions.get('window').width / 8
    },
    record: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default VideoRecord;