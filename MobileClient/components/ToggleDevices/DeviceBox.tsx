import React from 'react';
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

interface DeviceBoxProps {
	deviceName: string,
	state: Number,
	type: string,
}

const DeviceBox = (props: DeviceBoxProps) => {
	console.log("DeviceBox()");
	console.log(props);
	
	const [boxState, setBoxState] = useState<Number>(props.state);
	const [color, setColor] = useState<string>("#423c3fcc");
	const setToggleDeviceUrl = process.env.EXPO_PUBLIC_SET_TOGGLE_DEVICE;

	const setColorByState = (state: Number): void => {
		if (state == 1) setColor("#0f505588");
		if (state == 0) setColor("#00000055");
		if (state == -1) setColor("#423c3f55");
	}

	useEffect(() => {
		setColorByState(props.state);
		const timeout = setTimeout(() => {
			postToDevice(props.state, props.deviceName);
		}, 300);
		return clearTimeout(timeout);
	}, []);

	const postToDevice = async (status: Number, name: string) => {
		try {
			if(setToggleDeviceUrl) {
				await fetch(`${setToggleDeviceUrl}?name=${name}&state=${status}`)
				.then(response => response.json())
				.then(response => {
					// console.log(response);
					setBoxState(response.status);
					setColorByState(response.status);
				})
			}
		}
		catch (err) {
			console.log("PostError: ", err);
		}
	}

	return (
		<>
			<TouchableOpacity
				onPress={ () => {
					console.log(boxState);
					if (boxState === 0) postToDevice(1, props.deviceName);
					if (boxState === 1) postToDevice(0, props.deviceName);
				}}>
				<View style={{
					flex: 1,
					width: Dimensions.get('window').width / 4 - 15,
					height: Dimensions.get('window').height / 12,
					backgroundColor: color,
					borderRadius: Dimensions.get('window').height / 40,
					justifyContent: 'center',
					alignItems: 'center',
					margin: 5,
					borderColor: "#14cee6cc",
					borderWidth: 1,
				}}>
					<Text style={styles.text}>{props.deviceName}</Text>
				</View>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontSize: 15,
	}
});

export default DeviceBox;
