import {type ViewProps, Platform, ViewStyle, View} from "react-native";

type Props = ViewProps & {
        gap?: number
    };

export function Row ({style, gap, ...rest}: Props) {
        return (
            <View style={[rowStyle, style, gap ? {gap: gap} : undefined]} {...rest} />
        );
    };

const rowStyle = {
        flex: Platform.OS === 'web' ? 1 : 0,
        flexDirection: 'Row',
        alignItems: "center",
        justifyContent: "space-between",
    } satisfies ViewStyle;