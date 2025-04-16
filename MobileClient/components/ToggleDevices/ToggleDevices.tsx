import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "./DeviceBox";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface deviceData {
	status: Number,
	name: string,
	type: string,
};

const ToggleDevices = () => {
	console.log("ToggleDevices()");
	const toggleDevicesApi = process.env.EXPO_PUBLIC_TOGGLE_DEVICES_STATE_API;
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	useEffect(() => {
		const initDevices = async () => {
			const a = await AsyncStorage.getItem('serverIp');
			if(a) {
				const res = await getAlldevices(`${a}${toggleDevicesApi}`);
				console.log(res);
			}
		}
		initDevices()
	}, []) 

	const getAlldevices = async (url: string | undefined) => {
		try {
			if (url) {
				const res = await fetch(url);
				const data = await res.json();
				setDevices(data.data);
				return data.data; //unchecked
			}
		} catch (error) {
			console.log(error);
			return {data: null}; //unchecked
		}
	}

	return (
		<View style={styles.devices}>
			<TouchableOpacity onPress={async () => {
				const a = await AsyncStorage.getItem('serverIp');
				if(a) {
					getAlldevices(`${a}${toggleDevicesApi}`)
				}
			}}>
				<Text style={styles.text}>Refresh devices</Text>
			</TouchableOpacity>
			<FlatList
				data={devices}
				numColumns={4}
				renderItem={({ item }) => {
					return (
						<>
							<DeviceBox
								deviceName={item?.name}
								state={item?.status}
								type={item?.type}
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