import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/services/supabase';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const session = supabase.auth.session();

    if (!session) {
      setTimeout(() => {
        router.replace('/auth/login');
      }, 100);
    } else {
      setTimeout(() => {
        router.replace('/(tabs)/');
      }, 100);
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        if (session) {
          router.replace('/(tabs)/');
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

  // Choose your theme here:
  // Option 1: Default Eva themes
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  
  // Option 2: Material themes (uncomment to use)
  // const theme = colorScheme === 'dark' ? eva.material.dark : eva.material.light;
  
  // Option 3: Force a specific theme (uncomment to use)
  // const theme = eva.dark; // Always dark
  // const theme = eva.material.light; // Always material light

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <Layout style={{ flex: 1 }}>
          <Slot />
        </Layout>
      </ApplicationProvider>
    </>
  );
}