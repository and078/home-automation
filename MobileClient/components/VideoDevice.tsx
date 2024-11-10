import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

interface VideoDeviceProps {
	name: string,
	url: string,
	sendStateToIndex: (pressed: boolean, name: string) => void;
}

const VideoDevice = (props: VideoDeviceProps) => {
	const handlePress = () => {
		props.sendStateToIndex(true, props.name);
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={{
				flex: 1,
				width: Dimensions.get('window').width / 4 - 15,
				height: Dimensions.get('window').height / 12,
				backgroundColor: "#0f505588",
				borderRadius: Dimensions.get('window').height / 40,
				justifyContent: 'center',
				alignItems: 'center',
				margin: 5,
				borderColor: "#14cee6cc",
				borderWidth: 1,
			}}>
				<Text style={styles.text}>{props.name}</Text>
			</View>
		</TouchableOpacity>

	)
}

export default VideoDevice

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontSize: 12,
		padding: 5,
	},
});
