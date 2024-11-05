import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  AddTransaction: { transactionId?: string };
  TransactionDetail: { transactionId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'BrokeBuddy' }}
        />
        <Stack.Screen 
          name="AddTransaction" 
          component={AddTransactionScreen}
          options={{ title: 'Add Transaction' }}
        />
        <Stack.Screen 
          name="TransactionDetail" 
          component={TransactionDetailScreen}
          options={{ title: 'Transaction Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;