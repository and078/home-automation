import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "@/components/DeviceBox";
import image from "@/assets/images/house.png";
import VideoWebView from "@/components/VideoWebView";
import VideoDevice from "@/components/VideoDevice";


interface deviceData {
	status: Number,
	name: string,
	type: string,
};

interface videoDeviceData {
	name: string,
	url: string,
	type: string,
};

interface pressedDevice {
	name: string,
	url: string
};

const REMOTE_API = 'http://188.237.107.39:3001/devices-state/';
const STREAM_API = 'http://188.237.107.39:3001/video-devices/';
const START_STREAM = 'http://188.237.107.39:3001/start-stream/';
const STOP_STREAM = 'http://188.237.107.39:3001/stop-stream/';

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);
	const [videoDevices, setVideoDevices] = useState<Array<videoDeviceData>>([]);
	const [showWebView, setShowWebView] = useState<boolean>(false);
	const [pressedDevice, setPressedDevice] = useState<pressedDevice>({ name: '', url: '' });

	const getAlldevices = async () => {
		try {
			const res = await fetch(REMOTE_API);
			const data = await res.json();
			setDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const getAllVideoDevices = async () => {
		try {
			const res = await fetch(STREAM_API);
			const data = await res.json();
			setVideoDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const turnOnStream = async (cameraUrl: string) => {
		try {
			const res = await fetch(`${START_STREAM}${cameraUrl}`);
			const data = await res.json();
			console.log(data, 'is on');

		} catch (error) {
			console.log(error);

		}
	}

	const turnOffStream = async (cameraUrl: string) => {
		try {
			const res = await fetch(`${STOP_STREAM}${cameraUrl}`);
			const data = await res.json();
			console.log(data, ' is off');

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAlldevices();
		getAllVideoDevices();
	}, [])

	return (
		<>
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
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
													turnOnStream(item.name);
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
									turnOffStream(pressedDevice.name);
									setShowWebView(pressed);
								}} />
						</View>
					)}

					<View style={styles.devices}>
						<TouchableOpacity onPress={getAlldevices}>
							<Text style={styles.text}>Refresh devices</Text>
						</TouchableOpacity>
						<FlatList
							data={devices}
							numColumns={4}
							renderItem={({ item }) => {
								return (
									<>
										<DeviceBox
											deviceName={item.name}
											state={item.status}
											type={item.type}
										/>
									</>
								)
							}}
						/>
					</View>
				</ImageBackground>
			</View>
		</>
	)
}

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
