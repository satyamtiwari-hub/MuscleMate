import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/services/supabase';
import { Card, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface WorkoutStats {
  workouts: number;
  followers: number;
  following: number;
}

interface DashboardItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export default function ProfileScreen() {
  const [stats, setStats] = useState<WorkoutStats>({ workouts: 0, followers: 0, following: 0 });
  const [username, setUsername] = useState('User');
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = supabase.auth.user();
      if (user) {
        // Get username from email or set default
        const email = user.email || 'user@example.com';
        const displayName = email.split('@')[0];
        setUsername(displayName);

        // TODO: Load actual stats from database
        setStats({
          workouts: 24,
          followers: 128,
          following: 56
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleEditProfile = () => {
    console.log('Edit Profile');
    // TODO: Navigate to edit profile screen
  };

  const handleShare = () => {
    console.log('Share App');
    // TODO: Implement share functionality
  };

  const handleSettings = () => {
    console.log('Settings');
    // TODO: Navigate to settings screen
  };

  const handleStatPress = (type: string) => {
    console.log(`${type} pressed`);
    // TODO: Navigate to respective screens
  };

  const handleDashboardItem = (item: DashboardItem) => {
    console.log(`${item.title} pressed`);
    // TODO: Navigate to respective screens
  };

  // Mock workout data for bar chart (7 days)
  const workoutData = [2, 1, 3, 0, 2, 1, 4]; // workouts per day
  const maxWorkouts = Math.max(...workoutData);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const dashboardItems: DashboardItem[] = [
    {
      id: '1',
      title: 'Statistics',
      icon: '📊',
      description: 'View workout analytics'
    },
    {
      id: '2',
      title: 'Exercises',
      icon: '💪',
      description: 'Exercise library'
    },
    {
      id: '3',
      title: 'Measures',
      icon: '📏',
      description: 'Body measurements'
    },
    {
      id: '4',
      title: 'Calendar',
      icon: '📅',
      description: 'Workout schedule'
    }
  ];

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleEditProfile}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        <Text category="h6" style={styles.headerTitle}>{username}</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <IconSymbol name="share" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
            <IconSymbol name="settings" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text category="h6" style={styles.usernameText}>{username}</Text>
              <Text style={styles.userSubtext}>MuscleMate User</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => handleStatPress('workouts')}
            >
              <Text style={styles.statNumber}>{stats.workouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => handleStatPress('followers')}
            >
              <Text style={styles.statNumber}>{stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => handleStatPress('following')}
            >
              <Text style={styles.statNumber}>{stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Workout Chart */}
        <Card style={styles.chartCard}>
          <Text category="s1" style={styles.chartTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {workoutData.map((workouts, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar,
                      { 
                        height: maxWorkouts > 0 ? (workouts / maxWorkouts) * 60 : 0,
                        backgroundColor: workouts > 0 ? '#3366FF' : '#E4E9F2'
                      }
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{days[index]}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartSubtext}>Times worked out this week</Text>
        </Card>

        {/* Dashboard Section */}
        <View style={styles.dashboardSection}>
          <Text category="h6" style={styles.dashboardTitle}>Dashboard</Text>
          
          <View style={styles.dashboardGrid}>
            {dashboardItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dashboardItem}
                onPress={() => handleDashboardItem(item)}
              >
                <View style={styles.dashboardIcon}>
                  <Text style={styles.dashboardEmoji}>{item.icon}</Text>
                </View>
                <Text style={styles.dashboardItemTitle}>{item.title}</Text>
                <Text style={styles.dashboardItemDesc}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  headerButton: {
    minWidth: 80,
  },
  editText: {
    color: '#3366FF',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 80,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  usernameText: {
    fontWeight: '600',
    marginBottom: 4,
  },
  userSubtext: {
    color: '#666',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3366FF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chartCard: {
    marginBottom: 24,
    padding: 16,
  },
  chartTitle: {
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartSubtext: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  dashboardSection: {
    marginBottom: 32,
  },
  dashboardTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dashboardItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    width: (screenWidth - 44) / 2,
    alignItems: 'center',
  },
  dashboardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardEmoji: {
    fontSize: 24,
  },
  dashboardItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  dashboardItemDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});