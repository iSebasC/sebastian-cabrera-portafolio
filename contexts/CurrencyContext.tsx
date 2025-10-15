import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface CurrencyContextType {
  currentCurrency: string;
  formatPrice: (priceInPEN: number) => string;
  changeCurrency: (currency: string) => void;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferred-currency') || 'USD';
    }
    return 'USD';
  });
  
  const [exchangeRates] = useState<Record<string, number>>({
    USD: 0.27, // 1 PEN = ~0.27 USD
    PEN: 1
  });
  const [loading] = useState(false);

  // Función para convertir precio
  const convertPrice = (priceInPEN: number): number => {
    if (currentCurrency === 'PEN') {
      return priceInPEN;
    }
    
    if (currentCurrency === 'USD') {
      const rate = exchangeRates.USD || 0.27;
      return Math.round(priceInPEN * rate);
    }
    
    return priceInPEN;
  };

  // Función para formatear precio
  const formatPrice = (priceInPEN: number): string => {
    const convertedPrice = convertPrice(priceInPEN);
    
    if (currentCurrency === 'USD') {
      return `$${convertedPrice}`;
    }
    
    if (currentCurrency === 'PEN') {
      return `S/${convertedPrice}`;
    }
    
    return `${convertedPrice}`;
  };

  // Cambiar moneda
  const changeCurrency = (newCurrency: string) => {
    if (['USD', 'PEN'].includes(newCurrency)) {
      setCurrentCurrency(newCurrency);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-currency', newCurrency);
      }
    }
  };

  // Cargar preferencia guardada
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('preferred-currency');
      if (savedCurrency && ['USD', 'PEN'].includes(savedCurrency)) {
        setCurrentCurrency(savedCurrency);
      }
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      formatPrice,
      changeCurrency,
      loading
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
}