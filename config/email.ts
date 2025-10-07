// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  serviceId: 'service_portfolio', // Se configurará en EmailJS
  templateId: 'template_contact', // Se configurará en EmailJS
  publicKey: 'TU_PUBLIC_KEY', // Se configurará en EmailJS
};

// Función mejorada para detectar si estamos en producción
export const isProduction = () => {
  // Detectar Netlify específicamente
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Dominios de producción
    const productionDomains = [
      'sebastiancabreraalcala.com',
      'sebastiancabreraalcala.netlify.app'
    ];
    
    // Verificar si estamos en un dominio de producción o en Netlify
    return productionDomains.some(domain => hostname.includes(domain)) ||
           hostname.includes('.netlify.app') ||
           (hostname !== 'localhost' && 
            hostname !== '127.0.0.1' && 
            hostname !== '' && 
            !hostname.includes('localhost'));
  }
  
  return false;
};