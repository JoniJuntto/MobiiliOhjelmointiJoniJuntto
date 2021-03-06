import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {

  const [guess, setGuess] = useState('')
  const [teksti, setTeksti] = useState("Guess a number between 1-100");

  const [rndNmbr, setrndNmbr] = useState(() => {
    return Math.floor(Math.random() * 100 ) + 1;
  });

  var [trys, setTrys] = useState(() => {
    return 1
  });
 
  const tryGuess = () => {
    if(parseInt(guess) == rndNmbr ){
      Alert.alert("You guessed the number in " + trys + " guesses");
      setrndNmbr(Math.floor(Math.random() * 100 ) + 1);
      setTrys(1)
      setTeksti("Guess a number between 1-100")
      setGuess('');
    }
    else if (parseInt(guess) < rndNmbr){
      setTeksti("Your guess "+ guess + " was too low");
      setTrys(prevTrys => prevTrys + 1)
      setGuess('');
    }
    else if (parseInt(guess) > rndNmbr){
      setTeksti("Your guess "+ guess + " was too high");
      setTrys(prevTrys => prevTrys + 1)
      setGuess('');
    }
    
  }

  return (
    <View style={styles.container}>
      <Text>{teksti}</Text>
      <TextInput style={styles.inputField} keyboardType ={'numeric'} onChangeText={text => setGuess(text)} value = {guess}/>
      <Button title='Take a guess' onPress={tryGuess} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    width: 25,
    height: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom:10,
    marginTop: 10
  }
});
