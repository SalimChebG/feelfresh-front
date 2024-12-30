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
import {RootView} from "@/components/RootView"

export default function Index() {
    const { width } = Dimensions.get('window');
    const isMobile = Platform.OS !== 'web' && width <= 768; // On vérifie que ce n'est pas une plateforme "web" et que la largeur correspond à un écran mobile
    const colors = useThemeColors()
    const {data,  isFetching} = useFetchQuery('/coiffeurs')
    const salons = data ?? []
    const [search, setSearch] = useState('')

return (
  <RootView>
        <HomeHeader />
        <FlatList
          data={filteredSalons} // Remplace avec ta liste de salons
          numColumns={Platform.OS === 'web' ? 3 : 1} // Nombre de colonnes selon la plateforme
          ListHeaderComponent={
              <>
              <View style={[{ paddingHorizontal: 10 }, styles.topFrame]}>
                     <SearchBar value={search} onChange={setSearch}/>
                     <View style={[styles.frame, { marginTop: 12 }]}>
                            <ThemedText variant="headline" color="text"> Services </ThemedText>
                            <ServicesComponent style={{ marginTop: 16 ,  marginBottom: 16 }}> </ServicesComponent>
                    </View>
                    <Row style={[{ marginBottom: 0, justifyContent: "space-between" }]}>
                      <ThemedText variant="headline" color="gray">Salons à proximité</ThemedText>
                      <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <Image
                          source={require("@/assets/images/homeScreen/map-pin.png")}
                          style={{ width: 16, height: 16 }}
                          resizeMode="contain"
                        />
                        <ThemedText variant="subtitle1" color="blue" style={{ marginLeft: 5 }}>
                          Voir la carte
                        </ThemedText>
                      </View>
                    </Row>

              </View>
          </>
          }
          contentContainerStyle={[styles.list]} // Ajout des styles pour l'espacement
            columnWrapperStyle={
              Platform.OS === 'web' ? { gap:40, marginLeft:50 , marginBottom: 40 } : null
            }
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.secondaryBackground} /> : null
          }
          renderItem={({ item }) => (
            <SalonPreviewCard
              id={item.id}
              name={item.name}
              address={item.address}
              reviewsNumber={item.reviewsNumber}
              rate={item.rate}
              openingHours={item.openingHours}
            />

          )}
          keyExtractor={(item) => item.id.toString()} // Utilisation d'un identifiant unique pour chaque item
        />

      <View style={isMobile ? styles.mobileNavBarContainer : {}}>
            {isMobile && <NavigationBar style={[{ backgroundColor: colors.background.primary }]} />}
      </View>
  </RootView>
);

}

const styles = StyleSheet.create({
    topFrame: {
      justifyContent: "space-between",
    },
    list: {
        paddingHorizontal: 6,
        justifyContent: "space-between",
        gap :'30',
    },
    mobileNavBarContainer: {
        position: 'absolute',
        bottom: Platform.OS === "ios" ? 10 : 0,
        left: 0,
        right: 0,
    },
})