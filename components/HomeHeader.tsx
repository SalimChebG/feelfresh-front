import {View, type ViewProps, type ViewStyle} from "react-native";
import {Shadows} from "@/constants/Shadows";
import {useThemeColors} from "@/hooks/useThemeColors"
type Props = ViewProps

export function Salon({ style, ...rest }: Props) {
    const colors = useThemeColors()
  return <View style={[style, styles, {backgroundColor: colors.icon}]} {...rest} />
}

const styles = {
    borderRadius: 8,
    ...Shadows.dp2
} satisfies ViewStyle