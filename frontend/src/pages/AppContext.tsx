// src/context/AppContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const AppContext = createContext<any>(null);

// El proveedor del contexto que envuelve a la aplicación
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <AppContext.Provider value={{ count, setCount }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAppContext = () => useContext(AppContext);
