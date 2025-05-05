import { View, StyleSheet, Text, ImageBackground, Dimensions, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import UserInput from '@/components/DevicesManage/UserInput';

interface deviceData {
	status: Number,
	name: string,
	type: string,
	url: string,
	id: Number,
};

const devices = () => {
	const [devices, setDevices] = useState<Array<deviceData>>([]);
	const devicesEndpoint = process.env.EXPO_PUBLIC_TOGGLE_DEVICES_STATE_API;

	useFocusEffect(
		useCallback(() => {
			const getToggleDevices = async () => {
				const a = await AsyncStorage.getItem('serverIp');
				if(a) {
					const res = await fetch(`${a}${devicesEndpoint}`)
					const data = await res.json();
					setDevices(data.data);
					console.log(data.data);
				}
			}
			getToggleDevices();
		}, [])
	);

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>	
			<FlatList
				data={devices}
				numColumns={1}
				renderItem={({ item }) => {
					return (
						<>
							<UserInput
								label={item.name}
								deviceId={item.id}
							/>
						</>
					)
				}}
			/>
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
	text: {
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		fontSize: 10,
	},
	image: {
		flex: 1,
		resizeMode: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});

export default devices