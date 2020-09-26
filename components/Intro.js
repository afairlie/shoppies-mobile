import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Intro() {
  return (
  <>
  <View style={styles.step}>
    <View style={styles.numContainer}><Text style={styles.num}>1</Text></View>
    <View style={styles.textContainer}>
    <Text style={styles.text}>Search for your favourite film</Text>
    </View>
  </View>
  <View style={styles.step}>
    <View style={styles.numContainer}><Text style={styles.num}>2</Text></View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Nominate it</Text>
    </View>
  </View>
  <View style={styles.step}>
    <View style={styles.numContainer}><Text style={styles.num}>3</Text></View>
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
  },
  lastStep: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    marginTop: 30,
  },
  numContainer: {
    borderRadius: 20,
    backgroundColor: `white`,
    width: 30,
    height: 30,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  num: {
    fontFamily: `Baskerville-Bold`,
    fontSize: 25,
    color: `#5e4629`,
    paddingLeft: 2,
    paddingTop: 1,
  },
  textContainer: {
    paddingTop: 8, 
    marginLeft: 20,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: `#5e4629`,
  },
  text: {
    fontFamily: `Avenir-Heavy`,
    fontSize: 25,
    color: `#5e4629`,
    paddingLeft: 2,
  },
});