import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

interface DeviceBoxProps {
    deviceName: string,
    state: Number,
    type: string,
}

const DeviceBox = (props: DeviceBoxProps) => {

    const [boxState, setBoxState] = useState<Number>(props.state);
    const [color, setColor] = useState<string>("#423c3fcc");

    const setColorByState = (state: Number): void => {
        if (state == 1) setColor("#0f5055cc");
        if (state == 0) setColor("#111315");
        if (state == -1) setColor("#423c3fcc");
    }

    useEffect(() => {
        setColorByState(props.state);
    }, [props.state]);

    const toggle = (state: Number) => {
        if (state == 0) return 1;
        if (state == 1) return 0;
        return state;
    }

    const postToDevice = async (status: Number, name: string) => {
        try {
            await fetch('https://hmaubck.serveo.net/device', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": name, "status": status })
            })
                .then(response => response.json())
                .then(response => {
                    setBoxState(response.status);
                    setColorByState(response.status);
                })
        }
        catch (err) {
            console.log("PostError: ", err);
        }
    }

    return (
        <>
            <TouchableOpacity
                onPress={async () => {
                    await postToDevice(toggle(boxState), props.deviceName);
                }}>
                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width / 3 - 15,
                    height: Dimensions.get('window').height / 10,
                    backgroundColor: color,
                    borderRadius: Dimensions.get('window').height / 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    borderColor: "#14cee6cc",
                    borderWidth: 1,
                }}>
                    <Text style={styles.text}>{props.deviceName}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 15,
    }
});

export default DeviceBox;
