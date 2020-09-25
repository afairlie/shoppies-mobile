import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Badge } from 'react-native-elements'

// textStyle={{color: `rgb(105,78,46)`}}

export default function Intro() {
  return (
  <>
  <View style={styles.step}>
    <View style={styles.count}><Text style={styles.num}>1</Text></View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Search for your favourite film</Text>
    </View>
  </View>
  <View style={styles.step}>
    <View style={styles.count}><Text style={styles.num}>2</Text></View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Nominate it</Text>
    </View>
  </View>
  <View style={styles.step}>
    <View style={styles.count}><Text style={styles.num}>3</Text></View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Repeat!</Text>
    </View>
  </View>
  <View style={styles.lastStep}>
    <Text style={styles.text}>Nominate up to 5 films 👍</Text>
  </View>
  </>
  )
}

const styles = StyleSheet.create({
  step: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    marginVertical: 5,
    marginLeft: 15,
  },
  lastStep: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    marginTop: 30,
    // backgroundColor: `rgb(238,232,170)`,
    // width: 400,
    // height: 100,
    // paddingLeft: 40,
  },
  count: {
    borderRadius: 20,
    backgroundColor: `white`,
    width: 30,
    height: 30,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  textContainer: {
    display: `flex`, 
    justifyContent: `center`, 
    paddingTop: 8, 
    paddingLeft: 20,
    width: 300,
  },
  text: {
    fontFamily: `HoeflerText-Black`,
    fontSize: 25,
    color: `#5e4629`,
    paddingLeft: 2,
  },
  num: {
    fontFamily: `Baskerville-Bold`,
    fontSize: 25,
    color: `#5e4629`,
    paddingLeft: 2,
    paddingTop: 1,
  },
});