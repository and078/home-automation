import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import ToggleButton from './ToggleButton'

interface DeviceBoxProps {
    deviceName: String,
    state: Number,
    onpress: (state: Number) => void
}

const DeviceBox = (props: DeviceBoxProps) => {
    return (
        <>
            <View style={styles.device}>
                <Text style={styles.text}>{props.deviceName}</Text>
                <ToggleButton onpress={props.onpress}></ToggleButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 20,
    },
    device : {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/10,
		borderRadius: 50,
        borderColor: '#fff',
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
	}
});

export default DeviceBox;