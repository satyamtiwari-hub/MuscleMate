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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  const handleLogin = async () => {
    // Validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const { user, session, error } = await supabase.auth.signIn({ 
        email: email.trim(), 
        password 
      });
      
      if (error) {
        Alert.alert('Login Error', error.message);
      } else if (session || user) {
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Login Failed', 'No session returned.');
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

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
    Alert.alert('Google Sign In', 'Google authentication coming soon!');
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook sign in
    Alert.alert('Facebook Sign In', 'Facebook authentication coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text category="h6" style={styles.headerTitle}>Login</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Email Section */}
          <View style={styles.inputSection}>
            <Text category="s1" style={styles.inputLabel}>Email or Username</Text>
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

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button 
            style={styles.loginButton}
            size="large"
            onPress={handleLogin} 
            disabled={loading}
          >
            {loading ? <Spinner size="small" status="basic" /> : 'Login'}
          </Button>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <Button
              style={[styles.socialButton, styles.googleButton]}
              appearance="outline"
              size="large"
              onPress={handleGoogleSignIn}
            >
              <View style={styles.socialButtonContent}>
                <Text style={styles.socialButtonText}>Sign in with Google</Text>
              </View>
            </Button>

            <Button
              style={[styles.socialButton, styles.facebookButton]}
              appearance="outline"
              size="large"
              onPress={handleFacebookSignIn}
            >
              <View style={styles.socialButtonContent}>
                <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
              </View>
            </Button>
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
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotText: {
    color: '#3366FF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 32,
    borderRadius: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E4E9F2',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#8F9BB3',
    fontSize: 14,
  },
  socialContainer: {
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  googleButton: {
    borderColor: '#DB4437',
  },
  facebookButton: {
    borderColor: '#4267B2',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});