import { supabase } from '@/services/supabase';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email to confirm your account.');
      router.replace('/auth/login');
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>Create Account</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button onPress={handleRegister} style={styles.button} disabled={loading}>
        {loading ? <Spinner size="small" /> : 'Register'}
      </Button>

      <TouchableOpacity onPress={() => router.replace('/auth/login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  link: {
    marginTop: 16,
    color: '#3366FF',
    textAlign: 'center',
  },
});
