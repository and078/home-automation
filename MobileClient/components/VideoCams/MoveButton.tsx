import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

interface MoveButtonProps {
    port: Number,
    direction: string
}

const MoveButton = (props: MoveButtonProps) => {
    const movehUrl = process.env.EXPO_PUBLIC_CAMERA_MOVE;
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (props.direction === "moveLeft") setText("Left");
        if (props.direction === "moveRight") setText("Right");
    }, []);

    const handlePress = async (direction: string) => {
        try {
            const a = await AsyncStorage.getItem('serverIp');
            if(a) {
                await fetch(`${a}${movehUrl}${props.port.valueOf() + 1}&${direction}`);
                console.log(`${a}${movehUrl}${props.port.valueOf() + 1}&${direction}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => handlePress(props.direction)}>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default MoveButton

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