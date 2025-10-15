# Sistema de Conversión de Monedas

## Funcionalidad
- **Automático para modo Freelance**: Los precios se muestran en USD para clientes internacionales
- **Conversión en tiempo real**: Usa API de exchangerate-api.com para tasas actualizadas
- **Fallback robusto**: Si falla la API, usa tasas de respaldo (1 PEN = ~0.27 USD)
- **Persistencia**: Guarda la preferencia del usuario en localStorage

## Archivos Implementados

### `/hooks/useCurrency.ts`
- Hook principal para manejo de monedas
- Obtiene tasas de cambio en tiempo real
- Funciones de conversión y formateo

### `/components/CurrencySelector.tsx`
- Selector visual para cambiar entre USD y PEN
- Animaciones con Framer Motion
- Iconos apropiados para cada moneda

### `/components/QuoteSection.tsx` (Actualizado)
- Integra el sistema de monedas
- Todos los precios ahora usan `formatPrice()`
- Selector de moneda en la interfaz

## Uso
```tsx
const { formatPrice, currentCurrency, changeCurrency } = useCurrency();

// Convertir y formatear precio
const displayPrice = formatPrice(800); // "$216" (en USD) o "S/800" (en PEN)
```

## Configuración
- **Precios base**: Configurados en soles peruanos (PEN)
- **Monedas soportadas**: USD (Dólares), PEN (Soles)
- **API**: exchangerate-api.com (gratuita hasta 1,500 requests/mes)
- **Tasa de respaldo**: 1 PEN = 0.27 USD

## Comportamiento
- **Modo Freelance**: Muestra cotización con selector USD/PEN
- **Modo Dev**: No muestra cotización (como ya estaba implementado)
- **Auto-detección**: Preferencia guardada persiste entre sesiones