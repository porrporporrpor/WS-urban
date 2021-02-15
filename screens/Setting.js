import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from 'native-base';
import { COLORS, SIZES, FONTS } from '../constants';
import { IconRounder } from '../components';
import { useTranslation } from 'react-i18next';

const Setting = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('th');
  const changeLanguage = () => {
    if (language === 'th') {
      i18n.changeLanguage('en');
      setLanguage('en');
    } else {
      i18n.changeLanguage('th');
      setLanguage('th');
    }
  };
  return (
    <Container style={{ backgroundColor: COLORS.lightgray }}>
      <Header style={{ height: 50, backgroundColor: COLORS.white }}>
        <Left />
        <Body>
          <Title style={{ ...FONTS.h3, paddingTop: 10 }}>{t('settings')}</Title>
        </Body>
        <Right />
      </Header>
      {/* Tab */}

      <ScrollView>
        <List style={{ backgroundColor: COLORS.white }}>
          <ListItem itemDivider style={{ backgroundColor: COLORS.white }}>
            <Text style={{ ...FONTS.h4 }}>{t('settings')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              navigation.navigate('UpdateProfile', {
                userID: 1,
              });
            }}
          >
            <IconRounder icon="person-outline" size={15} />
            <Text> {t('personalInformation')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('ล้างการแจ้งเตือน');
            }}
          >
            <IconRounder icon="trash-outline" size={15} />
            <Text> {t('markAsRead')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('การแจ้งเตือน');
            }}
          >
            <IconRounder icon="notifications-outline" size={15} />
            <Text> {t('notifications')}</Text>
          </ListItem>
        </List>

        <List
          style={{ backgroundColor: COLORS.white, marginTop: SIZES.padding }}
        >
          <ListItem itemDivider style={{ backgroundColor: COLORS.white }}>
            <Text style={{ ...FONTS.h4 }}>{t('appUsage')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('คำถามที่พบบ่อย');
            }}
          >
            <IconRounder icon="help-outline" size={15} />
            <Text> {t('FAQ')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              changeLanguage();
            }}
          >
            <IconRounder icon="language-outline" size={15} />
            <Text> {t('languages')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('นโยบายความเป็นส่วนตัว');
            }}
          >
            <IconRounder icon="shield-checkmark-outline" size={15} />
            <Text> {t('privacyPolicy')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('เงื่อนไขการใช้บริการ');
            }}
          >
            <IconRounder icon="document-outline" size={15} />
            <Text> {t('terms')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('ข้อเสนอแนะ');
            }}
          >
            <IconRounder icon="happy-outline" size={15} />
            <Text> {t('terms')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('ติดต่อ Urbanice');
            }}
          >
            <IconRounder icon="home-outline" size={15} />
            <Text> {t('contactUs')}</Text>
          </ListItem>
          <ListItem
            style={{ height: 45 }}
            onPress={() => {
              console.log('ออกจากระบบ');
            }}
          >
            <IconRounder icon="log-out-outline" size={15} />
            <Text> {t('logout')}</Text>
          </ListItem>
        </List>

        <View style={{ alignItems: 'center', margin: SIZES.padding * 2 }}>
          <Text>version 3.5.0-14</Text>
          <Text>2021 Urbanice.app all rights reserved</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Setting;
