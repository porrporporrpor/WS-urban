import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const IconRounder = ({ icon, text = '', size = 25, onPress, style }) => {
  const customStyle = style;
  return (
    <TouchableOpacity
      style={{
        width: size + 15,
        height: size + 15,
        backgroundColor: COLORS.lightPrimary,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
        ...customStyle,
      }}
      onPress={onPress}
    >
      {text.length === 0 ? (
        <Icon name={icon} color={COLORS.primary} size={size} />
      ) : (
        <Text
          style={
            text.length > 2
              ? { color: COLORS.primary, ...FONTS.body4 }
              : { color: COLORS.primary, ...FONTS.body2 }
          }
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconRounder;
