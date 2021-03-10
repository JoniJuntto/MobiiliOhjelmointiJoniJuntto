import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [value, setValue] = useState('')

  const sayThis = () => {
    Speech.speak(value);
  }

  return (
    <View style={styles.container}>
      <TextInput textAlign={'center'} style={{height: 30, width: 290, borderColor: 'black', borderWidth: 1,marginBottom: 10 }} onChangeText={text => setValue(text)} value={value}/>
      <Button title='Press to hear text' onPress={sayThis}/>
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
