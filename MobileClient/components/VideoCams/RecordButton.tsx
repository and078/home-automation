import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

interface RecordButtonProps {
    port: Number,
    name: String
}

const RecordButton = (props: RecordButtonProps) => {
    const streamServerUrl = process.env.EXPO_PUBLIC_STREAM_API;
    const [text, setText] = useState<string>("Record");
    const [isOn, setIsOn]= useState<boolean>(false);
    // const [recordingStatus, setRecordingStatus] = useState<boolean>(false);

    const startRecordingUrl = process.env.EXPO_PUBLIC_START_RECORDING;
    const stopRecordingUrl = process.env.EXPO_PUBLIC_STOP_RECORDING;
    const recordingStatusUrl = process.env.EXPO_PUBLIC_RECORDING_STATUS;

    const getRecordingStatus = async (url: string) => {
        if (recordingStatusUrl) {
            try {
                let data = await fetch(url);
                let res = await data.json();
                return res.recording;
            } catch (error) {
                console.log('Recording status err', error);
            }
        }
    }

    const startRecording = async (url: string, streamUrl: string) => {
        try {
            const now = new Date();
            const formattedDate = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}_${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

            let data = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stream_url: streamUrl,
                    output_file: `./video-records/${props.name}_${formattedDate}.mp4`
                })
            })
            let res = await data.json();
            console.log('startRecording: ', res);
        } catch (error) {
            console.log(`Start record on ${props.name} camera failed: `, error);
        }
    }

    const stopRecording = async (url: string) => {
        try {
            let data = await fetch(url, {
                method: 'POST'
            });
            let res = await data.json();
            console.log('stopRecording: ', res);
        } catch (error) {
            console.log(`Stop record on ${props.name} camera failed: `, error);
        }
    }

    const handlePress = async (state: boolean = false) => {
        setIsOn(!isOn);
        setText(!state ? "Stop" : "Record");
        

        let streamPort = Number(props.port) + 2;

        try {
            const a = await AsyncStorage.getItem('serverIp');

            if (a && streamServerUrl) {
                let urlWithoutPort = a.slice(0, -4);
                let streamUrl = `${urlWithoutPort}${streamPort}${streamServerUrl}-${props.port}`;
                let fetchStartRecordingUrl = `${urlWithoutPort}${streamPort}${startRecordingUrl}`;
                let fetchStopRecordingUrl = `${urlWithoutPort}${streamPort}${stopRecordingUrl}`;
                let fetchGetRecordingStatusUrl = `${urlWithoutPort}${streamPort}${recordingStatusUrl}`;

                if(recordingStatusUrl) {
                    await getRecordingStatus(fetchGetRecordingStatusUrl);
                }

                if (!isOn && startRecordingUrl) {
                    let go = await getRecordingStatus(fetchGetRecordingStatusUrl);
                    if (!go) await startRecording(fetchStartRecordingUrl, streamUrl);
                }

                if (isOn && stopRecordingUrl) {
                    let go = await getRecordingStatus(fetchGetRecordingStatusUrl);
                    if (go) await stopRecording(fetchStopRecordingUrl);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => handlePress(isOn)}>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default RecordButton

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 4 - 15,
        height: Dimensions.get('window').height / 12,
        backgroundColor: "#0f505588",
        borderRadius: Dimensions.get('window').height / 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderColor: "#14cee6cc",
        borderWidth: 1,
    },

    text: {
        color: '#fff',
        fontSize: 10,
        padding: 5,
    },
});