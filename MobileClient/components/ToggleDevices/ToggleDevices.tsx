import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "./DeviceBox";
import { REMOTE_API } from "@env";

interface deviceData {
	status: Number,
	name: string,
	type: string,
};

const ToggleDevices = () => {
	console.log("ToggleDevices()");
	
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	useEffect(() => {
		setTimeout(() => {
			getAlldevices();
		}, 500);
	}, [])

	const getAlldevices = async () => {
		try {
			const res = await fetch(REMOTE_API);
			const data = await res.json();
			setDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
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
	)
}

export default ToggleDevices

const styles = StyleSheet.create({
	devices: {
		flex: 2,
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
});