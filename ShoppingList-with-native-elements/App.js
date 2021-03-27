import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem, Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

const db = SQLite.openDatabase('shoppinglistDB.db');

export default function App() {

  

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [itemList, setItemList] = useState([]);
  

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, item text, amount text);');
    });
    updateList();
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (item, amount) values (?, ?);', [item, amount]);
    }, null, updateList
    )
    setAmount('');
    setItem('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setItemList(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )
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

  const renderitem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.item}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <FontAwesome5 color="red" name="trash" size={24} onPress={() => deleteItem(item.id)}/>
      <ListItem.Chevron />
    </ListItem>
  )

  return (
    <View>
      <Header
        centerComponent={{ text: 'SHOPPINGLIST', style: { color: '#fff' } }}
      />

      <View>
        <Input
          placeholder='Anna tuotteen nimi'
          label='TUOTE'
          onChangeText={(item) => setItem(item)}
          value={item} 
        />

        <Input
          placeholder='Anna tuotteen määrä'
          label='MÄÄRÄ'
          onChangeText={(amount) => setAmount(amount)}
          value={amount} 
        />

        <Button raised icon={{name:'save'}} onPress={saveItem} title="Tallenna" />

        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem = {renderitem}
          data={itemList}
          ItemSeparatorComponent={listSeparator}
        />

        

      </View>
    </View>
  );
}
