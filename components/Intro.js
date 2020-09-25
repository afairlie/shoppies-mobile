import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default function Intro() {
  return (
  <>
    <Text style={styles.steps}>Step 1: search for your favourite film</Text>
    <Text style={styles.steps}>Step 2: nominate it</Text>
    <Text style={styles.steps}>Step 3: repeat!</Text>
    <Text style={styles.steps}>Nominate up to 5 films 👍</Text>
  </>
  )
}

const styles = StyleSheet.create({
  steps: {
    fontFamily: `ArialMT`,
    fontSize: 20,
    color: `#5e4629`,
  },
});