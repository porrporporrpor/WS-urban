import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { parcelAction } from '../actions';
import { images, SIZES, COLORS, FONTS, icons } from '../constants';
import { CustomBadge, MenuBlock } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';

const Home = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const paymentSpeak = () => {
    let option = { language: 'th-TH', rate: 1.2 };
    let speakText = 'จ่ายค่าเช่าด้วยจ้า';
    if (i18n.language === 'en') {
      option = { language: 'en-US', rate: 1.1 };
      speakText = 'Jai kar chao duey ja';
    }

    Speech.speak(speakText, option);
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View
        style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}
      >
        <ImageBackground
          source={images.condoBanner}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Change Project */}
          <View
            style={{
              position: 'absolute',
              top: 40,
              right: 0,
              padding: SIZES.padding,
            }}
          >
            <TouchableOpacity
              onPress={() => console.log('เปลี่ยนชุมนุม')}
              style={{
                padding: SIZES.radius,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 25,
              }}
            >
              <Text style={{ color: COLORS.white }}>
                เปลี่ยนชุมนุม
                <Icon name="log-in-outline" color={COLORS.white} size={20} />
              </Text>
            </TouchableOpacity>
          </View>
          {/* Project Description */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              padding: SIZES.padding,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                textShadowColor: COLORS.black,
                textShadowOffset: {
                  width: 1,
                  height: 1,
                },
                textShadowRadius: 5,
                fontSize: SIZES.h1,
                ...FONTS.body1,
              }}
              onPress={() => console.log('room')}
            >
              299/141
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textShadowColor: COLORS.black,
                textShadowOffset: {
                  width: 1,
                  height: 1,
                },
                textShadowRadius: 5,
                fontSize: SIZES.h3,
                ...FONTS.body3,
              }}
            >
              เดอะ เพรสซิเด้นท์สาทร-ราชพฤกษ์1
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: COLORS.white,
                  textShadowColor: COLORS.black,
                  textShadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  textShadowRadius: 5,
                  fontSize: SIZES.h3,
                  ...FONTS.body3,
                }}
              >
                29.4°C
              </Text>
              <CustomBadge
                value="AQI 65"
                size={15}
                color="#ff9933"
                onPress={() => {
                  console.log('AQI');
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* Menu */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          <MenuBlock
            icon="newspaper-outline"
            label={t('payments')}
            onPress={paymentSpeak}
          />
          <MenuBlock
            icon="cube-outline"
            label={t('parcels')}
            onPress={() => {
              dispatch(parcelAction.getAll());
              navigation.navigate('Parcel');
            }}
          />
          <MenuBlock
            icon="barbell-outline"
            label={t('facility')}
            onPress={() => navigation.navigate('Facility')}
          />
          <MenuBlock
            icon="home-outline"
            label={t('rooms')}
            onPress={() => navigation.navigate('Passcode')}
          />
          <MenuBlock
            icon="book-outline"
            label={t('phoneBook')}
            onPress={() => navigation.navigate('TranslateChat')}
          />
          <MenuBlock
            icon="chatbox-ellipses-outline"
            label={t('property')}
            onPress={() => navigation.navigate('FaceTracking')}
          />
          <MenuBlock
            icon="leaf-outline"
            label={t('privileges')}
            onPress={() => navigation.navigate('Privillage')}
          />
          {/* Hack last row of flex wrap */}
          <View style={{ width: '45%' }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;
