import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import IconRounder from './IconRounder';

const MenuBlock = ({ icon, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        width: '44%',
        marginTop: SIZES.base * 2,
        padding: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ]}
  >
    <IconRounder icon={icon} onPress={onPress} />
    <Text
      style={{
        flex: 1,
        width: '70%',
        marginLeft: SIZES.radius,
        ...FONTS.body4,
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default MenuBlock;
