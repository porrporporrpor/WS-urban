import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { SIZES, COLORS, FONTS, icons } from '../constants';
import { IconRounder } from '../components';
const Social = ({ navigation }) => (
  <Container style={{ backgroundColor: COLORS.lightGray }}>
    <Header style={{ height: 50, backgroundColor: COLORS.white }}>
      <Left>
        <IconRounder
          icon="notifications"
          onPress={() => {
            console.log('การแจ้งเตือน');
          }}
        />
      </Left>
      <Body>
        <Text style={{ ...FONTS.h3, paddingTop: 10 }}>
          เดอะเพลสซิเด้นท์สาทร-ราชพฤกษ์1
        </Text>
        <Text>สมาชิก 443 คน</Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            console.log('search');
          }}
        >
          <Icon name="search" size={27} />
        </Button>
      </Right>
    </Header>
    {/* Tab */}

    <ScrollView>
      <Text>ตั้งค่า</Text>
    </ScrollView>
  </Container>
);

export default Social;
