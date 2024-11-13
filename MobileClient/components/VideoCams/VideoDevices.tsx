import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import VideoDevice from "./VideoDevice";
import VideoWebView from "./VideoWebView";
import { STREAM_API, START_STREAM, STOP_STREAM} from "@env";

interface videoDeviceData {
	name: string,
	url: string,
	type: string,
	ws_server_port: Number
};

interface pressedDevice {
	name: string,
	url: string
};

const VideoDevices = () => {
	console.log("VideoDevices()");
	

	const [videoDevices, setVideoDevices] = useState<Array<videoDeviceData>>([]);
	const [showWebView, setShowWebView] = useState<boolean>(false);
	const [pressedDevice, setPressedDevice] = useState<pressedDevice>({ name: '', url: '' });

	useEffect(() => {
		getAllVideoDevices();
	}, [])

	const getAllVideoDevices = async () => {
		try {
			const res = await fetch(STREAM_API);
			const data = await res.json();
			setVideoDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const turnOnStream = async (cameraUrl: Number) => {
		try {
			const res = await fetch(`${START_STREAM}${cameraUrl}`);
			const data = await res.json();
		} catch (error) {
			console.log(error);
		}
	}

	const turnOffStream = async () => {
		try {
			const res = await fetch(`${STOP_STREAM}`);
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
												url={item.url}
												sendStateToIndex={(pressed) => {
													turnOnStream(item.ws_server_port);
													setShowWebView(pressed);
													setPressedDevice({ name: item.name, url: item.url });
												}} />
										</>
									);
								}} /></View>
					) : (
						<View style={styles.devices}>
							<VideoWebView
								name={pressedDevice.name}
								url={pressedDevice.url}
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