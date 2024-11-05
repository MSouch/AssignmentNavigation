import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TransactionEntry, TransactionType_bgColor } from '../utils/utility';

interface TransactionCardProps {
  transaction: TransactionEntry;
  onPress: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.card, { backgroundColor: TransactionType_bgColor[transaction.type] }]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {transaction.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: 'green',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TransactionCard;