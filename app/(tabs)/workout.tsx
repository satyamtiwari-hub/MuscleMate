import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/services/supabase';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

interface Routine {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  user_id: string;
  exercises_count?: number;
}

interface WorkoutHistory {
  id: string;
  routine_name: string;
  date: string;
  duration: string;
  exercises_completed: number;
}

export default function WorkoutScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchRoutines(),
        fetchRecentWorkouts()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutines = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error && error.code !== '42P01') {
        console.error('Error fetching routines:', error);
      } else {
        setRoutines(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setRoutines([]);
    }
  };

  const fetchRecentWorkouts = async () => {
    // Mock data for now - replace with actual Supabase query
    const mockWorkouts: WorkoutHistory[] = [
      {
        id: '1',
        routine_name: 'Push Day',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        duration: '45 min',
        exercises_completed: 6
      },
      {
        id: '2',
        routine_name: 'Pull Day',
        date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
        duration: '52 min',
        exercises_completed: 5
      }
    ];
    setRecentWorkouts(mockWorkouts);
  };

  const handleQuickStart = () => {
    router.push('/quick-start-workout');
  };

  const handleNewRoutine = () => {
    router.push('/create-routine');
  };

  const handleStartWorkout = (routine: Routine) => {
    router.push(`/start-workout/${routine.id}`);
  };

  const handleViewAllRoutines = () => {
    router.push('/all-routines');
  };

  const handleWorkoutHistory = () => {
    router.push('/workout-history');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text category="h1" style={styles.title}>Workout</Text>
          <TouchableOpacity onPress={handleWorkoutHistory}>
            <IconSymbol name="clock" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Quick Start Section */}
          <Card style={styles.quickStartCard}>
            <Text category="h6" style={styles.sectionTitle}>Ready to train?</Text>
            <Text style={styles.sectionSubtitle}>Start a workout or create a new routine</Text>
            
            <View style={styles.quickActionButtons}>
              <TouchableOpacity style={styles.quickStartButton} onPress={handleQuickStart}>
                <View style={styles.quickStartIconContainer}>
                  <IconSymbol name="play" size={24} color="white" />
                </View>
                <Text style={styles.quickStartText}>Start Workout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.newRoutineButton} onPress={handleNewRoutine}>
                <View style={styles.newRoutineIconContainer}>
                  <IconSymbol name="plus" size={24} color="#3366FF" />
                </View>
                <Text style={styles.newRoutineText}>New Routine</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* My Routines */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text category="h6" style={styles.sectionTitle}>My Routines</Text>
              {routines.length > 0 && (
                <TouchableOpacity onPress={handleViewAllRoutines}>
                  <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
              )}
            </View>

            {routines.length === 0 ? (
              <Card style={styles.emptyRoutinesCard}>
                <View style={styles.emptyState}>
                  <IconSymbol name="dumbbell" size={48} color="#999" />
                  <Text style={styles.emptyTitle}>No routines yet</Text>
                  <Text style={styles.emptySubtitle}>
                    Create your first workout routine to get started
                  </Text>
                  <Button 
                    style={styles.createFirstButton}
                    onPress={handleNewRoutine}
                  >
                    Create First Routine
                  </Button>
                </View>
              </Card>
            ) : (
              <View style={styles.routinesGrid}>
                {routines.map((routine) => (
                  <TouchableOpacity
                    key={routine.id}
                    style={styles.routineCard}
                    onPress={() => handleStartWorkout(routine)}
                  >
                    <Card style={styles.routineCardInner}>
                      <View style={styles.routineHeader}>
                        <IconSymbol name="dumbbell" size={20} color="#3366FF" />
                        <Text style={styles.routineExerciseCount}>
                          {routine.exercises_count || 0} exercises
                        </Text>
                      </View>
                      <Text category="s1" style={styles.routineName}>
                        {routine.name}
                      </Text>
                      {routine.description && (
                        <Text style={styles.routineDescription} numberOfLines={2}>
                          {routine.description}
                        </Text>
                      )}
                      <View style={styles.routineFooter}>
                        <Text style={styles.routineDate}>
                          {new Date(routine.created_at).toLocaleDateString()}
                        </Text>
                        <TouchableOpacity style={styles.startButton}>
                          <Text style={styles.startButtonText}>Start</Text>
                        </TouchableOpacity>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quickStartCard: {
    marginTop: 10,
    marginBottom: 16,
    padding: 0,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: '#666',
    marginBottom: 12,
  },
  quickActionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  quickStartButton: {
    flex: 1,
    backgroundColor: '#3366FF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  quickStartIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickStartText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  newRoutineButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  newRoutineIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newRoutineText: {
    color: '#3366FF',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#3366FF',
    fontWeight: '500',
  },
  workoutCard: {
    marginBottom: 12,
    padding: 16,
  },
  workoutCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutDetails: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  workoutDate: {
    color: '#999',
    fontSize: 12,
  },
  repeatButton: {
    padding: 8,
  },
  emptyRoutinesCard: {
    padding: 32,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  createFirstButton: {
    marginTop: 8,
  },
  routinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  routineCard: {
    width: (width - 44) / 2,
  },
  routineCardInner: {
    padding: 16,
    height: 140,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routineExerciseCount: {
    fontSize: 12,
    color: '#666',
  },
  routineName: {
    fontWeight: '600',
    marginBottom: 8,
  },
  routineDescription: {
    color: '#666',
    fontSize: 12,
    flex: 1,
  },
  routineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  routineDate: {
    color: '#999',
    fontSize: 10,
  },
  startButton: {
    backgroundColor: '#3366FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsCard: {
    marginBottom: 24,
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3366FF',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});