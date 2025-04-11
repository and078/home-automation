import { View, StyleSheet, Text, ImageBackground, Dimensions, FlatList, StatusBar } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useState, useCallback } from 'react';
import CircularProgress from '@/components/other/CircularProgress';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const performance = () => {
	console.log("PERFORMANCE");
	const cpuUsageEndpoint = process.env.EXPO_PUBLIC_CPUS_PERFORMANCE;
	const memoruUsageEndpoint = process.env.EXPO_PUBLIC_MEMORY_PERFORMANCE;
	const [cpuProgress, setCpuProgress] = useState({});
	const [memoryProgress, setMemoryProgress] = useState(0);
	// const [address, setAddress] = useState<string>('');

	useFocusEffect(
		useCallback(() => {
			let address: string = '';
			const fetchFromStoredAddress = async () => {
				try {
					const addr = await AsyncStorage.getItem('serverIp');
					if (addr) {
						address = addr;
					}
				} catch (error) {
					console.log(error);
				}
			}
			fetchFromStoredAddress();
			const interval = setInterval(async () => {
				await getCPUProgress(`${address}${cpuUsageEndpoint}`);
				await geMemogyProgress(`${address}${memoruUsageEndpoint}`);
			}, 1000);
			return () => {
				clearInterval(interval);
			}
		}, [])
	);

	const objectToArray = (object: any) => {
		let arr = [];
		for (const key in object) {
			arr.push([key, object[key]]);
		}
		return arr;
	}

	const getCPUProgress = async (url: string) => {
		if (cpuUsageEndpoint) {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setCpuProgress(data.data.CPUsPerformance);
			} catch (error) {
				console.log("getCPUProgress", error);
			}

		}
	}

	const geMemogyProgress = async (url: string) => {
		if (memoruUsageEndpoint) {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setMemoryProgress(data.data.MemoryPerformance);
			} catch (error) {
				console.log("geMemogyProgress", error);
			}

		}
	}

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>CPU Usage</Text>
					<FlatList
						data={objectToArray(cpuProgress)}
						numColumns={3}
						renderItem={({ item }) => {
							return (
								<>
									<CircularProgress
										progress={Number(item[1])}
										size={100}
										name={item[0]}
									/>
								</>
							)
						}}
					/>
				</View>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>Memory Usage</Text>
					<CircularProgress
						progress={memoryProgress}
						size={100}
						name="Memory"
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
	innerContainer: {
		flex: 2,
		margin: 10,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#14cee6cc',
		height: Dimensions.get('window').height / 3,
		width: Dimensions.get('window').width - 20,
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

export default performance