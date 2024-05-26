// likedSongsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const LikedSongsContext = createContext();

// Export the context
export { LikedSongsContext };

// Custom hook to use the context
export const useLikedSongs = () => useContext(LikedSongsContext);

// Provider component
export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const storedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
    setLikedSongs(storedElements);
    
    const handleStorageChange = () => {
      const updatedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
      setLikedSongs(updatedElements);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
      {children}
    </LikedSongsContext.Provider>
  );
};
