import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { 
  TransactionEntry, 
  TransactionType, 
  defaultTransactionEntry,
  getNewID,
  addEditTransaction,
  getTransactionByID 
} from '../utils/utility';

type AddTransactionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddTransaction'
>;

type AddTransactionScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddTransaction'
>;

interface Props {
  navigation: AddTransactionScreenNavigationProp;
  route: AddTransactionScreenRouteProp;
}

const AddTransactionScreen: React.FC<Props> = ({ navigation, route }) => {
  const [transaction, setTransaction] = useState<TransactionEntry>(defaultTransactionEntry);

  const setTransactionField = <K extends keyof TransactionEntry>(
    field: K,
    value: TransactionEntry[K]
  ) => {
    setTransaction(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!transaction.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!transaction.desc.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!transaction.amount || transaction.amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const finalTransaction = {
      ...transaction,
      id: route.params?.transactionId || getNewID()
    };

    addEditTransaction(finalTransaction);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={transaction.title}
            onChangeText={(text) => setTransactionField('title', text)}
            placeholder="Enter title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={transaction.desc}
            onChangeText={(text) => setTransactionField('desc', text)}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={transaction.amount.toString()}
            onChangeText={(text) => setTransactionField('amount', parseFloat(text) || 0)}
            keyboardType="decimal-pad"
            placeholder="Enter amount"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Transaction Type</Text>
          <View style={styles.typeContainer}>
            {Object.values(TransactionType)
              .filter(value => typeof value === 'number')
              .map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    transaction.type === type && styles.selectedType
                  ]}
                  onPress={() => setTransactionField('type', type as TransactionType)}
                >
                  <Text style={[
                    styles.typeText,
                    transaction.type === type && styles.selectedTypeText
                  ]}>
                    {TransactionType[type]}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {route.params?.transactionId ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  selectedTypeText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTransactionScreen;