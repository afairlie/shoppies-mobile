import { StatusBar } from 'expo-status-bar';
import React, {useReducer, useEffect} from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Keyboard} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import formatSearchResults from './helpers/formatResults'

import Logo from './components/Logo'
import Intro from './components/Intro'
import Search from './components/SearchBar'

function reducer(state, action) {
  switch(action.type) {
    case 'SET_RESULTS': {
      const results = formatSearchResults(action.results, state.nominations)
      const newState = { ...state, results: [...results] }
      if (action.setIntro) { newState.intro = false }
      return newState
    }
    case 'NOMINATE': {
      if (!state.nominations.find(m => m.id === action.movie.id) && state.nominations.length < 5) {
        action.movie.nominated = true;
        const results = [...state.results]
        results[action.index] = action.movie
        return {...state, nominations: [...state.nominations, action.movie], results}
      } else {
        // TO DO: send up an alert: you can only nominate 5 films!
        return state
      }
    }
    default: {
      throw new Error('no reducer action of that type')
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    results: [],
    nominations: [],
    intro: true,
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_RESULTS', results: [], setIntro: true })
    }, 5000)
  }, [])

  function handlePress(movie, index) {
    dispatch({type: 'NOMINATE', movie, index})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo/>
      <View style={styles.actions}>
      <Icon
        raised
        name='list'
        type='font-awesome'
        color='rgb(105,78,46)'
        reverse
      />
      <Search dispatch={dispatch}/>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
      {state.intro ? <Intro/> 
        : state.results.map((movie, i) => {
        return (
          <Button 
            key={i} 
            type='outline'
            title={`${movie.title}, ${movie.year}`}
            titleStyle={{color: `rgb(0,100,0)`, fontSize: 12}}
            buttonStyle={styles.result}
            onPress={() => handlePress(movie, i)}
            disabled={movie.nominated}
          />
        )
      })}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(144,238,144)',
    alignItems: 'center',
  },
  main: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    minHeight: 120,
    marginTop: 10,
    paddingBottom: 20,
  },
  actions: {
    display: `flex`,
    flexDirection: `row`,
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 5,
    backgroundColor: `rgba(105,78,46, 0.4)`,

    borderTopWidth: 1,
    borderTopColor: `rgb(105,78,46)`,
    borderBottomWidth: 1,
    borderBottomColor: `rgb(105,78,46)`
  },
  result: {
    marginBottom: 5,
    width: 320,
    borderColor: `rgb(0,100,0)`
  }
});
