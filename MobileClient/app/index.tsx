import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import image from "@/assets/images/house.png";
import ToggleDevices from "@/components/ToggleDevices/ToggleDevices";
import VideoDevices from "@/components/VideoCams/VideoDevices";

export default function Index() {
	console.log("Index()");
	
	return (
		<>
			<View style={styles.container}>
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
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
