import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, TextInput, Button, Text } from 'react-native';

export default function App() {

  const [markerLatitude, setMarkerLatitude] = useState(60.201373);
  const [markerLongitude, setMarkerLongitude] = useState(24.934041);
  const [regionLat, setRegionLat] = useState(60.201373);
  const [regionLng, setRegionLng] = useState(24.934041);
  const [inputText, setInputText] = useState('')
  const [values, setValues] = useState();

  const fetchData = async () => {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBQMrsW3lbs8p_-F0MhpiOZH6mbkQtdswQ&query=restaurants-in-' + inputText;

    try {
      const response = await fetch(url);
      var data = await response.json();
      setValues(fetchedData.results);

    } catch (error) {
      console.log('error', error);
    }
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={{
          latitude: regionLat,
          longitude: regionLng,
          latitudeDelta: 3.0,
          longitudeDelta: 3.0,
        }}
      >

        {
          values.map(marker =>(
            <Marker 
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng
            }}
            title={marker.name}
            description={marker.formatted_address}
            />
          ))
        }
      </MapView>
      <TextInput textAlign={'center'} style={styles.input} keyboardType={'default'} onChangeText={text => setInputText(text)} value={inputText} />
      <Button onPress={fetchData} title='Show' />
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
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 1,
  },
});
