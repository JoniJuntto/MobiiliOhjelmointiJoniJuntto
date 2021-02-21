import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDy3hRVYE9wygm5pCnXYDnQNGDHyAWok9Q",
    authDomain: "shoppinglistappi.firebaseapp.com",
    databaseURL: "https://shoppinglistappi-default-rtdb.firebaseio.com",
    projectId: "shoppinglistappi",
    storageBucket: "shoppinglistappi.appspot.com",
    messagingSenderId: "180650359619"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }


  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setItemList(prods);
    });
  }, []);



  const saveItem = () => {
    firebase.database().ref('items/').push(
      { 'product': item, 'amount': amount }
    );
  };

  const deleteItem = () => {
    //Kokeiltu niin monta sorttia deleteä ettei loppua näy. Ongelmana ettei Firebasesta saanut KEYtä ulos :)
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <TextInput placeholder='Tuote' style={{ marginTop: 60, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(item) => setItem(item)}
        value={item} />

      <TextInput placeholder='Määrä' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount} />

      <Button onPress={saveItem} title="Tallenna" />

      <Text style={{ marginTop: 30, fontSize: 20, marginBottom: 50 }}>Ostoslista</Text>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.product}, {item.amount}</Text>
          <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.product, item.amount)}> Ostettu</Text></View>}
        data={itemList}
        ItemSeparatorComponent={listSeparator}
      />
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
    borderWidth: 1,
    borderStyle: 'solid',

  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
