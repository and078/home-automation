import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import image from "@/assets/images/house.png";
import ToggleDevices from "@/components/ToggleDevices/ToggleDevices";
import VideoDevices from "@/components/VideoCams/VideoDevices";
import React from "react";
import HorizontalSpacer from "@/components/other/HorizontalSpacer";

export default function Index() {
	console.log("Index()");

	return (
		<>
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
					<VideoDevices />
					<HorizontalSpacer />
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
