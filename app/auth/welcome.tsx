import { Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up - Coming Soon');
  };

  const handleEmailSignUp = () => {
    try {
      router.push('/auth/register');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLogin = () => {
    try {
      router.push('/auth/login');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <ImageBackground 
      source={{ 
        uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' 
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          {/* Top section with app name */}
          <View style={styles.topSection}>
            <Text category="h1" style={styles.appName}>MuscleMate</Text>
            <Text category="h6" style={styles.tagline}>Your Fitness Journey Starts Here</Text>
          </View>

          {/* Bottom section with auth options */}
          <View style={styles.bottomSection}>
            <View style={styles.authContainer}>
              {/* Google Sign Up Button */}
              <TouchableOpacity
                style={[styles.authButton, styles.googleButton]}
                onPress={handleGoogleSignUp}
              >
                <View style={styles.googleButtonContent}>
                  <View style={styles.googleLogoContainer}>
                    <Text style={styles.googleLogo}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>Sign up with Google</Text>
                </View>
              </TouchableOpacity>

              {/* Email Sign Up Button */}
              <TouchableOpacity
                style={[styles.authButton, styles.emailButton]}
                onPress={handleEmailSignUp}
              >
                <Text style={styles.emailButtonText}>Sign up with Email</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
                <Text style={styles.loginText}>
                  Already have an account? <Text style={styles.loginLink}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  appName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  tagline: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  authContainer: {
    gap: 16,
  },
  authButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  googleLogoContainer: {
    position: 'absolute',
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  emailButton: {
    backgroundColor: '#3366FF',
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    color: '#3366FF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});