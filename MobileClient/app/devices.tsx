import { View, StyleSheet, Text, ImageBackground, Dimensions, StatusBar } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const devices = () => {

	const [addr, setAddr] = useState<string>();

	const getStorage = async () => {
		try {
			const ip = await AsyncStorage.getItem('serverIp')
			const port = await AsyncStorage.getItem('serverPort')
			if (ip !== null && port !== null) {
				setAddr(`http://${ip}:${port}`)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useFocusEffect(
		useCallback(() => {
			getStorage();
		}, [])
	);

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>
				<Text style={styles.text}>{addr}</Text>
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