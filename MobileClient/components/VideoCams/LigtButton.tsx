import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

interface LightButtonProps {
	port: Number
}

const LigtButton = (props: LightButtonProps) => {
	const flashUrl = process.env.EXPO_PUBLIC_CAMERA_FLASH;
	const [text, setText] = useState<string>("Light on");
	const [isOn, setIsOn] = useState<boolean>(true);

	const handlePress = async (state: boolean = false) => {		
		setIsOn(!isOn);
		setText(state ? "Light off" : "Light on");
		let stateString = 'flashOFF';
		stateString = state ? 'flashON' : 'flashOFF';
		try {
			await fetch(`${flashUrl}${props.port.valueOf() + 1}&${stateString}`);
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

export default LigtButton

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