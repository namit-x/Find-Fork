import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchName: string;
  setSearchName: (name: string) => void;
}

// Create context with default values
const SearchContext = createContext<SearchContextType>({
  searchName: '',
  setSearchName: () => { },
});

// Custom hook to use the context
export const useSearch = () => useContext(SearchContext);

// Provider component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchName, setSearchName] = useState('');

  const value = {
    searchName,
    setSearchName,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 