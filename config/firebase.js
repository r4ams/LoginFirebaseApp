// Importa la función para inicializar la app de Firebase
import { initializeApp } from 'firebase/app';

// Importa el módulo de autenticación de Firebase
import { getAuth } from 'firebase/auth';

// Objeto de configuración con las credenciales del proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLgqILBP32-ntkSA-DHpw2kIk5VdYyD_I", // Clave de acceso a la API de Firebase
  authDomain: "udb-forodiscusion2dps941-ce857.firebaseapp.com", // Dominio de autenticación
  projectId: "udb-forodiscusion2dps941-ce857", // ID del proyecto en Firebase
  storageBucket: "udb-forodiscusion2dps941-ce857.appspot.com", // Almacenamiento de archivos en la nube
  messagingSenderId: "226949722933", // ID del emisor para servicios de mensajería
  appId: "1:226949722933:web:c8c83c4790c46e0c4b927c", // Identificador único de la aplicación
  measurementId: "G-LP0CBGXRWZ" // ID para medir analíticas (opcional)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
