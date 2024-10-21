import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "@/components/DeviceBox";

interface deviceData {
	status: Number,
	name: string,
	type: string,
};

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	useEffect( () => {
		const getAlldevices = async () => {
			const res = await fetch('https://hmaubck.serveo.net/devices-state/');
			const data = await res.json();
			console.log("useEffect data", data.data);
			setDevices(data.data)
		}
		getAlldevices()
			.catch(console.error)
	}, [])

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.text}>All devices</Text>
				<FlatList
					data={devices}
					numColumns={3}
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
			</View>
		</>
	)
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
		padding: 10,
		fontSize: 15,
	},
});
