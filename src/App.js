import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You clicked the button!');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello, React Native!</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
