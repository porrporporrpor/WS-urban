import React from 'react';
import { Text, View } from 'react-native';
import { FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomBadge = ({ icon, size, color, fontColor, value, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        backgroundColor: color,
        marginLeft: SIZES.base,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Icon name={icon} size={size} />
      <Text style={{ color: fontColor, ...FONTS.body4 }}> {value}</Text>
    </TouchableOpacity>
  );
};

export default CustomBadge;
