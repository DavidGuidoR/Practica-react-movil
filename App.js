import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContainerNegocio from './components/ContainerNegocio';
import IMCScreen from './components/IMCScreen';
import ContactScreen from './components/ContactScreen';
import AcelerometerScreen from './components/AcelerometerScreen';
import LocationScreen from './components/LocationScreen';
import Toast from 'react-native-toast-message';
import MapView from 'react-native-maps';

const Drawer = createDrawerNavigator();


function HomeScreen() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://10.31.9.35:3000/negocio/";
        const response = await fetch(url);
        const json = await response.json();
        setDatos(json);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {datos && datos.map((negocio, index) => (
        <ContainerNegocio
          key={index}
          photo={negocio.photo}
          business_name={negocio.business_name}
          description={negocio.description}
        />
      ))}
    </ScrollView>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="IMC" component={IMCScreen} />
        <Drawer.Screen name="Contacto" component={ContactScreen} />
        <Drawer.Screen name="Acelerómetro" component={AcelerometerScreen} />
        <Drawer.Screen name="Ubicación" component={LocationScreen} />
      </Drawer.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centrado vertical del contenedor principal
  },
  scrollView: {
    width: '100%',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 20,
    marginHorizontal: 10,
    borderBottom: 2,
    color: '#9D9EB0'
  },
});

