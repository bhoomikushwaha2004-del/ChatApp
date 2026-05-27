import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { DarkTheme, LightTheme } from '../theme/colors';

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [darkMode,setDarkMode] = useState(false);

    const theme = darkMode ? DarkTheme : LightTheme;

    const toggleTheme = ()=> {
        setDarkMode(prev => !prev);
    }

  return (
    <ThemeContext.Provider
    value={{
        darkMode,
        theme,
        toggleTheme
    }}
    >
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider