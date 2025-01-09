import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface ICircularProgress {
    progress: number,
    size: number,
    name: string,
}

const CircularProgress = (props: ICircularProgress) => {

    return (
        <View>
            <Text style={styles.text}>{props.name}</Text>
            <AnimatedCircularProgress
                tintTransparency={true}
                arcSweepAngle={240}
                size={100}
                width={15}
                rotation={240}
                lineCap="round"
                fill={props.progress}
                tintColor="#14cee6cc"
                padding={10}
                backgroundColor="#3d5875" >
                {
                    (progress) => (
                        <Text style={styles.text}>
                            {`${Number(progress).toFixed(2)}%`}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
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

export default CircularProgress