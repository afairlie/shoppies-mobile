import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';

import Logo from './components/Logo'
import Intro from './components/Intro'
import Search from './components/SearchBar'

const searchResults = [{id: "tt0078788", title: "Apocalypse Now", year: "1979", nominated: false}, {id: "tt3385516", title: "X-Men: Apocalypse", year: "2016", nominated: false}, {id: "tt0318627", title: "Resident Evil: Apocalypse", year: "2004", nominated: false}, {id: "tt1727776", title: "Scouts Guide to the Zombie Apocalypse", year: "2015", nominated: false}, {id: "tt1673430", title: "Superman/Batman: Apocalypse", year: "2010", nominated: false}, {id: "tt0337103", title: "Crimson Rivers 2: Angels of the Apocalypse", year: "2004", nominated: false}, {id: "tt0102015", title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: "1991", nominated: false}, {id: "tt1649443", title: "[REC] 4: Apocalypse", year: "2014", nominated: false}, {id: "tt6433880", title: "Anna and the Apocalypse", year: "2017", nominated: false}, {id: "tt0435687", title: "The League of Gentlemen's Apocalypse", year: "2005", nominated: false}
]

export default function App() {
  const [state, setState] = useState({
    results: [],
    nominations: [],
    intro: true,
  })

  useEffect(() => {
    setTimeout(() => {
      setState({...state, results: [...searchResults], intro: false})
    }, 5000)
  }, [])

  return (
    <View style={styles.container}>
      <Logo/>
      <Search/>
      <View style={styles.main}>
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(144,238,144)',
    paddingTop: 80,
    alignItems: 'center',
  },
  main: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    minHeight: 120,
    marginTop: 10,
  },
  result: {
    marginBottom: 5,
    width: 320,
    borderColor: `rgb(0,100,0)`
  }
});
