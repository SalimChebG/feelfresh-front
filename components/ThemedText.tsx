import {StyleSheet, Text, type TextProps} from "react-native";
//import { Colors } from '@/constants/Colors';
import {useThemeColors} from "@/hooks/useThemeColors"


const styles = StyleSheet.create({
    headline:{fontSize:18, lineHeight:24,fontWeight:'bold',},
    body3:{fontSize:10, lineHeight:16,},
    subtitle2:{fontSize:14, lineHeight:16, fontWeight:'bold',},
    servicefont:{fontSize:12, lineHeight:15,},
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
}

export function ThemedText({ variant, color, style, ...rest }: Props) {
    const colors = useThemeColors()
    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "text"]}, style]} {...rest}/>
}

