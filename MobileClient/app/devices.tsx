import { View, StyleSheet, Text, ImageBackground, Dimensions, FlatList } from 'react-native'
import image from '@/assets/images/house.png'
import React, { useEffect, useState } from 'react';
import CircularProgress from '@/components/other/CircularProgress';

const devices = () => {
	
	return (
		<View style={styles.container}>
			<ImageBackground source={image} style={styles.image}>
				<Text style={styles.text}>Devices</Text>
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