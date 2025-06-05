import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react';

export default function HomeScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">MuscleMate 💪</Text>
      <Button style={{ marginTop: 16 }} onPress={() => alert('Let’s Go!')}>
        Start Workout
      </Button>
    </Layout>
  );
}
