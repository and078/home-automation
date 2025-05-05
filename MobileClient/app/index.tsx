import { View, StyleSheet, ImageBackground, Dimensions, StatusBar, Platform } from "react-native";
import image from "@/assets/images/house.png";
import ToggleDevices from "@/components/ToggleDevices/ToggleDevices";
import VideoDevices from "@/components/VideoCams/VideoDevices";
import * as NavigationBar from 'expo-navigation-bar';
import React, {  useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";

export default function Index() {
	console.log("Index()");
	useFocusEffect(
		useCallback(() => {
			NavigationBar.setBackgroundColorAsync('#00000000');
		  NavigationBar.setButtonStyleAsync('light');
		}, [])
	)

	return (
		<>
			<View style={styles.container}>
				<StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
				<ImageBackground source={image} style={styles.image}>
					<VideoDevices />
					<ToggleDevices />
				</ImageBackground>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 2,
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
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
