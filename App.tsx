import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StackNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;