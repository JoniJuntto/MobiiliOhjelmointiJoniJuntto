import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'md-home';
      return <Ionicons name={iconName} size={size} color={color} />;
    } else if (route.name === 'History') {
      return <MaterialCommunityIcons name="history" size={size} color={color} />
    };

    
  }
});


export function HomeScreen({ navigation }){
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [tulos, setTulos] = useState('');

  const[text, setText] = useState(() => {
    return null;
  });

  const[data, setData] = useState([]);

  const summa = () => {
    setTulos(parseInt(numero1) + parseInt(numero2));
    const result = (parseInt(numero1) + parseInt(numero2));
    setText(numero1 + " + " + numero2 + " = " + result)
    setData([...data, {key:text }])
    
  };
  const miinus = () => {
    setTulos(numero1 - numero2);
    const result = numero1 - numero2;
    setText(numero1 + " - " + numero2 + " = " + result)
    setData([...data, {key:text }])
  };
  


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
          <Button onPress={ () => navigation.navigate('History', {list: data})}title="History"/>
      </View>
      </View>
      </View>
      
  )
};

export function HistoryScreen ({route, navigation}) {

  const { list } = route.params;

  return(
    <View>
        <Text>History</Text>
        <FlatList data={list} renderItem={({item}) => <Text>{item.key}</ Text>}/>
      </View>
  );
};



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
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