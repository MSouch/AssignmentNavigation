// src/screens/TransactionDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { TransactionEntry, getTransactionByID, TransactionType } from '../utils/utility';

type TransactionDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionDetail'
>;

type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetail'
>;

interface Props {
  navigation: TransactionDetailScreenNavigationProp;
  route: TransactionDetailScreenRouteProp;
}

const TransactionDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const [transaction, setTransaction] = useState<TransactionEntry | null>(null);

  useEffect(() => {
    const foundTransaction = getTransactionByID(route.params.transactionId);
    setTransaction(foundTransaction);

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('AddTransaction', { 
            transactionId: route.params.transactionId 
          })}
        >
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Transaction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
        <Text style={styles.type}>{TransactionType[transaction.type]}</Text>
        <Text style={styles.description}>{transaction.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  type: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  editButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
  },
});

export default TransactionDetailScreen;