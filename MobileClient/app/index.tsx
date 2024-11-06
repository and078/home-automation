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
}

interface pressedDevice {
	name: string,
	url: string
}

const REMOTE_API = 'http://188.237.107.39:3001/devices-state';
const STREAM_API = 'http://188.237.107.39:3001/video-devices/';

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);
	const [videoDevices, setVideoDevices] = useState<Array<videoDeviceData>>([]);
	const [showWebView, setShowWebView] = useState<boolean>(false);
	const [pressedDevice, setPressedDevice] = useState<pressedDevice>({name: '', url: ''});

	const getAlldevices = async () => {
		try {
			const res = await fetch(REMOTE_API);
			const data = await res.json();
			console.log("useEffect data", data.data);
			setDevices(data.data)
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

	useEffect(() => {
		getAlldevices();
		getAllVideoDevices();
	}, [])


	return (
		<>
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
					{!showWebView ? (
						<FlatList
							data={videoDevices}
							numColumns={4}
							renderItem={({ item }) => {
								return (
									<>
										<VideoDevice
											name={item.name}
											url={item.url}
											sendStateToIndex={(pressed, name) => {
												setShowWebView(pressed);
												setPressedDevice({name: item.name, url: item.url});
											}}
										/>
									</>
								)
							}}
						/>
					) : (
						<View style={{
							width: Dimensions.get('window').width - 20,
							height: Dimensions.get('window').height / 2.8,
							alignItems: 'center',
							justifyContent: 'center',
							borderColor: "#14cee6cc",
							borderWidth: 1,
							borderRadius: Dimensions.get('window').height / 40,
						}}>
							<VideoWebView 
								name={pressedDevice.name} 
								url={pressedDevice.url} 
								sendState={(pressed) => {
									setShowWebView(pressed);
								}}/>
						</View>
					)}

					<TouchableOpacity onPress={getAlldevices}>
						<View style={{
							backgroundColor: "#ecf5f600",
							margin: 15,
							borderColor: "#14cee6cc",
							borderWidth: 1,
							borderRadius: 20,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
							<Text style={styles.text}>Refresh devices</Text>
						</View>
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

				</ImageBackground>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',//'#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 20,
		padding: 15,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
