import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simuler un délai pour attendre que le layout soit prêt
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100); // 100 ms pour s'assurer que le Root Layout est monté

    return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace('/screens/home/home'); // Rediriger après que le layout soit prêt
    }
  }, [isReady, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});
