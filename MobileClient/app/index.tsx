import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import DeviceBox from "@/components/DeviceBox";

interface deviceData {
	status: Number,
	name: string,
	type: string,
};

export default function Index() {
	const [devices, setDevices] = useState<Array<deviceData>>([]);

	const MILLISECS: number = 5000;

	useEffect(() => {
		const interval = setInterval(() => {
			const getAlldevices = async () => {
				const res = await fetch('https://hmaubck.serveo.net/devices-state/');
				const data = await res.json();
				console.log("useEffect data", data.data);
				setDevices(data.data)
			}
			getAlldevices().catch(console.error)
		}, MILLISECS);
		return () => clearInterval(interval);
	}, [])

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => {}}>
					<View style={{
						backgroundColor: "#ecf5f600",
						margin: 15,
						borderColor: "white",
						borderWidth: 1,
						borderRadius: 20,
					}}>
						<Text style={styles.text}>All devices</Text>
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
		fontSize: 20,
		padding: 15,
	},
});
