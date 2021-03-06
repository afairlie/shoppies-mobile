import { StatusBar } from 'expo-status-bar';
import React, {useReducer, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Alert, Modal} from 'react-native';
import {BlurView} from 'expo-blur'
import { Button, Icon } from 'react-native-elements';

import formatSearchResults from './helpers/formatResults'
import DismissKeyboard from './wrappers/DismissKeyboard'

import Logo from './components/Logo'
import Intro from './components/Intro'
import Search from './components/SearchBar'

function reducer(state, action) {
  switch(action.type) {
    case 'TOGGLE_MODAL': {
      return {...state, listModal: !state.listModal}
    }
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
        Alert.alert(
          "Oops!",
          "You can only nominate 5 films",
          [
            { text: "cancel", onPress: () => {}, style: 'cancel' },
          ],
          { cancelable: false }
        )
        return state
      }
    }
    case 'REMOVE_NOMINATION': {
      action.movie.nominated = false;
      // if movie is in results, updated nominated to false
      if (state.results.includes(m => m.id === action.movie.id)) {
        const results = [...state.results]
        results.splice(state.results.findIndex(m => m.id === action.movie.id), 1, action.movie)
        const newNominations = state.nominations.filter(movie => movie.id !== action.movie.id)
        return {...state, nominations: [...newNominations], results}
      } else {
        const newNominations = state.nominations.filter(movie => movie.id !== action.movie.id)
        return {...state, nominations: [...newNominations]}
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
    listModal: false
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_RESULTS', results: [], setIntro: true })
    }, 4000)
  }, [])

  function handlePress(movie, index) {
    dispatch({type: 'NOMINATE', movie, index})
  }

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <Logo/>
        <View style={styles.actions}>
        <Icon
          raised
          name='list'
          type='font-awesome'
          color='rgb(105,78,46)'
          reverse
          onPress={() => dispatch({type: 'TOGGLE_MODAL'})}
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
        <Modal transparent visible={state.listModal}>
          <BlurView tint='dark' intensity={5} style={styles.modalBackground}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your nominations...</Text>
              <View style={styles.modalContents} >
                <View style={styles.nominations}>
                  {state.nominations.length !== 0 ? state.nominations.map((movie, i) => {
                    return (
                        <View style={styles.nomination} key={i}>
                          <Text style={styles.movie}>{`${movie.title}, ${movie.year}`}</Text>
                          <Button 
                            title='remove' 
                            type='clear' 
                            containerStyle={styles.remove} 
                            onPress={() => 
                              dispatch({type: 'REMOVE_NOMINATION', movie, index: i})} 
                            titleStyle={{color: `rgb(255,69,0)`}}/>
                        </View>
                      )
                    }) : (
                      <Text style={styles.nominations}>
                        You don't have any nominations yet. Search a movie, and select it from the search results to add it to your nominations!
                      </Text>
                    )}
                  </View>
                <Button 
                  raised 
                  type='outline' 
                  title='close' 
                  onPress={() => 
                    dispatch({type: 'TOGGLE_MODAL'})} 
                  buttonStyle={{borderColor: `rgb(0,100,0)`}} 
                  titleStyle={{color: `rgb(0,100,0)`}}/>
              </View>
            </View>
          </BlurView>
        </Modal>
        <StatusBar style="auto" />
      </SafeAreaView>
    </DismissKeyboard>
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
  modalBackground: {
    flex: 1,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  modal: {
    height: 350,
    width: 360,
    borderRadius: 20,
    backgroundColor: `white`,
    padding: 20,
  },
  modalTitle: {
    fontFamily: `Avenir-Heavy`,
    fontSize: 20,
    paddingLeft: 5,
    color: `rgb(0,100,0)`,
    marginBottom: 10,
  },
  modalContents: {
    display: `flex`,
    flex: 1,
    justifyContent: `space-between`
  },
  nominations: {
    display: `flex`,
    flex: 1,
    justifyContent: `flex-start`
  },
  nomination: {
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    marginBottom: 5,
    paddingHorizontal: 5,
    color: `#5e4629`,
    fontSize: 20,
  },
  movie: {
    display: `flex`,
    flex: 3,
    color: `#5e4629`, 
  },
  remove: {
    display: `flex`,
    flex: 1,
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
