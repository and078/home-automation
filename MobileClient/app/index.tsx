import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { useState } from "react";

import DeviceBox from "@/components/DeviceBox";


export default function Index() {
	const[state, setState] = useState(0);
	const[deviceName, setDeviceName] = useState('');

	const url = 'https://hmaubck.serveo.net/device';
	const localUrl = 'http://192.168.1.224:3001/device'

	const sendToServer = async (status: Number) => {
		try {
			await fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ "id": "lolin", "status": status })
			}).then(response => response.json())
				.then(response => {
					console.log(response);
					setState(response.status);
					setDeviceName(response.device);
				})
		}
		catch (err) {
			console.log(err);
		}
	}


	return (
		<>
			<View style={styles.container}>
				<DeviceBox deviceName={deviceName} onpress={sendToServer} state={state}/>
				<DeviceBox deviceName={deviceName} onpress={sendToServer} state={state}/>
			</View>
		</>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
	},
});