import { supabase } from '@/services/supabase';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Routine {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  user_id: string;
}

export default function WorkoutScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if routines table exists, if not, just set empty array
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        // If table doesn't exist, just log and show empty state
        if (error.code === '42P01') {
          console.log('Routines table not created yet');
          setRoutines([]);
        } else {
          console.error('Error fetching routines:', error);
          setRoutines([]);
        }
      } else {
        setRoutines(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRoutine = () => {
    router.push('/create-routine');
  };

  const handleExplore = () => {
    // TODO: Navigate to explore routines screen
    console.log('Navigate to Explore Routines');
  };

  const handleRoutinePress = (routine: Routine) => {
    // TODO: Navigate to routine details
    console.log('Open routine:', routine.name);
  };

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text category="h1" style={styles.title}>Routines</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            style={[styles.button, styles.primaryButton]} 
            onPress={handleNewRoutine}
          >
            New Routine
          </Button>
          
          <Button 
            style={[styles.button, styles.secondaryButton]} 
            appearance="outline"
            onPress={handleExplore}
          >
            Explore
          </Button>
        </View>

        {/* My Routines Section */}
        {!loading && routines.length > 0 && (
          <View style={styles.routinesSection}>
            <Text category="h6" style={styles.sectionTitle}>My Routines</Text>
            
            {routines.map((routine) => (
              <TouchableOpacity
                key={routine.id}
                style={styles.routineCard}
                onPress={() => handleRoutinePress(routine)}
              >
                <View style={styles.routineContent}>
                  <Text category="s1" style={styles.routineName}>
                    {routine.name}
                  </Text>
                  {routine.description && (
                    <Text category="p2" style={styles.routineDescription}>
                      {routine.description}
                    </Text>
                  )}
                  <Text category="c1" style={styles.routineDate}>
                    Created: {new Date(routine.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.routineArrow}>
                  <Text style={styles.arrowText}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Loading state */}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text>Loading routines...</Text>
          </View>
        )}

        {/* Empty state - only show if not loading and no routines */}
        {!loading && routines.length === 0 && (
          <View style={styles.emptyContainer}>
            {/* Empty state - don't show anything as per requirement */}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  button: {
    flex: 1,
  },
  primaryButton: {
    // Primary button styling will use default UI Kitten styles
  },
  secondaryButton: {
    // Outline button styling will use default UI Kitten styles
  },
  routinesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  routineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  routineContent: {
    flex: 1,
  },
  routineName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  routineDescription: {
    color: '#6c757d',
    marginBottom: 8,
  },
  routineDate: {
    color: '#9ca3af',
    fontSize: 12,
  },
  routineArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 20,
    color: '#6c757d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyContainer: {
    // Empty container - no content as per requirement
  },
});