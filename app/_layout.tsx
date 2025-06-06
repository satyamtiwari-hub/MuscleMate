import { supabase } from '@/services/supabase';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const session = supabase.auth.session();

    if (!session) {
      // Delay navigation to let RootLayout render first
      setTimeout(() => {
        router.replace('/auth/login');
      }, 100);
    } else {
      // If there's already a session, go to tabs
      setTimeout(() => {
        router.replace('/(tabs)/');
      }, 100);
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        if (session) {
          router.replace('/(tabs)/'); // Navigate to tabs directory
        } else {
          router.replace('/auth/login');
        }
      }, 100);
    });

    setAppReady(true);

    return () => {
      if (listener && listener.unsubscribe) {
        listener.unsubscribe();
      }
    };
  }, []);

  if (!appReady) return null;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{ flex: 1 }}>
          <Slot />
        </Layout>
      </ApplicationProvider>
    </>
  );
}