import {Dimensions, FlatList, Platform , Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {Link} from "expo-router"
import {SafeAreaView} from "react-native-safe-area-context"
import {ThemedText} from "@/components/ThemedText"
import {useThemeColors} from "@/hooks/useThemeColors"
import {Salon} from "@/components/Salon"
import {SalonPreviewCard} from "@/components/salon/SalonPreviewCard"
import {useFetchQuery, useInfiniteFetchQuery} from "@/hooks/useFetchQuery"
import {getSalonId} from "@/functions/salon.ts"
import {SearchBar} from "@/components/SearchBar"
import {HomeHeader} from "@/components/HomeHeader"
import {Row} from "@/components/Row"
import {CoupeCheveux} from "@/components/services/CoupeCheveux"
import {ServicesComponent} from "@/components/Services"
import {useState} from 'react'
import {NavigationBar} from "@/components/NavigationBar"
import {filteredSalons} from "@/constants/SetTestSalons"
import { useTranslation } from "react-i18next";
import '../i18n';

export default function Index() {

    const { width } = Dimensions.get('window');
    const isMobile = Platform.OS !== 'web' && width <= 768; // On vérifie que ce n'est pas une plateforme "web" et que la largeur correspond à un écran mobile

    const colors = useThemeColors()
    const {data,  isFetching} = useFetchQuery('/coiffeurs')
    const salons = data ?? []

    const [search, setSearch] = useState('')
    //const filteredSalons = search ? salons.filter(p => p.name.includes(search.toLowerCase()) || getSalonId(p.url).toString() == search) : salons

    const  i18n = useTranslation(); // Hook pour les traductions
    const ServicesHomeLabel = i18n.t('ServicesHomeLAbel');
    const NearbySalonHomeLabel = i18n.t('NearbySalonsHomeLabel');

return (
  <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
    <Row style={styles.header} gap={120}>
      <ThemedText variant="headline" color="text">
        feelFresh
      </ThemedText>
      <HomeHeader />
    </Row>

    {/* Conteneur des frames */}

        {/* Frame supérieur */}
        <View style={[{ backgroundColor: colors.background.primary, paddingHorizontal: 30 }, styles.topFrame]}>
          {/* Grand sous-frame en haut */}
            <View style={[{ backgroundColor: colors.background.primary }]}>
                <SearchBar value={search} onChange={setSearch}/>
            </View>
            <View style={[styles.frame, { marginTop: 24 }]}>
                  <ThemedText variant="headline" color="text"> {ServicesHomeLabel} </ThemedText>
                  <ServicesComponent style={{ marginTop: 16 }}> </ServicesComponent>
            </View>
            {/* Petit sous-frame en bas */}
            <Row  style={[styles.smallTopFrame, { marginTop: 24 }]} >
                <ThemedText variant="headline" color="gray"> {NearbySalonHomeLabel} </ThemedText>
                <Row style={{ flex: 0 }}>
                    <Image source={require("@/assets/images/homeScreen/map-pin.png")} style={{width: 16, height: 16 }} resizeMode="contain"/>
                    <ThemedText variant="subtitle1" color="blue"> Voir la carte</ThemedText>
                </Row>
            </Row>
    </View>


      {/* -------------------- Espacement entre les deux frames ----------------------*/}
          {/*<View
            style={[styles.spacer, { backgroundColor: colors.background.secondary }]}
          />*/}
      {/* -------------------- Espacement entre les deux frames ----------------------*/}

          {/* Frame inférieur
          <View style={[styles.bottomFrame, { backgroundColor: colors.background.primary }]}>
                <SalonPreviewCard
                id={"777"} name={"TopG wagon"} style={{flex: 1}}>
                </SalonPreviewCard>
          </View>*/}

          <View style={[styles.bottomFrame, { backgroundColor: colors.background.primary }]}>
            <FlatList
              data={filteredSalons} // Remplace avec ta liste de salons
              numColumns={Platform.OS === 'web' ? 3 : 1} // Nombre de colonnes selon la plateforme
              contentContainerStyle={[styles.gridGap, styles.list]} // Ajout des styles pour l'espacement
              columnWrapperStyle={Platform.OS === 'web' ? styles.columnWrapper : null} // Style pour l'espacement des colonnes si sur web
              ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.secondaryBackground} /> : null
              }
              renderItem={({ item }) => (
                <SalonPreviewCard id={item.id} name={item.name} style={{ flex: 1 }} /> // Utilisation du composant avec les données de chaque salon
              )}
              keyExtractor={(item) => item.id.toString()} // Utilisation d'un identifiant unique pour chaque item
            />
          </View>

          <View style={isMobile ? styles.mobileNavBarContainer : {}}>
                {isMobile && <NavigationBar style={[{ backgroundColor: colors.white }]} />}





          </View>


  </SafeAreaView>
);

}

const styles = StyleSheet.create({
       container: {
            flex: 1,
            gap: 16,
            },
        topFrame: {
          height: 220,
          justifyContent: "space-between",
        },

        smallTopFrame: {
          width: "100%",
          height: 22,
          flex: 0,
        },

        bottomFrame: {
          height: 520,
          justifyContent: "space-between",
          paddingHorizontal: 10
        },

        header: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            flexDirection: 'row', // Par défaut sur mobile
            alignItems: 'center',
            },

      spacer: {
        height: 48, // Espacement entre les frames (vous pouvez ajuster cette valeur)
        width: '100%',
      },


    mobileNavBarContainer: {
        position: 'absolute',
        bottom:3,
        left: 0,
        right: 0,
    },


      navBar: {
        width: '100%', // Utilise toute la largeur du conteneur
        height: 58, // Fixe une hauteur spécifique pour l'image, tu peux ajuster cela en fonction du design
        resizeMode: 'contain', // Assure que l'image conserve ses proportions sans déformation
      },
})