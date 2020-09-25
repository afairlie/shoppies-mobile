import React from 'react'
import {Text, StyleSheet, Image} from 'react-native'

export default function Logo() {
  // return (<Text style={styles.logo}>Shoppies 🎞</Text>)
  return (<Image style={styles.logo} source={require('../assets/logo.png')}></Image>)
}

// const styles = StyleSheet.create({
//   logo: {
//     fontFamily: `GillSans-UltraBold`,
//     fontSize: 40,
//     color: `#5e4629`,
//   },
// });

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 360,
  },
});