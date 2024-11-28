import React from 'react';
import { StyleSheet, View } from 'react-native';

const HorizontalSpacer = () => {
  return (
    <View style={styles.container}>

    </View>
  )
}

export default HorizontalSpacer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    backgroundColor: "#0f505588",
    // borderBottomWidth: 1,
    // borderBottomColor: "#0f505588",
  }
});