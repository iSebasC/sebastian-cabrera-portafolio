import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, Coins } from 'lucide-react';
import { useState } from 'react';
import { useCurrencyContext } from '../contexts/CurrencyContext';

export function CurrencySelector() {
  const { currentCurrency, changeCurrency, loading } = useCurrencyContext();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'USD', name: 'Dólares' },
    { code: 'PEN', name: 'Soles' }
  ];

  const getCurrentIcon = () => {
    switch (currentCurrency) {
      case 'USD':
        return <DollarSign className="w-4 h-4" />;
      case 'PEN':
        return <Coins className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-xl border border-border/50 hover:bg-accent transition-colors disabled:opacity-50"
      >
        {getCurrentIcon()}
        <span className="text-sm font-medium">{currentCurrency}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 min-w-[120px] bg-background border border-border rounded-xl shadow-lg z-50"
          >
            {currencies.map((currency) => (
              <motion.button
                key={currency.code}
                onClick={() => {
                  changeCurrency(currency.code);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(var(--accent), 0.5)' }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  currentCurrency === currency.code 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent/50'
                }`}
              >
                {currency.code === 'USD' ? (
                  <DollarSign className="w-4 h-4" />
                ) : (
                  <Coins className="w-4 h-4" />
                )}
                <div>
                  <div className="text-sm font-medium">{currency.code}</div>
                  <div className="text-xs text-muted-foreground">{currency.name}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}