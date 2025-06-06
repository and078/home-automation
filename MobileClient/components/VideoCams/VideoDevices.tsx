import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import VideoDevice from "./VideoDevice";
import VideoWebView from "./VideoWebView";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface videoDeviceData {
	name: string,
	ip: string,
	type: string,
	ws_server_port: Number
};

interface pressedDevice {
	name: string,
	ip: string,
	port: Number
};

const VideoDevices = () => {
	console.log("VideoDevices()");
	const devicesUrl = process.env.EXPO_PUBLIC_VIDEO_DEVICES_API;
	const startStream = process.env.EXPO_PUBLIC_START_STREAM;
	const stopStream = process.env.EXPO_PUBLIC_STOP_STREAM;
	const [videoDevices, setVideoDevices] = useState<Array<videoDeviceData>>([]);
	const [showWebView, setShowWebView] = useState<boolean>(false);
	const [pressedDevice, setPressedDevice] = useState<pressedDevice>({ name: '', ip: '', port: 0 });



	useEffect(() => {
		const getAllVideoDevices = async () => {
			try {
				const getAddress = async () => {
					const a = await AsyncStorage.getItem('serverIp');
					if (a) {
						console.log("VideoDevices", `${a}${devicesUrl}`);
						const res = await fetch(`${a}${devicesUrl}`);
						const data = await res.json();
						setVideoDevices(data.data);
					};
				}
				getAddress();
			} catch (error) {
				console.log(error);
			}
		}
		getAllVideoDevices();
	}, [])



	const turnOnStream = async (cameraPort: Number) => {
		try {
			let a = await AsyncStorage.getItem('serverIp');
			if (a) {
				await fetch(`${a}${startStream}${cameraPort}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const turnOffStream = async (cameraPort: Number) => {
		try {
			let a = await AsyncStorage.getItem('serverIp');
			if (a) {
				await fetch(`${a}${stopStream}${cameraPort}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			{!showWebView ? (
				<View style={styles.video_devices}>
					<Text style={styles.text}>Video devices</Text>
					<FlatList
						data={videoDevices}
						numColumns={4}
						renderItem={({ item }) => {
							return (
								<>
									<VideoDevice
										name={item.name}
										url={item.ip}
										sendStateToIndex={(pressed) => {
											turnOnStream(item.ws_server_port);
											setShowWebView(pressed);
											setPressedDevice({ name: item.name, ip: item.ip, port: item.ws_server_port });
										}} />
								</>
							);
						}} /></View>
			) : (
				<View style={styles.devices}>
					<VideoWebView
						name={pressedDevice.name}
						port={pressedDevice.port}
						ip={pressedDevice.ip}
						sendState={(pressed) => {
							turnOffStream(pressedDevice.port);
							setShowWebView(pressed);
						}} />
				</View>
			)}
		</>
	)
}

export default VideoDevices;

const styles = StyleSheet.create({
	container: {
		padding: 2,
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	devices: {
		flex: 2,
		width: Dimensions.get('window').width - 20,
		height: Dimensions.get('window').height / 2.8,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 50,
	},
	video_devices: {
		flex: 1,
		width: Dimensions.get('window').width - 20,
		height: Dimensions.get('window').height / 2.8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 15,
		padding: 15,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});