import { useState, useEffect } from 'react';

export interface CurrencyData {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

const CURRENCIES: Record<string, Omit<CurrencyData, 'rate'>> = {
  USD: { code: 'USD', symbol: '$', name: 'Dólares' },
  PEN: { code: 'PEN', symbol: 'S/', name: 'Soles' }
};

// Event listener para cambios de moneda
const CURRENCY_CHANGE_EVENT = 'currency-changed';

// Función para disparar evento de cambio
const dispatchCurrencyChange = (currency: string) => {
  window.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: currency }));
};

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useState<string>(() => {
    // Cargar desde localStorage al inicializar
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferred-currency') || 'USD';
    }
    return 'USD';
  });
  
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    USD: 0.27, // 1 PEN = ~0.27 USD (aproximado)
    PEN: 1
  });
  const [loading, setLoading] = useState(false);

  // Listener para cambios de moneda desde otros componentes
  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrentCurrency(event.detail);
    };

    window.addEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange as EventListener);
    
    return () => {
      window.removeEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange as EventListener);
    };
  }, []);

  // Función para obtener tasas de cambio actualizadas
  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/PEN');
      const data = await response.json();
      
      setExchangeRates({
        USD: data.rates.USD || 0.27,
        PEN: 1
      });
    } catch (error) {
      console.warn('Error fetching exchange rates, using fallback rates:', error);
      // Mantener tasas por defecto si falla la API
      setExchangeRates({
        USD: 0.27,
        PEN: 1
      });
    } finally {
      setLoading(false);
    }
  };

  // Obtener tasas al montar el componente
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Función para convertir precio
  const convertPrice = (priceInPEN: number): number => {
    if (currentCurrency === 'PEN') {
      return priceInPEN; // Si es PEN, devolver el precio original
    }
    
    if (currentCurrency === 'USD') {
      const rate = exchangeRates.USD || 0.27;
      return Math.round(priceInPEN * rate); // Convertir PEN a USD
    }
    
    return priceInPEN; // Fallback
  };

  // Función para formatear precio con símbolo de moneda
  const formatPrice = (priceInPEN: number): string => {
    const convertedPrice = convertPrice(priceInPEN);
    
    if (currentCurrency === 'USD') {
      return `$${convertedPrice}`;
    }
    
    if (currentCurrency === 'PEN') {
      return `S/${convertedPrice}`;
    }
    
    return `${convertedPrice}`; // Fallback
  };

  // Cambiar moneda
  const changeCurrency = (newCurrency: string) => {
    if (CURRENCIES[newCurrency]) {
      setCurrentCurrency(newCurrency);
      // Guardar preferencia en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-currency', newCurrency);
      }
      // Disparar evento para notificar a otros componentes
      dispatchCurrencyChange(newCurrency);
    }
  };

  // Cargar preferencia guardada al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('preferred-currency');
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrentCurrency(savedCurrency);
      }
    }
  }, []);

  return {
    currentCurrency,
    currencies: Object.values(CURRENCIES).map(curr => ({
      ...curr,
      rate: exchangeRates[curr.code] || 1
    })),
    convertPrice,
    formatPrice,
    changeCurrency,
    loading,
    refreshRates: fetchExchangeRates
  };
}