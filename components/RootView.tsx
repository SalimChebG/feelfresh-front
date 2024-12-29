import  {SafeAreaView} from "react-native-safe-area-context";
import {useThemeColors} from "@/hooks/useThemeColors"
import type {ViewStyle, ViewProps} from "react-native"


type Props = ViewProps

export function RootView ({style, ...rest}: Props){
    const colors = useThemeColors()
    return <SafeAreaView style={[rootStyle, {backgroundColor: colors.background.primary}]} {...rest}/>
    }

const rootStyle = {
                flex: 1,
                padding: 4,
           } satisfies ViewStyle;