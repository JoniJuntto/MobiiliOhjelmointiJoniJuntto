import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [value, setValue] = useState('');
  const [recipes, setRecipes] = useState([]);


  const getRecipes = async () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + value;
    
    try {
      const response = await fetch(url);
      var data = await response.json();
      console.log(data.results)
      setRecipes(data.results);
    }catch (error){
      console.log('error', error);
    }
    
  }

  const listSeparator = () =>{
    return (
      <View style={{height:1, width:'100%', backgrounColor:'gray', marginLeft: '10%'}}/>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.lista}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) =>{
          return(
            <View>
              <Text>{item.title}</Text>
              <Image style={{width:60,height:40 }} source={{uri:`${item.thumbnail}`,}}/>
            </View>
          );    
        }}
        ItemSeparatorComponent={listSeparator}
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
 lista:{
  fontSize: 25,
  
 },
});