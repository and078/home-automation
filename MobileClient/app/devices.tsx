import { View, StyleSheet, Text, ImageBackground, Dimensions, StatusBar, TextInput } from 'react-native'
import image from '@/assets/images/house.png'
import React from 'react';
import UserIntut from '@/components/DevicesManage/UserIntut';

const devices = () => {

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
			<ImageBackground source={image} style={styles.image}>
				<View style={styles.inputsBox}>
					<UserIntut label="Device name" />
					<UserIntut label="Device URL" />
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
		// flex: 3,
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