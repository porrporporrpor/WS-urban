import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import { CustomBadge } from '../components';
const AnnouncementCard = ({
  title = 'title',
  subtitle = 'subtitle',
  time = 'time',
  like = 0,
  seen = 0,
  image = 'imagepath',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, paddingVertical: SIZES.base }}
      onPress={onPress}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ height: 200 }}
      >
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 7,
            right: 7,
          }}
        >
          <CustomBadge
            icon="heart"
            value={like}
            size={15}
            color="rgba(255,255,255,0.8)"
          />
          <CustomBadge
            icon="eye"
            value={seen}
            size={15}
            color="rgba(255,255,255,0.8)"
          />
        </View>
      </ImageBackground>
      <View style={{ backgroundColor: COLORS.white, padding: SIZES.radius }}>
        <Text style={{ ...FONTS.body3 }}>{title}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, color: COLORS.gray }}>{subtitle}</Text>
          <Text
            style={{
              flex: 1,
              color: COLORS.gray,
              position: 'absolute',
              right: 0,
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnnouncementCard;
