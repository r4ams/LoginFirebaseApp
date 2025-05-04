// Importa el componente Toast desde la librería react-native-toast-message
import Toast from 'react-native-toast-message';

// Define y exporta una función para mostrar un mensaje emergente (toast)
export const showToast = (type, text1, text2 = '') => {
  // Llama al método show del Toast con los parámetros especificados
  Toast.show({
    type,           // Tipo del mensaje (success, error, info, etc.)
    text1,          // Título o mensaje principal del toast
    text2,          // Mensaje secundario (opcional)
    position: 'bottom', // Posición del toast en la pantalla
  });
};
