import React from 'react'
import {View, StyleSheet, Image} from 'react-native'

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginBottom: 10,
  },
  logo: {
    height: 80,
    width: 360,
  },
});