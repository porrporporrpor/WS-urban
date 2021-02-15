import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#279FA1',
  lightPrimary: '#DFF6F2',
  secondary: '#cacfd9',

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#eff2f5',
  gray: '#8b9097',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 18,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: 'Prompt_900Black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'Prompt_900Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Prompt_700Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Prompt_700Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Prompt_700Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Prompt_500Medium',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Prompt_500Medium',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Prompt_500Medium',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Prompt_500Medium',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
