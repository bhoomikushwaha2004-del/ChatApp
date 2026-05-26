import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { AuthProvider } from './src/services/AuthProvider';
import ThemeProvider from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
