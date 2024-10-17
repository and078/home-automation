import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";

interface IToggleButton {
    onpress: (staus: Number) => void,
}

export default function ToggleButton(props: IToggleButton) {
    const [buttonState, setButtonState] = useState(0);

    const pressHandler = () => {
        buttonState ? setButtonState(0) : setButtonState(1);
        props.onpress(buttonState);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={pressHandler}>
                    <Text style={styles.text}>
                        {!!buttonState ? "On" : "Off"}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25298f',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 50,
        borderRadius: 15,
        margin: 5,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
