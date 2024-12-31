import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import ContinueButton from "@/components/buttons/ContinueButton";
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import CountryPicker from "react-native-country-picker-modal";
import TextInput from "@/components/TextInput"; // Importer le nouveau composant personnalisé

export default function ProfileScreen() {
  const colors = useThemeColors();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("FR"); // Par défaut, la France
  const [callingCode, setCallingCode] = useState("33"); // Par défaut, +33 pour la France
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isProfileModified, setIsProfileModified] = useState(false);
  const [isPasswordModified, setIsPasswordModified] = useState(false);

  const handleProfileChange = () => {
    setIsProfileModified(
      firstName.trim() !== "" || lastName.trim() !== "" || email.trim() !== "" || phone.trim() !== ""
    );
  };

  const handlePasswordChange = () => {
    setIsPasswordModified(
      password.trim() !== "" && newPassword.trim() !== "" && confirmPassword.trim() === newPassword.trim()
    );
  };

  return (
    <RootView>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ThemedText variant="headline3" color={"text1"}>Mes Coordonnées</ThemedText>

        <TextInput
          placeholder="Prénom"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            handleProfileChange();
          }}
        />
        <TextInput
          placeholder="Nom de famille"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            handleProfileChange();
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleProfileChange();
          }}
        />

        <View style={styles.phoneContainer}>
          <View style={[styles.countryPckerContainer,{ backgroundColor: colors.white }]}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCallingCode
              withFilter
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]); // Mettre à jour le code d'appel international
              }}
            />
            <ThemedText variant="subtitle2" color={'textHolder'}>+{callingCode}</ThemedText>
          </View>
          <TextInput
            placeholder="Numéro de téléphone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              handleProfileChange();
            }}
            style={styles.phoneInput}
          />
        </View>

        <ContinueButton
          isEnabled={isProfileModified}
          onPress={() => console.log("Profil enregistré")}
          label="Enregistrer"
        />
        <ContinueButton
          isEnabled={isProfileModified}
          onPress={() => console.log("Changements annulés")}
          label="Annuler"
        />

        {/* Section: Mot de passe */}
        <ThemedText variant="headline3" style={{ marginVertical: 16 }}>Mot de Passe</ThemedText>

        <TextInput
          placeholder="Mot de passe actuel"
          isPassword
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handlePasswordChange();
          }}
        />
        <TextInput
          placeholder="Nouveau mot de passe"
          isPassword
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            handlePasswordChange();
          }}
        />
        <TextInput
          placeholder="Confirmation du nouveau mot de passe"
          isPassword
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            handlePasswordChange();
          }}
        />

        <ContinueButton
          isEnabled={isPasswordModified}
          onPress={() => console.log("Mot de passe modifié")}
          label="Modifier"
        />
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  countryPckerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 5,
    marginVertical: 8,
    elevation:1,
  },

  phoneInput: {
    flex: 1,
    marginLeft: 8,
  },
});
