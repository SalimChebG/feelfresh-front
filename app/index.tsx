import {Dimensions, FlatList, Platform , Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {Link} from "expo-router"
import {SafeAreaView} from "react-native-safe-area-context"
import {ThemedText} from "@/components/ThemedText"
import {useThemeColors} from "@/hooks/useThemeColors"
import {Salon} from "@/components/Salon"
import {SalonCard} from "@/components/salon/SalonCard"
import {useFetchQuery, useInfiniteFetchQuery} from "@/hooks/useFetchQuery"
import {getSalonId} from "@/functions/salon.ts"
import {SearchBar} from "@/components/SearchBar"
import {HomeHeader} from "@/components/HomeHeader"
import {Row} from "@/components/Row"
import {useState} from 'react'

export default function Index() {
    const { width } = Dimensions.get('window');
    const isMobile = Platform.OS !== 'web' && width <= 768; // On vérifie que ce n'est pas une plateforme "web" et que la largeur correspond à un écran mobile

    const colors = useThemeColors()
    console.log('+++++++++++++++++++++++++++');
    //const {data,  isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')
    //const salons = data?.pages.flatMap(page => page.results) ?? []

    //const {data,  isFetching} = useFetchQuery('/pokemon?limit=21')
    const {data,  isFetching} = useFetchQuery('/coiffeurs')
    //const salons = data?.pages.flatMap(page => page.results) ?? []
    const salons = data ?? []
    console.log('Les salons récupérés :', data);

    const [search, setSearch] = useState('')
    const filteredSalons = search ? salons.filter(p => p.name.includes(search.toLowerCase()) || getSalonId(p.url).toString() == search) : salons


return (
  <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
    <Row style={styles.header} gap={120}>
      <ThemedText variant="headline" color="text">
        feelFresh
      </ThemedText>
      <HomeHeader />
    </Row>

    {/* Conteneur des frames */}
    <View >
      {/* Frame supérieur */}
        <View style={[styles.topFrame, { backgroundColor: colors.background.primary, paddingHorizontal: 30 }]}>
          {/* Grand sous-frame en haut */}
            <View style={[{ backgroundColor: colors.background.primary }, styles.largeSubFrame]}>
                <SearchBar value={search} onChange={setSearch}/>
            </View>
            <View style={styles.frame}>
                  <ThemedText variant="headline" color="text">
                            Services
                  </ThemedText>
            </View>


          {/* Petit sous-frame en bas */}
          <View style={[ { backgroundColor: colors.icon },styles.smallSubFrame]} />
        </View>


      {/* -------------------- Espacement entre les deux frames ----------------------*/}
          <View
            style={[styles.subcontainer, styles.spacer, { backgroundColor: colors.background.secondary }]}
          />

          {/* Frame inférieur */}
          <View
            style={[styles.subcontainer, styles.bottomFrame, { backgroundColor: colors.background.primary }]}
          />
        </View>

    <View>
      {isMobile && ( // Affiche uniquement en version mobile
        <View>
          <Image
            source={require("@/assets/images/homeScreen/state=home.png")}
            style={styles.navBar}
          />
        </View>
      )}
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
        subcontainer: {
            flex: 1,
            padding: 4,
        },

    subcontainer: {
        width: 344,
        height: 488,
        opacity: 1, // 100% d'opacité
        justifyContent: 'flex-start', // Pour aligner les frames du haut vers le bas
        alignItems: 'center', // Centrer horizontalement
        position: 'relative',
        },

    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,

        flexDirection: 'row', // Par défaut sur mobile
        alignItems: 'center',
        },
    image: {
        width: 24,
        height: 24, // Hauteur de l'image
        resizeMode: 'contain', // Garde les proportions de l'image
      },

      image2: {
          width: '100%',
          //top: -20,
          //height: 240, // Hauteur de l'image
          resizeMode: 'contain', // Garde les proportions de l'image
        },

    body:{
    flex: 1,
    marginTop: 16,
    },

    gridGap:{
            gap: 0,
        },

    list: {
        padding: 2,
        }

    ,
      topFrame: {
        width: '100%',
        height: 220,
      },
      spacer: {
        height: 48, // Espacement entre les frames (vous pouvez ajuster cette valeur)
        width: '100%',
      },
      bottomFrame: {
        width: '100%',
        height: 420,
      },

    largeSubFrame: {
      width: "100%",
      height: 166,
      flex: 0,
    },

    smallSubFrame: {
      width: "100%",
      height: 22,
      flex: 0,
    },

      navBar: {
        width: '100%', // Utilise toute la largeur du conteneur
        height: 200, // Fixe une hauteur spécifique pour l'image, tu peux ajuster cela en fonction du design
        resizeMode: 'contain', // Assure que l'image conserve ses proportions sans déformation
      },
})
