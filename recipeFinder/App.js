import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [value, setValue] = useState('');
  const [recipes, setRecipes] = useState([]);


  const getRecipes = async () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + value;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    }catch (error){
      console.log('error', error);
    }
    
  }
  

  return (
    <View style={styles.container}>
      <FlatList 
        renderItem={({item}) => ( 
        <View>
          <Text>{item.title}</Text>
          <Image source={{uri: item.thumbnail}} style={styles.image} />
        </View>
          )}
        data={recipes}
      />
      <TextInput style={{fontSize: 25, width: 200}} value={value} placeholder="Ingredient" onChangeText={(value) => setValue(value)} />
      <Button title="Find" onPress={getRecipes} />
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
});