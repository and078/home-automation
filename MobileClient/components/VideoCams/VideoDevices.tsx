import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import VideoDevice from "./VideoDevice";
import VideoWebView from "./VideoWebView";

interface videoDeviceData {
	name: string,
	ip: string,
	type: string,
	ws_server_port: Number
};

interface pressedDevice {
	name: string,
	ip: string
};

const VideoDevices = () => {
	console.log("VideoDevices()");
	const devicesUrl = process.env.EXPO_PUBLIC_VIDEO_DEVICES_API;
	const startStream = process.env.EXPO_PUBLIC_START_STREAM;
	const stopStream = process.env.EXPO_PUBLIC_STOP_STREAM;
	const [videoDevices, setVideoDevices] = useState<Array<videoDeviceData>>([]);
	const [showWebView, setShowWebView] = useState<boolean>(false);
	const [pressedDevice, setPressedDevice] = useState<pressedDevice>({ name: '', ip: '' });

	useEffect(() => {
		getAllVideoDevices(devicesUrl);
	}, [])

	const getAllVideoDevices = async (url: string | undefined) => {
		if (!url) {
			throw new Error("URL is undefined");
		  }
		try {
			const res = await fetch(url);
			const data = await res.json();
			setVideoDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const turnOnStream = async (cameraUrl: Number) => {
		console.log(cameraUrl);
		
		try {
			const res = await fetch(`${startStream}${cameraUrl}`);
			const data = await res.json();
		} catch (error) {
			console.log(error);
		}
	}

	const turnOffStream = async () => {
		try {
			const res = await fetch(`${stopStream}`);
			const data = await res.json();
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
											setPressedDevice({ name: item.name, ip: item.ip });
										}} />
								</>
							);
						}} /></View>
			) : (
				<View style={styles.devices}>
					<VideoWebView
						name={pressedDevice.name}
						ip={pressedDevice.ip}
						sendState={(pressed) => {
							turnOffStream();
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