import React from 'react';
import { Header, Title, Button, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants';

const CustomHeader = ({ title, onPress, rightMenu }) => (
  <Header hasTabs style={{ height: 50 }}>
    <Left>
      <Button transparent onPress={onPress}>
        <Icon name="chevron-back-outline" size={34} />
      </Button>
    </Left>
    <Body>
      <Title style={{ ...FONTS.h3, paddingTop: 10 }}>{title}</Title>
    </Body>
    {rightMenu ? (
      <Right>
        <Button transparent onPress={rightMenu}>
          <Icon name="ellipsis-vertical" size={27} color={COLORS.gray} />
        </Button>
      </Right>
    ) : (
      <Right />
    )}
  </Header>
);

export default CustomHeader;
