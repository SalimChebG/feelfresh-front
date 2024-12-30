import  {SafeAreaView} from "react-native-safe-area-context";
import {useThemeColors} from "@/hooks/useThemeColors"
import { Platform, View, Image, type ViewProps, type ViewStyle, StyleSheet } from "react-native";


type Props = ViewProps

export function RootView ({style, ...rest}: Props){
    const colors = useThemeColors()
    return <SafeAreaView style={[rootStyle, {backgroundColor: colors.background.primary}]} {...rest}/>
    }

const rootStyle = {
                flex: 1,
                padding: 4,
                //marginBottom: Platform.OS === "web" ? 30 : 0, // Add margin for web version for better positioning
           } satisfies ViewStyle;