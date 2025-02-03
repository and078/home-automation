import { View, StyleSheet, Text, ImageBackground, Dimensions, StatusBar, TextInput, FlatList, TouchableOpacity } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useEffect, useRef, useState } from 'react';
import UserInput from '@/components/DevicesManage/UserInput';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

interface toggleDevicesData {
	status: Number,
	name: string,
	type: string,
	id: Number,
	url: string
}


const devices = () => {
	const toggleDevices = process.env.EXPO_PUBLIC_TOGGLE_DEVICES_STATE_API;
	const [devices, setDevices] = useState<Array<toggleDevicesData>>([]);

	const getToggleDevices = async (url: string | undefined) => {
		if (!url) {
			throw new Error("URL is undefined");
		}
		try {
			const res = await fetch(url);
			const data = await res.json();
			setDevices(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getToggleDevices(toggleDevices);
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>
				<View style={styles.inputsBox}>
					<View style={styles.new_device}>
						<TouchableOpacity>
							<Text style={styles.buttons_text}>Add new device</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={devices}
						numColumns={1}
						renderItem={({ item }) => {
							return (
								<>	
									<View style={styles.device}>
										<Text style={styles.device_text}>{item.name}</Text>
										<View style={styles.buttons}>
											<TouchableOpacity>
												<Text style={styles.buttons_text}>Edit</Text>
											</TouchableOpacity>
										</View>
										<View style={styles.buttons}>
											<TouchableOpacity>
												<Text style={styles.buttons_text}>Delete</Text>
											</TouchableOpacity>
										</View>
									</View>
								</>
							)
						}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputsBox: {
		flex:1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	device_text: {
		color: '#fff',
		// paddingRight: 150,
		padding: 15,
		fontSize: 20,
	},
	buttons_text: {
		color: '#fff',
		padding: 20,
		fontSize: 13,
		// width: Dimensions.get('window').width / 5,
	},
	image: {
		flex: 1,
		resizeMode: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	device: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: '#0f505588',
		borderRadius: 10,
		width: Dimensions.get('window').width - 20,
		height: Dimensions.get('window').height / 10,
		margin: 5,
		padding: 2
	},
	buttons: {
		// flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: '#0f505588',
		borderRadius: 10,
		height: Dimensions.get('window').height / 12,
		width: Dimensions.get('window').width - 2000,
		margin: 3
	},
	new_device: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: '#0f505588',
		borderRadius: 10,
		height: Dimensions.get('window').height / 10,
		width: Dimensions.get('window').width - 50,
	}
});

export default devices