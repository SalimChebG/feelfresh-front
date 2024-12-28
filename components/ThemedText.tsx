import {StyleSheet, Text, type TextProps} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors"


const styles = StyleSheet.create({
    headline:{fontSize:18, fontFamily: 'Inter',fontWeight:'semi-bold',},
    headline2:{fontSize:22, fontFamily: 'Inter', fontWeight:'bold',},
    subtitle1:{fontSize:12, fontWeight:'medium',},
    subtitle2:{fontSize:16, fontWeight:'medium',},
    textstyle1:{fontSize:14, fontFamily: 'Inter', fontWeight:'regular',},
    textstyle2:{fontSize:14, fontFamily: 'Inter', fontWeight:'medium',},
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
}

export function ThemedText({ variant, color, style, ...rest }: Props) {
    const colors = useThemeColors()
    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "text"]}, style]} {...rest}/>
}

