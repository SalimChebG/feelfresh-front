import {StatusBar, ScrollView, Dimensions, FlatList, Platform , Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";
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
import '../i18n';

export default function Index() {

    const { width } = Dimensions.get('window');
    const isMobile = Platform.OS !== 'web' && width <= 768; // On vérifie que ce n'est pas une plateforme "web" et que la largeur correspond à un écran mobile

    const colors = useThemeColors()
    const {data,  isFetching} = useFetchQuery('/coiffeurs')
    const salons = data ?? []

    const [search, setSearch] = useState('')
    //const filteredSalons = search ? salons.filter(p => p.name.includes(search.toLowerCase()) || getSalonId(p.url).toString() == search) : salons

return (
  <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
  <StatusBar barStyle="dark-content" backgroundColor="white" />
    <Row style={styles.header} gap={120}>
      <ThemedText  variant="headline" color="text" >
        feelFresh
      </ThemedText>
      <HomeHeader />
    </Row>

            <FlatList
              data={filteredSalons} // Remplace avec ta liste de salons
              numColumns={Platform.OS === 'web' ? 3 : 1} // Nombre de colonnes selon la plateforme
              ListHeaderComponent={
                  <>
                  {/* Frame supérieur */}
                  <View style={[{ backgroundColor: colors.background.primary, paddingHorizontal: 20 },styles.topFrame]}>
                    {/* Grand sous-frame en haut */}
                      <View style={[{ backgroundColor: colors.background.primary }]}>
                          <SearchBar value={search} onChange={setSearch}/>
                      </View>
                      <View style={[styles.frame, { marginTop: 24 }]}>
                            <ThemedText variant="headline" color="text"> Services </ThemedText>
                            <ServicesComponent style={{ marginTop: 16 }}> </ServicesComponent>
                      </View>
                      {/* Petit sous-frame en bas */}
                      <Row  style={[styles.smallTopFrame, { marginBottom: 0 }]} >
                          <ThemedText variant="headline" color="gray"> Salons à proximité </ThemedText>
                          <Row style={{ flex: 0 }}>
                              <Image source={require("@/assets/images/homeScreen/map-pin.png")} style={{width: 16, height: 16 }} resizeMode="contain"/>
                              <ThemedText variant="subtitle1" color="blue"> Voir la carte</ThemedText>
                          </Row>
                      </Row>
                  </View>
              </>
              }
              contentContainerStyle={[{ backgroundColor: colors.background.primary }, styles.list]} // Ajout des styles pour l'espacement
              columnWrapperStyle={Platform.OS === 'web' ? styles.columnWrapper : null} // Style pour l'espacement des colonnes si sur web
              ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.secondaryBackground} /> : null
              }
              renderItem={({ item }) => (
                  <SalonPreviewCard
                    id={1}
                    name="Salon Élégance"

                  />
              )}
              keyExtractor={(item) => item.id.toString()} // Utilisation d'un identifiant unique pour chaque item
            />


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

        header: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            flexDirection: 'row', // Par défaut sur mobile
            alignItems: 'center',
            },

    list: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        gap :'40',

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