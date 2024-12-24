import {FlatList, Platform , Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";
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
        <SafeAreaView style={[styles.container , { backgroundColor: colors.background.primary }]}>
            <Row style={styles.header} gap={120}>
                <ThemedText variant="headline" color="text"> feelFresh </ThemedText>
                <HomeHeader />
            </Row>

            <Row>
                <SearchBar value={search} onChange={setSearch}/>
            </Row>

            

            <Salon style={styles.body}>
                <FlatList
                    data={filteredSalons}
                    numColumns={Platform.OS === 'web' ? 3 : 1}
                    contentContainerStyle={styles.gridGap, styles.list}
                    //columnWrapperStyle={styles.gridGap}
                    columnWrapperStyle={Platform.OS === 'web' ? styles.columnWrapper : null}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color = {colors.secondaryBackground}/> : null
                    }
                    //onEndReached={search ? undefined : ()=> fetchNextPage()}
                    //renderItem={({ item }) => <SalonCard id={getSalonId(item.url)} name={item.name} style={{flex: 1}}/>}
                    renderItem={({ item }) => <SalonCard id={item.images_url} name={item.name} style={{flex: 1}}/>}
                    keyExtractor={(item) => item.url}/>
            </Salon>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        //gap: 16,
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
})
