import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No transactions yet!</Text>
      <Text style={[styles.subText, styles.spacing]}>Add your first transaction using the + button below</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'gray',
  },
  spacing: {
    marginTop: 10, // Adjust the value as needed
  },
});

export default EmptyView;