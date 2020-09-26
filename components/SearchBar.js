import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';

import useDebounce from '../hooks/useDebouce'


export default function Search({dispatch}) {
  const [value, setValue] = useState('')

  const debounced = useDebounce(value, 500)

  useEffect(() => {
    if (debounced) {
      console.log('...fetching from api')
      fetch(`https://www.omdbapi.com/?apikey=538adb24&s=${debounced}&type=movie`)
      .then(res => 
        res.ok ? res.json() 
          : Error('omodb api search error'))
      .then(res => dispatch({type: 'SET_RESULTS', searchResults: res.Search}))
    }
    else {
      dispatch({type: 'SET_RESULTS', searchResults: []})
    }
  }, [debounced])

  function handleChange(value) {
    setValue(value)
  }

  return (
    <SearchBar
    round
    containerStyle={styles.container}
    inputContainerStyle={styles.input}
    placeholder='search a movie'
    onChangeText={handleChange}
    value={value}
    />
  )
}

const styles = {
  container: {
    backgroundColor: `transparent`,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  input: {
    backgroundColor: `white`,
  }
}