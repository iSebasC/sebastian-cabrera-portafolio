// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  serviceId: 'service_portfolio', // Se configurará en EmailJS
  templateId: 'template_contact', // Se configurará en EmailJS
  publicKey: 'TU_PUBLIC_KEY', // Se configurará en EmailJS
};

// Función para detectar si estamos en producción
export const isProduction = () => {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1' && 
         window.location.hostname !== '';
};