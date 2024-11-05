import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { TransactionEntry, getInitialData } from '../utils/utility';
import TransactionCard from '../components/TransactionCard';
import EmptyView from '../components/EmptyView';
import FloatingActionButton from '../components/FloatingActionButton';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTransactions(getInitialData());
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: TransactionEntry }) => (
    <TransactionCard
      transaction={item}
      onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyView}
        contentContainerStyle={transactions.length === 0 ? styles.emptyList : undefined}
      />
      <FloatingActionButton 
        onPress={() => navigation.navigate({ name: 'AddTransaction', params: {} })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyList: {
    flex: 1,
  },
});

export default HomeScreen;