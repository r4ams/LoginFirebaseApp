// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { showToast } from '../utils/toast';


export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      showToast('error',"Error al cerrar sesión", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Has iniciado sesión exitosamente!</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  }
});
