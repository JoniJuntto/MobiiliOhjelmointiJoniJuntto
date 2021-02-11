import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CalculatorScreen({ navigation }) {

  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [tulos, setTulos] = useState('');

  var teksti = ''

  const[data, setData] = useState([]);

  const summa = () => {
    setTulos(parseInt(numero1) + parseInt(numero2));
    const result = (parseInt(numero1) + parseInt(numero2));
    teksti = (numero1 + " + " + numero2 + " = " + result)
    setData([...data, {key:teksti }])
    setNumero1('')
    setNumero2('')
  }
  const miinus = () => {
    setTulos(numero1 - numero2);
    const result = numero1 - numero2;
    teksti = (numero1 + " - " + numero2 + " = " + result)
    setData([...data, {key:teksti }])
    setNumero1('')
    setNumero2('')
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
          <Button
        title="History"
        onPress={ () => navigation.navigate("History", {list: data})}
      />
        </View>

      </View>
    </View>
  );
}

function HistoryScreen({route}) {

  const { list } = route.params;

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList data={list} renderItem={({item}) => <Text>{item.key}</ Text>}/>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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