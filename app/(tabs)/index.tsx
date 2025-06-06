import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [selectedOption, setSelectedOption] = useState('Following');

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left side - Simple dropdown alternative */}
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setSelectedOption(selectedOption === 'Following' ? 'Discover' : 'Following')}
        >
          <Text style={styles.dropdownText}>{selectedOption} ▼</Text>
        </TouchableOpacity>

        {/* Right side - Text icons for now */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <Layout style={styles.content}>
        <Text category="h1">MuscleMate 💪</Text>
        <Text style={styles.subtitle}>Current view: {selectedOption}</Text>
        <Button style={{ marginTop: 16 }} onPress={() => alert('Lets Go!')}>
          Start Workout
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // Simple top padding instead of SafeAreaView
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 120,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    opacity: 0.7,
  },
});