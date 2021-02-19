import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, TextInput, Button, Text } from 'react-native';

export default function App() {

  const [markerLatitude, setMarkerLatitude] = useState(60.201373);
  const [markerLongitude, setMarkerLongitude] = useState(24.934041);
  const [regionLat, setRegionLat] = useState(60.201373);
  const [regionLng, setRegionLng] = useState(24.934041);
  const [inputText, setInputText] = useState('')

  const fetchCoordinates = async () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=Bby2hRhBeTr99AdtNoHwEwl54zAEepZA&location=' + inputText;

    try {
      const response = await fetch(url);
      var data = await response.json();
      return data;

    } catch (error) {
      console.log('error', error);
    }
  }

  const pressed = async () => {
    var fetchedData = await fetchCoordinates();
    const lat = fetchedData.results[0].locations[0].latLng.lat;
    const long = fetchedData.results[0].locations[0].latLng.lng;
    setMarkerLatitude(lat);
    setRegionLat(lat);
    setMarkerLongitude(long);
    setRegionLng(long);
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
        <Marker coordinate={{
          latitude: markerLatitude,
          longitude: markerLongitude
        }} title='A place' />
      </MapView>
      <TextInput textAlign={'center'} style={styles.input} keyboardType={'default'} onChangeText={text => setInputText(text)} value={inputText} />
      <Button onPress={pressed} title='Show' />
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
