import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';


export default function App() {

  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [tulos, setTulos] = useState(0);

  const summa = () => {
    setTulos(parseInt(numero1) + parseInt(numero2));
  }
  const miinus = () => {
    setTulos(numero1 - numero2);

  }


  return (
    <View style={styles.container}>
      <View style={styles.resultField}>
        <Text>Result: </Text>
        <Text>{tulos}</Text>
      </View>
      <View style={styles.inputFields}>
        <Text>Number 1:</Text>
        <TextInput style={styles.numField} keyboardType={'numeric'} onChangeText={text => setNumero1(text)} value={numero1} />
      </View>
      <View style={styles.inputFields}>
        <Text>Number 2:</Text>
        <TextInput style={styles.numField} keyboardType={'numeric'} onChangeText={text => setNumero2(text)} value={numero2} />
      </View>
      <View>
        <View style={styles.buttonsStyle}>
          <Button title='+' onPress={summa} /> 
          <Button title='-' onPress={miinus} />
        </View>
      </View>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,
    fontSize: 20,
  },

  numField: {
    flexDirection: 'row',
    width: 100,
    marginLeft: 10
  },

  resultField: {
    flexDirection: 'row'
  },

  buttonsStyle: {
    flexDirection: 'row',
    margin: 30,
  },

  inputFields: {
    flexDirection: 'row',
    margin: 10
  }



});
