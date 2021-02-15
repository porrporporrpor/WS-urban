import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';
import CustomBadge from './CustomBadge';

const ParcelBlock = ({
  markAsRead = false,
  ownerParcel,
  addedBy,
  unitNumber,
  addedToSystem,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.radius,
        marginTop: SIZES.radius,
      }}
      onPress={onPress}
    >
      <View id="parcel-image" style={{ flex: 0.3, height: 60 }}>
        <Image
          source={images.frozenHills}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View
        id="parcel-info"
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.base,
        }}
      >
        <View id="receiver">
          <Text style={{ ...FONTS.body4 }}>
            {ownerParcel}
            {markAsRead ? (
              <View />
            ) : (
              <CustomBadge color="orange" fontColor="white" value="NEW" />
            )}
          </Text>
          <Text style={{ color: COLORS.gray }}>รับโดย {addedBy}</Text>
        </View>
        <View id="timestamp" style={{ alignItems: 'flex-end' }}>
          <Text style={{ ...FONTS.body4 }}>
            {unitNumber}{' '}
            <Image
              source={icons.home}
              style={{ width: 20, height: 20, tintColor: COLORS.primary }}
            />
          </Text>
          <Text style={{ color: COLORS.gray }}>{addedToSystem}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParcelBlock;
