import React, { useState, useRef } from 'react';
import { SearchBar } from 'react-native-elements';


export default function Search() {
  const [term, setTerm] = useState('')
  const search = useRef(null)

  function handleChange(term) {
    setTerm(term)
  }

  return (
    <SearchBar
    ref={search}
    round
    containerStyle={styles.container}
    inputContainerStyle={styles.input}
    placeholder='search a movie'
    onChangeText={handleChange}
    value={term}
    />
  )
}

const styles = {
  container: {
    backgroundColor: `transparent`,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
    marginTop: 0,
  },
  input: {
    backgroundColor: `white`,
  }
}

// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: `white`,
//     width: `75%`,
//     borderRadius: 20,
//     padding: 5,
//     paddingLeft: 15,

//     shadowRadius: 2,
//     shadowColor: `black`,
//     shadowOpacity: 1,
//     shadowOffset: {
//       height: 2,
//       width: 0
//     },
//     overflow: `hidden`
//   }
// });