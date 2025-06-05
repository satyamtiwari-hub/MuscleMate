import { supabase } from '@/services/supabase';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleLogin = async () => {
  setLoading(true);

  const { user, session, error } = await supabase.auth.signIn({ email, password });
  setLoading(false);

  if (error) {
    Alert.alert('Login Error', error.message);
  } else if (session || user) {
    router.replace('/tabs');
  } else {
    Alert.alert('Login Failed', 'No session returned.');
  }
};

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>MuscleMate 💪</Text>

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

      <Button onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? <Spinner size="small" /> : 'Login'}
      </Button>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
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
