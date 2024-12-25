import { Pressable, StyleSheet, ViewStyle, Image } from "react-native";
import { Salon } from "@/components/Salon";
import { ThemedText } from "@/components/ThemedText";
import {Link} from "expo-router"
import {useThemeColors} from "@/hooks/useThemeColors"

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function SalonCard({ style, id, name }: Props) {
    const colors = useThemeColors()
    console.log('++++++++++++++++++++++++:', id);
    return <Link href={{pathname: "/salons/[id]", params: {id: id}}} asChild>
        <Pressable android_ripple={{color: colors.secondaryBackground, foreground: true}} style={style}>
            <Salon style={[ styles.salon]} >
                  <Image
                    source={{
                      //uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,

                      uri: `${id}`,
                    }}
                    style={{ width: 450, height: 200 }} // Utilisation de `style` pour spécifier les dimensions
                  />
              <ThemedText>{name}</ThemedText>

            </Salon>
        </Pressable>
    </Link>
}


const styles = StyleSheet.create({
    salon: {
        alignItems: 'center',
        padding: 40
        },

    id: {
         alignSelf: 'flex-end'
    }
    })
