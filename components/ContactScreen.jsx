import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Correo: GuidoD890@gmail.com</Text>
      <Text style={styles.info}>Teléfono: +524433250005</Text>
      <Text style={styles.info}>LinkedIn: www.linkedin.com/in/david-guido-rodriguez-a1a9152b2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ContactScreen;