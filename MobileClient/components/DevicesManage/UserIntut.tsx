import React from 'react'
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native'

interface UserIntutProps {
    label: string,
}

const UserIntut = (props: UserIntutProps) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{props.label}</Text>
        <TextInput 
            style={styles.input}
            placeholder={props.label}
            placeholderTextColor="#423c3fcc" 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'transparent',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    input: {
        height: 40,
        width: Dimensions.get('window').width / 1.1,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#0f505588',
    },
    text: {
        color: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5,
        fontSize: 15,
    }
});

export default UserIntut