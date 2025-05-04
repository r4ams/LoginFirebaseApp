// Importa la función para inicializar la app de Firebase
import { initializeApp } from 'firebase/app';

// Importa el módulo de autenticación de Firebase
import { getAuth } from 'firebase/auth';

// Objeto de configuración con las credenciales del proyecto de Firebase
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
