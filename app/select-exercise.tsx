import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
    EXERCISES_DB,
    EXERCISE_CATEGORIES,
    Exercise,
    getPopularExercises,
    getRecentExercises,
    searchExercises
} from '@/services/exerciseDatabase';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

export default function ExerciseSelectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'recent'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(EXERCISES_DB);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  // Mock recent exercises (in real app, get from AsyncStorage or state)
  const [recentExerciseIds] = useState(['chest_001', 'back_002', 'legs_001']);

  useEffect(() => {
    filterExercises();
  }, [searchQuery, selectedCategory, activeTab]);

  const filterExercises = () => {
    let exercises: Exercise[] = [];

    // Start with appropriate base set
    switch (activeTab) {
      case 'popular':
        exercises = getPopularExercises();
        break;
      case 'recent':
        exercises = getRecentExercises(recentExerciseIds);
        break;
      default:
        exercises = EXERCISES_DB;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      exercises = searchExercises(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      exercises = exercises.filter(ex => ex.category === selectedCategory);
    }

    setFilteredExercises(exercises);
  };

  const handleBack = () => {
    // Pass selected exercises back to create routine screen
    if (selectedExercises.length > 0) {
      // In a real app, you'd use a state management solution or callback
      router.back();
      // TODO: Implement passing data back to create routine
      console.log('Selected exercises to pass back:', selectedExercises);
    } else {
      router.back();
    }
  };

  const toggleExerciseSelection = (exercise: Exercise) => {
    const isSelected = selectedExercises.find(ex => ex.id === exercise.id);
    
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter(ex => ex.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleAddSelected = () => {
    if (selectedExercises.length > 0) {
      // Pass selected exercises back to create routine screen
      router.back();
      console.log('Adding selected exercises:', selectedExercises);
      // TODO: Implement actual data passing mechanism
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    const isSelected = selectedExercises.find(ex => ex.id === item.id);
    
    return (
      <TouchableOpacity
        style={[styles.exerciseItem, isSelected && styles.exerciseItemSelected]}
        onPress={() => toggleExerciseSelection(item)}
      >
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          
          {/* Description */}
          {item.description && (
            <Text style={styles.exerciseDescription}>{item.description}</Text>
          )}
          
          {/* Tags */}
          <View style={styles.exerciseMeta}>
            <View style={styles.exerciseTag}>
              <Text style={styles.exerciseTagText}>{item.category}</Text>
            </View>
            <View style={styles.exerciseTag}>
              <Text style={styles.exerciseTagText}>{item.equipment}</Text>
            </View>
            <View style={[styles.exerciseTag, styles.difficultyTag, 
              { backgroundColor: item.difficulty === 'Beginner' ? '#e8f5e8' : 
                                 item.difficulty === 'Intermediate' ? '#fff4e6' : '#ffe6e6' }]}>
              <Text style={[styles.exerciseTagText, 
                { color: item.difficulty === 'Beginner' ? '#2d5a2d' : 
                         item.difficulty === 'Intermediate' ? '#8b4513' : '#8b0000' }]}>
                {item.difficulty}
              </Text>
            </View>
          </View>
          
          {/* Target Muscles */}
          <Text style={styles.exerciseBodyParts}>
            {item.primaryMuscles.join(', ')}
          </Text>
        </View>
        
        <View style={styles.exerciseActions}>
          {isSelected ? (
            <View style={styles.selectedIndicator}>
              <IconSymbol name="checkmark" size={20} color="white" />
            </View>
          ) : (
            <View style={styles.unselectedIndicator} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabButton = (tab: 'all' | 'popular' | 'recent', label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
      <TouchableOpacity
        style={[styles.filterChip, selectedCategory === 'All' && styles.filterChipActive]}
        onPress={() => setSelectedCategory('All')}
      >
        <Text style={[styles.filterChipText, selectedCategory === 'All' && styles.filterChipTextActive]}>
          All
        </Text>
      </TouchableOpacity>
      
      {EXERCISE_CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.filterChip, selectedCategory === category && styles.filterChipActive]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[styles.filterChipText, selectedCategory === category && styles.filterChipTextActive]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text category="h6" style={styles.headerTitle}>Select Exercises</Text>
          <View style={styles.headerRight}>
            {selectedExercises.length > 0 && (
              <TouchableOpacity onPress={handleAddSelected}>
                <Text style={styles.addText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessoryLeft={() => <IconSymbol name="magnifyingglass" size={20} color="#666" />}
            style={styles.searchInput}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {renderTabButton('all', 'All')}
          {renderTabButton('popular', 'Popular')}
          {renderTabButton('recent', 'Recent')}
        </View>

        {/* Category Filter */}
        <View style={styles.filtersContainer}>
          {renderCategoryFilter()}
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
          </Text>
          {selectedExercises.length > 0 && (
            <Text style={styles.selectedCount}>
              {selectedExercises.length} selected
            </Text>
          )}
        </View>

        {/* Exercise List */}
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          style={styles.exerciseList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exerciseListContent}
        />

        {/* Add Button (Fixed at bottom) */}
        {selectedExercises.length > 0 && (
          <View style={styles.addButtonContainer}>
            <Button
              style={styles.addButton}
              onPress={handleAddSelected}
            >
              Add {selectedExercises.length} Exercise{selectedExercises.length !== 1 ? 's' : ''}
            </Button>
          </View>
        )}
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
  backButton: {
    padding: 8,
    width: 60,
  },
  headerTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end',
  },
  addText: {
    color: '#3366FF',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    marginBottom: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  tabButtonActive: {
    backgroundColor: '#3366FF',
  },
  tabButtonText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  tabButtonTextActive: {
    color: 'white',
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  filterChipActive: {
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
  },
  filterChipText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: 'white',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCount: {
    color: '#666',
    fontSize: 14,
  },
  selectedCount: {
    color: '#3366FF',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for floating button
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseItemSelected: {
    backgroundColor: '#e8f2ff',
    borderColor: '#3366FF',
    borderWidth: 2,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  exerciseTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  exerciseTagText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  difficultyTag: {
    // Background colors set dynamically
  },
  exerciseBodyParts: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  exerciseActions: {
    marginLeft: 16,
  },
  selectedIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E4E9F2',
    backgroundColor: 'transparent',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E4E9F2',
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
});