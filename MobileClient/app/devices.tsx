import DeviceBox from '@/components/DeviceBox';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'

const devices = () => {

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.text}>Devices</Text>
			</View>
		</>

	);
}

export default devices

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
	},
});