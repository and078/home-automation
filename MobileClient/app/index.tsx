import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "@/components/DeviceBox";
import image from "@/assets/images/home.png";

interface deviceData {
	status: Number,
	name: string,
	type: string,
};

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	const getAlldevices = async () => {
		const res = await fetch('https://hmaubck.serveo.net/devices-state/');
		const data = await res.json();
		console.log("useEffect data", data.data);
		setDevices(data.data)
	}

	const handleStateFromDevice = (name: string, status: Number) => {
		let device = devices.find(d => d.name === name);
		if(device?.status) {
			device.status = status;
		}
		console.log('handleStateFromDevice');
	}

	useEffect(() => {
		getAlldevices()
	}, [])

	return (
		<>
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
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
						numColumns={3}
						renderItem={({ item }) => {
							return (<>
								<DeviceBox
									deviceName={item.name}
									state={item.status}
									type={item.type}
									sendStateToIndex={() => handleStateFromDevice(item.name, item.status)}
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
