import {StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function Salon() {
    const params = useLocalSearchParams()
    return <View>
        <Text>Salon TopG {params.id}</Text>
    </View>
    }