import { View, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native'
import image from '@/assets/images/house.png'


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
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',

	},
	text: {
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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