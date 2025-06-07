import { supabase } from '@/services/supabase';
import { Button, Card, Input, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

interface Meal {
  id: string;
  user_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
  date: string;
}

export default function DietScreen() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [notes, setNotes] = useState('');
  const [logs, setLogs] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        // If table doesn't exist, just show empty state
        if (error.code === '42P01') {
          console.log('Meals table not created yet');
          setLogs([]);
        } else {
          console.error('Error fetching meals:', error);
        }
      } else {
        setLogs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setLogs([]);
    }
  };

  const handleAddMeal = async () => {
    const user = supabase.auth.user();
    if (!user) return;

    // Validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }

    if (!calories || !protein || !carbs || !fat) {
      Alert.alert('Error', 'Please fill in all nutrition fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('meals').insert([{
        user_id: user.id,
        name: name.trim(),
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        notes: notes.trim() || null,
      }]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Meal added successfully!');
        fetchMeals();
        // Reset form
        setName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
        setNotes('');
      }
    } catch (error) {
      console.error('Error adding meal:', error);
      Alert.alert('Error', 'Failed to add meal');
    } finally {
      setLoading(false);
    }
  };

  // Calculate today's totals
  const today = new Date().toDateString();
  const todaysMeals = logs.filter(meal => 
    new Date(meal.date).toDateString() === today
  );

  const todaysTotals = todaysMeals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text category="h1" style={styles.title}>Diet Tracker</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Summary */}
        {todaysMeals.length > 0 && (
          <Card style={styles.summaryCard}>
            <Text category="h6" style={styles.summaryTitle}>Today's Nutrition</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{Math.round(todaysTotals.calories)}</Text>
                <Text style={styles.summaryLabel}>Calories</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{Math.round(todaysTotals.protein)}g</Text>
                <Text style={styles.summaryLabel}>Protein</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{Math.round(todaysTotals.carbs)}g</Text>
                <Text style={styles.summaryLabel}>Carbs</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{Math.round(todaysTotals.fat)}g</Text>
                <Text style={styles.summaryLabel}>Fat</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Add Meal Form */}
        <Card style={styles.formCard}>
          <Text category="h6" style={styles.formTitle}>Log Your Meal</Text>
          
          <Input
            placeholder="Meal Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          
          <View style={styles.nutritionRow}>
            <Input
              placeholder="Calories"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              style={[styles.input, styles.nutritionInput]}
            />
            <Input
              placeholder="Protein (g)"
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              style={[styles.input, styles.nutritionInput]}
            />
          </View>

          <View style={styles.nutritionRow}>
            <Input
              placeholder="Carbs (g)"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              style={[styles.input, styles.nutritionInput]}
            />
            <Input
              placeholder="Fat (g)"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              style={[styles.input, styles.nutritionInput]}
            />
          </View>
          
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            style={styles.input}
          />
          
          <Button 
            onPress={handleAddMeal}
            disabled={loading}
            style={styles.addButton}
          >
            {loading ? 'Adding...' : 'Add Meal'}
          </Button>
        </Card>

        {/* Meals List */}
        <View style={styles.mealsSection}>
          <Text category="h6" style={styles.sectionTitle}>Recent Meals</Text>
          
          {logs.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No meals logged yet.</Text>
              <Text style={styles.emptySubtext}>Add your first meal above!</Text>
            </Card>
          ) : (
            logs.map((meal) => (
              <Card key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealDate}>
                    {new Date(meal.date).toLocaleDateString()}
                  </Text>
                </View>
                
                <View style={styles.mealNutrition}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{meal.calories}</Text>
                    <Text style={styles.nutritionLabel}>kcal</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{meal.protein}g</Text>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{meal.fat}g</Text>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                  </View>
                </View>
                
                {meal.notes && (
                  <Text style={styles.mealNotes}>Note: {meal.notes}</Text>
                )}
              </Card>
            ))
          )}
        </View>
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
  summaryCard: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
  },
  summaryTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3366FF',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  formCard: {
    marginBottom: 16,
    padding: 16,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nutritionInput: {
    flex: 1,
  },
  addButton: {
    marginTop: 8,
  },
  mealsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    marginTop: 8,
  },
  mealCard: {
    marginBottom: 12,
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  mealDate: {
    fontSize: 12,
    color: '#666',
  },
  mealNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mealNotes: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#666',
    fontSize: 14,
  },
});