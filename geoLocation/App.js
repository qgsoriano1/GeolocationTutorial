import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    getLocationAsync();
  }, []);  

  const getLocationAsync = async () => {
    try {
      console.log('Requesting location permissions');
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
  
      console.log('Getting current location');
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };  

  const sendLocation = () => {
    try {
      if (location) {
        const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome for Testing Geolocation App</Text>
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Get Location" onPress={getLocationAsync} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;