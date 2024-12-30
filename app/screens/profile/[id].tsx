import React, { useState } from 'react';
import {useThemeColors} from "@/hooks/useThemeColors"
import {RootView} from "@/components/RootView"
import BackButton from "@/components/buttons/BackButton";
import { useRouter, useSearchParams } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

const Profile = () => {
  //const { id } = useSearchParams(); // Récupérer l'ID depuis les paramètres de la route
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const colors = useThemeColors();


  return (
    <RootView style={styles.container}>
        <Text>
            Page de profil
        </Text>
    </RootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

});

export default Profile;
