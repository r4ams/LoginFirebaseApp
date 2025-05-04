import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Importa la instancia de autenticación desde la configuración de Firebase
import { auth } from '../config/firebase';

// Importa funciones necesarias para autenticación por email y Google
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

// Hook de navegación para cambiar entre pantallas
import { useNavigation } from '@react-navigation/native';

// Importa la función personalizada para mostrar toasts
import { showToast } from '../utils/toast';

// Importa herramientas de autenticación de Google con Expo
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// Completa cualquier sesión pendiente de autenticación
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  console.log("🟢 Renderizando LoginScreen");

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa la petición de login con Google usando ID Token
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '...',   // Cliente para aplicaciones de Expo
    webClientId: '...',    // Cliente web para Google Auth
    scopes: ['profile', 'email'], // Permisos solicitados
    redirectUri: makeRedirectUri({ useProxy: true }), // URI de redirección con proxy de Expo
  });

  // Maneja la respuesta de autenticación de Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params; // Extrae el token
      console.log("ID Token:", id_token);
      console.log("Response:", response);

      // Crea credenciales de Firebase usando el token de Google
      const credential = GoogleAuthProvider.credential(id_token);

      // Inicia sesión en Firebase con las credenciales de Google
      signInWithCredential(auth, credential)  
        .then(() => {
          showToast('success', 'Inicio de sesión exitoso');

          // Espera 1.5 segundos antes de redirigir al home
          setTimeout(() => {
            navigation.replace("Home");
          }, 1500);
        })
        .catch(error => showToast('error', 'Error al iniciar sesión', error.message));
    }
  }, [response]);

  // Función para login con email y contraseña
  const handleEmailLogin = async () => {
    if (!email || !password) {
      showToast('info', 'Faltan datos', 'Por favor ingresa email y contraseña');
      return;
    }

    setLoading(true);
    try {
      // Intenta iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);
      showToast('success', 'Inicio de sesión exitoso');
      navigation.replace("Home");
    } catch (error) {
      showToast('error', 'Error al iniciar sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Estructura visual de la pantalla de login
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo para correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo para contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {/* Botón para login con email */}
      <Button title="Iniciar Sesión con Email" onPress={handleEmailLogin} disabled={loading} />

      <View style={{ marginVertical: 10 }} />

      {/* Botón para login con Google */}
      <Button title="Iniciar Sesión con Google" onPress={() => promptAsync()} disabled={!request || loading} />
    </View>
  );
}

// Estilos para la pantalla de login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
