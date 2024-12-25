import {StyleSheet, Text, type TextProps} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors"


const styles = StyleSheet.create({
    headline:{fontSize:18, fontFamily: 'Inter',fontWeight:'semi-bold',},
    subtitle1:{fontSize:12, fontWeight:'medium',},
    subtitle2:{fontSize:16, fontWeight:'medium',},
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
}

export function ThemedText({ variant, color, style, ...rest }: Props) {
    const colors = useThemeColors()
    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "text"]}, style]} {...rest}/>
}

