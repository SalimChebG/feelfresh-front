/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#010405',
    tint: tintColorLight,
    icon: '#787076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#000',
    textHolder:'#A0A0A0',
    primary: '#be2f7a',
    secondary: '#4CAF50',
    blue: '#235AFF',
    white: '#FFFFFF',


    tint: tintColorDark,
    icon: '#1BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    background: {
        primary: '#F6F8FF',
        secondary: '#FFF',
        tertiary: '#F5F5F5',
      },
  },
}
;
