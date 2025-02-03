import React from 'react'
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native'

interface UserInputProps {
    label: string,
}

const UserInput = (props: UserInputProps) => {
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
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#0f505588',
        borderRadius: 10,
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

export default UserInput