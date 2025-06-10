import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
}

export default function CreateRoutineScreen() {
  const [routineTitle, setRoutineTitle] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  const handleCancel = () => {
    // Show confirmation if user has entered data
    if (routineTitle.trim() || exercises.length > 0) {
      Alert.alert(
        'Discard Changes?',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => router.back()
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const handleSave = () => {
    if (!routineTitle.trim()) {
      Alert.alert('Error', 'Please enter a routine title');
      return;
    }
    
    // TODO: Save routine to database
    console.log('Saving routine:', { routineTitle, exercises });
    Alert.alert('Success', 'Routine created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleAddExercise = () => {
    router.push('/select-exercise');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Cancel Button */}
          <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text category="h6" style={styles.headerTitle}>Create Routine</Text>

          {/* Save Button */}
          <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Routine Title Input */}
          <Input
            placeholder="Routine Title"
            value={routineTitle}
            onChangeText={setRoutineTitle}
            style={styles.titleInput}
            size="large"
            textStyle={styles.titleInputText}
          />

          {/* Exercise Display Area */}
          <View style={styles.exerciseDisplayContainer}>
            {exercises.length === 0 ? (
              // Empty state with dumbbell icon and placeholder text
              <View style={styles.emptyExerciseState}>
                <IconSymbol 
                  name="dumbbell" 
                  size={28} 
                  color={iconColor}
                  style={styles.dumbbellIcon}
                />
                <Text style={styles.placeholderText}>
                  Get started by adding the exercise
                </Text>
              </View>
            ) : (
              // Show added exercises
              <View style={styles.exercisesList}>
                {exercises.map((exercise, index) => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      {exercise.sets && exercise.reps && (
                        <Text style={styles.exerciseDetails}>
                          {exercise.sets} sets × {exercise.reps} reps
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => setExercises(exercises.filter(e => e.id !== exercise.id))}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Add Exercise Button */}
          <Button
            style={styles.addExerciseButton}
            onPress={handleAddExercise}
            appearance="outline"
          >
            Add Exercise
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  headerButton: {
    minWidth: 60,
    paddingVertical: 8,
  },
  cancelText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '500',
  },
  saveText: {
    color: '#3366FF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  headerTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleInput: {
    marginBottom: 24,
  },
  titleInputText: {
    fontSize: 18,
    fontWeight: '500',
  },
  exerciseDisplayContainer: {
    marginBottom: 24,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 8,
    padding: 16,
  },
  emptyExerciseState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dumbbellIcon: {
    marginBottom: 8,
  },
  placeholderText: {
    color: '#8F9BB3',
    fontSize: 16,
    textAlign: 'center',
  },
  exercisesList: {
    flex: 1,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addExerciseButton: {
    marginTop: 16,
  },
});