import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, StatusBar, TextInput, } from 'react-native';
import image from '@/assets/images/house.png'
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export const server = () => {
    console.log("SERVER");
    const [currentIp, setCurrentIp] = useState<string>('');
    const [currentPort, setCurrentPort] = useState<string>('');

    useFocusEffect(
        useCallback(() => {
            getStorageData();
        }, [])
    );

    const getStorageData = async () => {
        console.log('getStorageData');
        try {
            let ip = await AsyncStorage.getItem("serverIp");
            let port = await AsyncStorage.getItem("serverPort");
            if (ip) setCurrentIp(ip);
            if (port) setCurrentPort(port);
            console.log(ip, port);

        } catch (error) {
            console.log(error);
        }
    }

    const [ipText, setIpText] = useState<string>(currentIp);
    const [potrText, setPortText] = useState<string>(currentPort);

    const handleSaveBtn = async () => {
        try {
            await AsyncStorage.setItem("serverIp", ipText)
            await AsyncStorage.setItem("serverPort", potrText)
        } catch (error) {
            console.log(error);
        }
    }

    const cleanupServerInfo = () => {
        setCurrentIp('');
        setCurrentPort('');
        setIpText('');
        setPortText('');
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.inputView}>
                    <Text style={styles.mainText}>Server settings</Text>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>Server IP</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setIpText}
                        value={ipText ? ipText : currentIp}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>Port</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPortText}
                        value={potrText ? potrText : currentPort}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.btns}>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={handleSaveBtn}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                    </View><View style={styles.btn}>
                        <TouchableOpacity onPress={cleanupServerInfo}>
                            <Text style={styles.text}>Cleanup</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        flex: 7,
        height: Dimensions.get('window').height / 40,
        width: Dimensions.get('window').width - 20,
        margin: 10,
    },
    mainText: {
        fontSize: 20,
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    text: {
        fontSize: 15,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    textInput: {
        backgroundColor: '#0f505588',
        borderRadius: 10,
        borderColor: "#14cee6cc",
        borderWidth: 2,
        color: 'white'
    },
    btns: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        width: Dimensions.get('window').width / 4 - 15,
        height: Dimensions.get('window').height / 12,
        backgroundColor: "#0f505588",
        borderRadius: Dimensions.get('window').height / 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderColor: "#14cee6cc",
        borderWidth: 1,
        flexDirection: "row"
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default server

