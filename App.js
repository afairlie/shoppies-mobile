import { StatusBar } from 'expo-status-bar';
import React, {useReducer, useEffect} from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import formatResults from './helpers/formatResults'

import Logo from './components/Logo'
import Intro from './components/Intro'
import Search from './components/SearchBar'

// const searchResults = [{id: "tt0078788", title: "Apocalypse Now", year: "1979", nominated: false}, {id: "tt3385516", title: "X-Men: Apocalypse", year: "2016", nominated: false}, {id: "tt0318627", title: "Resident Evil: Apocalypse", year: "2004", nominated: false}, {id: "tt1727776", title: "Scouts Guide to the Zombie Apocalypse", year: "2015", nominated: false}, {id: "tt1673430", title: "Superman/Batman: Apocalypse", year: "2010", nominated: false}, {id: "tt0337103", title: "Crimson Rivers 2: Angels of the Apocalypse", year: "2004", nominated: false}, {id: "tt0102015", title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: "1991", nominated: false}, {id: "tt1649443", title: "[REC] 4: Apocalypse", year: "2014", nominated: false}, {id: "tt6433880", title: "Anna and the Apocalypse", year: "2017", nominated: false}, {id: "tt0435687", title: "The League of Gentlemen's Apocalypse", year: "2005", nominated: false},
// ]

function reducer(state, action) {
  switch(action.type) {
    case 'SET_RESULTS': {
      const results = formatResults(action.searchResults, state.nominations)
      const newState = { ...state, results: [...results] }
      if (action.setIntro) { newState.intro = false }
      return newState
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
      dispatch({ type: 'SET_RESULTS', searchResults: [], setIntro: true })
    }, 5000)
  }, [])

  return (
    <View style={styles.container}>
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
          />
        )
      })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(144,238,144)',
    paddingTop: 60,
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
