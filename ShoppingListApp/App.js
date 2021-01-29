import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [listItem, setListItem] = useState('');
  const [data, setData] = useState([]);

  const addItem = () =>{
    const text = (listItem);
    setData([...data, {key:text }]);
    setListItem('');
}

  const clearItems = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputStyle}>
        <TextInput style={styles.inputField} onChangeText={text => setListItem(text)} value={listItem} />
      </View>
      <View style={styles.buttons}>
        <Button title='Add item' onPress={addItem} /> 
        <Button title='Clear' onPress={clearItems} /> 
      </View>
      <Text style={{color:'blue', fontSize:20, marginTop: 20, marginBottom: 20}}>Shopping List</Text>
      <FlatList data={data} renderItem={({item}) => <Text> {item.key}</ Text>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row'
  },
  textInputStyle:{
    borderWidth:2,
    borderStyle: 'solid',
    marginTop:3
  }
});
