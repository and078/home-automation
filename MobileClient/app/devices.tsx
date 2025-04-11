import { View, StyleSheet, Text, ImageBackground, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const devices = () => {

	const [addr, setAddr] = useState<string>('');

	useFocusEffect(
		useCallback(() => {
			const getDeviceName = async () => {
				try {
					const addr = await AsyncStorage.getItem('serverIp');
					if (addr) setAddr(addr);
				} catch (error) {
					console.log(error);
				}
			}
			getDeviceName();
		}, [])
	);

	const press = async () => {
		try {
			const res = await fetch(`${addr}/devices-state/`);
			const data = await res.json();
			setAddr(JSON.stringify(data.data[0]));
		} catch (error) {
			console.log('Devices', error);

		}
	}

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>
				<TouchableOpacity onPress={press}>
					<Text style={styles.text}>{addr}</Text>
				</TouchableOpacity>
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