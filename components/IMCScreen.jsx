import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const IMCScreen = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const calcularIMC = () => {
    if (!peso || !altura) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor ingrese peso y altura.'
      });
      return;
    }

    const alturaMetros = altura / 100;
    const imc = (peso / (alturaMetros * alturaMetros)).toFixed(2);
    Toast.show({
      type: 'success',
      text1: 'Su IMC es:',
      text2: `${imc}`
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso en kg"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={altura}
        onChangeText={setAltura}
        placeholder="Altura en cm"
        keyboardType="numeric"
      />
      <Button
        title="Calcular IMC"
        onPress={calcularIMC}
      />
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
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default IMCScreen;

