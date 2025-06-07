import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/services/supabase';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  const handleRegister = async () => {
    // Validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }
    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const { user, error } = await supabase.auth.signUp({ 
        email: email.trim(), 
        password,
        options: {
          data: {
            username: username.trim()
          }
        }
      });

      if (error) {
        Alert.alert('Registration Error', error.message);
      } else {
        Alert.alert(
          'Success', 
          'Account created successfully! Check your email to confirm your account.',
          [
            { text: 'OK', onPress: () => router.replace('/auth/login') }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleTermsPress = () => {
    Alert.alert('Terms & Conditions', 'Terms and conditions coming soon!');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Privacy Policy', 'Privacy policy coming soon!');
  };

  const toggleTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text category="h6" style={styles.headerTitle}>Sign up</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Email Section */}
          <View style={styles.inputSection}>
            <Text category="s1" style={styles.inputLabel}>Email</Text>
            <Input
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              size="large"
            />
          </View>

          {/* Password Section */}
          <View style={styles.inputSection}>
            <Text category="s1" style={styles.inputLabel}>Password</Text>
            <Input
              placeholder="Minimum 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              size="large"
            />
          </View>

          {/* Username Section */}
          <View style={styles.inputSection}>
            <Text category="s1" style={styles.inputLabel}>Username</Text>
            <Input
              placeholder="username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              size="large"
            />
          </View>

          {/* Terms and Conditions - Custom Checkbox */}
          <TouchableOpacity style={styles.termsContainer} onPress={toggleTerms}>
            <View style={[
              styles.customCheckbox,
              acceptTerms && styles.customCheckboxChecked
            ]}>
              {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                I accept the{' '}
                <Text style={styles.linkText} onPress={handleTermsPress}>
                  terms and conditions
                </Text>
                {' '}and the{' '}
                <Text style={styles.linkText} onPress={handlePrivacyPress}>
                  privacy policy
                </Text>
                .
              </Text>
            </View>
          </TouchableOpacity>

          {/* Continue Button */}
          <Button 
            style={styles.continueButton}
            size="large"
            onPress={handleRegister} 
            disabled={loading}
          >
            {loading ? <Spinner size="small" status="basic" /> : 'Continue'}
          </Button>

          {/* Login Link */}
          <TouchableOpacity 
            style={styles.loginContainer} 
            onPress={() => router.replace('/auth/login')}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    marginBottom: 0,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3366FF',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  customCheckboxChecked: {
    backgroundColor: '#3366FF',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  linkText: {
    color: '#3366FF',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  continueButton: {
    marginBottom: 24,
    borderRadius: 12,
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#3366FF',
    fontWeight: '600',
  },
});