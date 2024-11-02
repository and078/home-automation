import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "@/components/DeviceBox";
import image from "@/assets/images/house.png";
import VideoViewView from "@/components/VideoViewView";


interface deviceData {
	status: Number,
	name: string,
	type: string,
};

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	const REMOTE_API = 'http://188.237.107.39:3001/devices-state';
	const videoUrl = 'http://188.237.107.39:1234/';



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

	useEffect(() => {
		getAlldevices()
	}, [])

	return (
		<>
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
					<TouchableOpacity>
						<View style={{
							width: Dimensions.get('window').width - 20,
							height: Dimensions.get('window').height / 2.8,
							alignItems: 'center',
							justifyContent: 'center',
							borderColor: "#14cee6cc",
							borderWidth: 1,
							borderRadius: Dimensions.get('window').height / 40,
						}}>
							<VideoViewView videoSource={videoUrl} />
						</View>
					</TouchableOpacity>

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
							return (<>
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
