import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Speech from 'expo-speech';

const AcelerometerScreen = () => {
    const [acceleration, setAcceleration] = useState({x: 0, y: 0, z: 0});
    const [lastAcceleration, setLastAcceleration] = useState({x: 0, y: 0, z: 0});

    useEffect(() => {
        const subscription = Accelerometer.addListener(currentAcceleration => {
            setAcceleration(currentAcceleration);
            validarMovimientoBrusco(currentAcceleration, lastAcceleration);
            setLastAcceleration(currentAcceleration);
        });

        Accelerometer.setUpdateInterval(500);

        return () => subscription.remove();
    }, [lastAcceleration]);

    // Función para detectar movimiento brusco
    const validarMovimientoBrusco = (current, last) => {
        const diff = {
            x: Math.abs(current.x - last.x),
            y: Math.abs(current.y - last.y),
            z: Math.abs(current.z - last.z)
        };

        // Umbral para determinar qué consideramos "brusco"
        const threshold = 1.5; // Ajusta este valor según la sensibilidad deseada

        if (diff.x > threshold || diff.y > threshold || diff.z > threshold) {
            Speech.speak("Se ha detectado un movimiento brusco");
        }
    };

    return (
        <View style={styles.container}>
            <Text>x: {acceleration.x}</Text>
            <Text>y: {acceleration.y}</Text>
            <Text>z: {acceleration.z}</Text>
            <Button
                title="Dictar valores del acelerómetro"
                onPress={() => Speech.speak(`X: ${acceleration.x.toFixed(3)}, Y: ${acceleration.y.toFixed(3)}, Z: ${acceleration.z.toFixed(3)}`)}
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
    info: {
        fontSize: 18,
        marginVertical: 10,
    },
});

export default AcelerometerScreen;
