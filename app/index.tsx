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

export default function Index() {
    const { width } = Dimensions.get('window');
    const isMobile = Platform.OS !== 'web' && width <= 768; // On vérifie que ce n'est pas une plateforme "web" et que la largeur correspond à un écran mobile

    const colors = useThemeColors()
    const {data,  isFetching} = useFetchQuery('/coiffeurs')
    const salons = data ?? []

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

        {/* Frame supérieur */}
        <View style={[{ backgroundColor: colors.background.primary, paddingHorizontal: 30 }, styles.topFrame]}>
          {/* Grand sous-frame en haut */}
            <View style={[{ backgroundColor: colors.background.primary }]}>
                <SearchBar value={search} onChange={setSearch}/>
            </View>
            <View style={[styles.frame, { marginTop: 24 }]}>
                  <ThemedText variant="headline" color="text"> Services </ThemedText>
                  <ServicesComponent style={{ marginTop: 16 }}> </ServicesComponent>
            </View>
            {/* Petit sous-frame en bas */}
            <Row  style={[styles.smallTopFrame, { marginTop: 24 }]} >
                <ThemedText variant="headline" color="gray"> Salons à proximité </ThemedText>
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

          {/* Frame inférieur */}
          <View style={[styles.bottomFrame, { backgroundColor: colors.background.primary }]}>
                <SalonPreviewCard id={"https://ff64e948de11bafd60e80d05461fc600687b4a19a67c0f66e06c1d5-apidata.googleusercontent.com/download/storage/v1/b/imagestopg/o/8.jpg?jk=ASCxOPsu8cfqsTrsQwLZCl6pc03CCvt9NS7zJTXXNQ6OdrRVkg-WHk_q_RJL5quUh6JSoxqkxRSVtwVdMt2AoG_G5MqTmwOjr2rv0fuiJ09J9NQ19b-XbeL2CmIbO1ImzN4BEmX1xo-hSqogZCNyIp0R3eQACS-zHz2h3qadbmm9vw-NxyE-0INtV1Qb4dlaKYb7QRY_tZI3tnEb2b_PZNp2ZyhHD0SMDtEVsStdn6-ogitqzCQF_Qr4kNECOzK8d6CZMNagJ_p4FF1WIIgzWivs6F74n96DiNJukaZOU4n2m5goZWoE_c9oW7guaRkjAm-rajnCDTRY9rS2GWTO29ixrD2GZnSrG2ePufH4l-JDm2tZxosdI9x20Ezqeh5gurQDu0clXdiCVHUbvP__XYfZvZ6Cg2UYIL0323tlgwk4mMdG-l4U3ONQKb6yD1KgEA8lnXVxRsJ9bRyw3ZnjctlA0XX-iRATCn9Gl4zO_MP-kYb2cPgqjf2uXAqi23XiByWDhluzKX7rHdim5y7j4Q0HiYCwa4p7s4oIo1fJKbsQZrzHxA-s582qvTEytwP1hWPgnVCGdoMM5S-_hY6n4bRLUpwgZTb3CZsuKGae3tKYoZ_R3PCkCHJdfzcTo8UUEwiGJqj8lKvU9nBaBAq6hH4iRP2pnEejs94WHyq0IscBAbo4j8RTVEe3kwcWGN8wVPJ5KJnnPUSz_AwCAmt7rZGM9FwQvokTzvrpohAlFMhTnMOSfXsZuQ_S4NJy7i-TT-H2VP7XFWmSRTz2f-hJ-PrR8V64w8q47TO83pCQQD_kkRZoIdZm32Xx6rr0ui16aHyHgNQTi__HS3EMWVnvMFIr1q4jp0EveBv3m-b8-FYnTRcBcSXz9CX8ky_in_JvwMqXqfClHXYQCILKm8UIabe4pkZDENXth87sbIMTOBEibvsr0Pyy66uZ3XQelvZLpgk8-F6hFqqns7BtkRHmCe76daNWwDpl0aO6f4mFmxNeCNpiIo2j3iviF5fox77xItYKFfKKm2TaK685VPjdn88QZ2BhNV2GIBHEUcH6Z1rf16LNrBp4anM0JVXKG07d88OM8wFy2PbuDHYJE7QgEnFP_4VlmRrsXFj3lZ7iCT51U_GFaa1Aqp-2W4u7rgoA2cxKimwsueMbPwn4N5_xKFX7BiHa3SgytAIj89qcpikW&isca=1"} name={"TopG wagon"} style={{flex: 1}}>
                </SalonPreviewCard>
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
          height: 244,
          justifyContent: "space-between",
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
        bottom: 0,
        left: 0,
        right: 0,
    },

      navBar: {
        width: '100%', // Utilise toute la largeur du conteneur
        height: 200, // Fixe une hauteur spécifique pour l'image, tu peux ajuster cela en fonction du design
        resizeMode: 'contain', // Assure que l'image conserve ses proportions sans déformation
      },
})