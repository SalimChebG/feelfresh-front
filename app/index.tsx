import {StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router"

export default function Index() {
    return (
        <View style={styles.container}>
            <Text> FeelFreshh App </Text>
            <Link href="/about"> A propos de FeelFreshh </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {backgroundColor:'#FF0000', padding: 24}
})
