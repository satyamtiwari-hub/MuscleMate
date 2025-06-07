import { supabase } from '@/services/supabase';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface BodyMetric {
  id: string;
  user_id: string;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  arms: number;
  thighs: number;
  notes?: string;
  date: string;
}

export default function BodyMetricsScreen() {
  const [logs, setLogs] = useState<BodyMetric[]>([]);
  const [filter, setFilter] = useState('weekly');
  const [formVisible, setFormVisible] = useState(false);
  const [bmiVisible, setBmiVisible] = useState(false);
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  
  // Form states
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [notes, setNotes] = useState('');
  
  // BMI states
  const [bmiWeight, setBmiWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    fetchBodyLogs();
  }, []);

  const fetchBodyLogs = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data, error } = await supabase
        .from('body_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) {
        // If table doesn't exist, just show empty state
        if (error.code === '42P01') {
          console.log('Body metrics table not created yet');
          setLogs([]);
        } else {
          Alert.alert('Error fetching data', error.message);
        }
      } else {
        setLogs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setLogs([]);
    }
  };

  const handleSubmit = async () => {
    const user = supabase.auth.user();
    if (!user) return;

    if (!weight || !chest || !waist || !hips || !arms || !thighs) {
      Alert.alert('Error', 'Please fill in all measurement fields');
      return;
    }

    try {
      const { error } = await supabase.from('body_metrics').insert([{
        user_id: user.id,
        weight: parseFloat(weight),
        chest: parseFloat(chest),
        waist: parseFloat(waist),
        hips: parseFloat(hips),
        arms: parseFloat(arms),
        thighs: parseFloat(thighs),
        notes: notes || null,
      }]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Measurement added successfully!');
        fetchBodyLogs();
        // Reset form
        setWeight(''); setChest(''); setWaist(''); setHips(''); setArms(''); setThighs(''); setNotes('');
        setFormVisible(false);
      }
    } catch (error) {
      console.error('Error saving:', error);
      Alert.alert('Error', 'Failed to save measurement');
    }
  };

  const calculateBMI = () => {
    if (!height || !bmiWeight) {
      Alert.alert('Error', 'Please enter both height and weight');
      return;
    }

    const h = parseFloat(height) / 100; // convert cm to meters
    const w = parseFloat(bmiWeight);
    const bmi = w / (h * h);
    setBmiResult(bmi.toFixed(1));
    
    // BMI categories
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    Alert.alert('BMI Result', `Your BMI is ${bmi.toFixed(1)} (${category})`);
  };

  const metrics = [
    { key: 'weight', label: 'WEIGHT', unit: 'kg' },
    { key: 'chest', label: 'CHEST', unit: 'cm' },
    { key: 'waist', label: 'WAIST', unit: 'cm' },
    { key: 'hips', label: 'HIPS', unit: 'cm' },
    { key: 'arms', label: 'ARMS', unit: 'cm' },
    { key: 'thighs', label: 'THIGHS', unit: 'cm' },
  ];

  const latestMeasurement = logs[logs.length - 1];

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text category="h1" style={styles.title}>Body Metrics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview Card */}
        <View style={styles.headerCard}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>Your Stats</Text>
          </View>

          <FlatList
            horizontal
            data={metrics}
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.metricSlide}>
                <Text style={styles.metricTitle}>{item.label}</Text>
                <Text style={styles.metricValue}>
                  {latestMeasurement?.[item.key as keyof BodyMetric] ?? '-'} {item.unit}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          {['daily', 'weekly', 'monthly'].map(filterOption => (
            <TouchableOpacity 
              key={filterOption} 
              onPress={() => setFilter(filterOption)} 
              style={[styles.filterBtn, filter === filterOption && styles.activeFilter]}
            >
              <Text style={styles.filterText}>{filterOption.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Measurement Button */}
        <TouchableOpacity style={styles.addBtn} onPress={() => setFormVisible(true)}>
          <Text style={styles.addBtnText}>+ Add Measurement</Text>
        </TouchableOpacity>

        {/* BMI Section */}
        <Card style={styles.bmiBox}>
          <Text category="h6" style={styles.sectionTitle}>BMI Calculator</Text>
          <Text style={styles.bmiResult}>
            Your BMI: {bmiResult ?? 'Not calculated yet'}
          </Text>
          <Button 
            style={styles.bmiButton}
            onPress={() => setBmiVisible(true)}
            appearance="outline"
          >
            Calculate BMI
          </Button>
        </Card>

        {/* Recent Measurements */}
        {logs.length > 0 && (
          <View style={styles.recentSection}>
            <Text category="h6" style={styles.sectionTitle}>Recent Measurements</Text>
            {logs.slice(-3).reverse().map((log, index) => (
              <Card key={log.id} style={styles.measurementCard}>
                <Text style={styles.measurementDate}>
                  {new Date(log.date).toLocaleDateString()}
                </Text>
                <View style={styles.measurementRow}>
                  <Text>Weight: {log.weight} kg</Text>
                  <Text>Chest: {log.chest} cm</Text>
                  <Text>Waist: {log.waist} cm</Text>
                </View>
                {log.notes && (
                  <Text style={styles.measurementNotes}>Notes: {log.notes}</Text>
                )}
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Measurement Modal */}
      <Modal
        visible={formVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setFormVisible(false)}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>Add New Measurement</Text>
          
          <Input
            placeholder="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Chest (cm)"
            value={chest}
            onChangeText={setChest}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Waist (cm)"
            value={waist}
            onChangeText={setWaist}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Hips (cm)"
            value={hips}
            onChangeText={setHips}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Arms (cm)"
            value={arms}
            onChangeText={setArms}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Thighs (cm)"
            value={thighs}
            onChangeText={setThighs}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            style={styles.modalInput}
          />
          
          <View style={styles.modalButtons}>
            <Button 
              style={styles.modalButton}
              appearance="outline"
              onPress={() => setFormVisible(false)}
            >
              Cancel
            </Button>
            <Button 
              style={styles.modalButton}
              onPress={handleSubmit}
            >
              Save
            </Button>
          </View>
        </Card>
      </Modal>

      {/* BMI Modal */}
      <Modal
        visible={bmiVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setBmiVisible(false)}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>Calculate BMI</Text>
          
          <Input
            placeholder="Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Weight (kg)"
            value={bmiWeight}
            onChangeText={setBmiWeight}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          
          <View style={styles.modalButtons}>
            <Button 
              style={styles.modalButton}
              appearance="outline"
              onPress={() => setBmiVisible(false)}
            >
              Cancel
            </Button>
            <Button 
              style={styles.modalButton}
              onPress={calculateBMI}
            >
              Calculate
            </Button>
          </View>
        </Card>
      </Modal>
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
  headerCard: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  circleText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metricSlide: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addBtn: {
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bmiBox: {
    marginVertical: 16,
    padding: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  bmiResult: {
    marginBottom: 12,
    fontSize: 16,
  },
  bmiButton: {
    marginTop: 8,
  },
  recentSection: {
    marginVertical: 16,
    marginBottom: 32,
  },
  measurementCard: {
    marginBottom: 12,
    padding: 16,
  },
  measurementDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  measurementNotes: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#666',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    margin: 16,
    padding: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalInput: {
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});