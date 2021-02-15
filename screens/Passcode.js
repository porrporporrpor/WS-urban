import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import { Container, Header, Left, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { IconRounder } from '../components';
import * as LocalAuthentication from 'expo-local-authentication';
import { FONTS, COLORS, SIZES, icons } from '../constants';

const Passcode = ({ navigation }) => {
  const { t } = useTranslation();
  const adminPasscode = '000000';
  const [passcode, setPasscode] = useState(['', '', '', '', '', '']);
  const [completePasscode, setCompletePasscode] = useState(0);

  useEffect(() => {
    LocalAuthentication.isEnrolledAsync().then((isSupport) => {
      if (isSupport === true) {
        setTimeout(() => {
          handleAuthenTricker;
        }, 2000);
      }
    });
  }, []);

  const handleAuthenTricker = async () => {
    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enter your device passcode',
    }).then((response) => {
      console.log(response);
      if (response.success !== true) {
        Alert.alert('cannot authen input passcode');
      } else {
        Alert.alert('Success');
      }
    });
    console.log('--------');
  };

  const handlePressDelete = () => {
    if (completePasscode < 0) {
      setCompletePasscode(0);
    } else {
      setCompletePasscode(completePasscode - 1);
      passcode[completePasscode - 1] = '';
      setPasscode(passcode);
    }
  };
  const handlePressNumber = (number) => {
    if (completePasscode + 1 !== 6) {
      passcode[completePasscode] = number;
      setPasscode(passcode);
      setCompletePasscode(completePasscode + 1);
    } else {
      passcode[completePasscode] = number;
      setPasscode(passcode);
      setCompletePasscode(completePasscode + 1);
      let passcodeString = passcode.join('');

      if (adminPasscode === passcodeString) {
        Alert.alert('Success');
      }
      setCompletePasscode(0);
      setPasscode(['', '', '', '', '', '']);
    }
  };
  return (
    <Container>
      <Header hasTabs style={{ height: 50, backgroundColor: COLORS.white }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={34} />
          </Button>
        </Left>
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...FONTS.h2 }}>กรุณาใส่รหัสผ่าน</Text>
          <View style={styles.rowPincode}>
            {passcode.map((code, index) => {
              let styles;
              code !== ''
                ? (styles = {
                    width: 12,
                    height: 12,
                    borderRadius: 360,
                    borderWidth: 1,
                    marginRight: 5,
                    backgroundColor: COLORS.black,
                  })
                : (styles = {
                    width: 12,
                    height: 12,
                    borderRadius: 360,
                    borderWidth: 1,
                    marginRight: 5,
                    backgroundColor: COLORS.white,
                  });
              return <View key={index + 1} style={styles} />;
            })}
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.rowPincode}>
            <IconRounder
              text={1}
              size={65}
              onPress={() => handlePressNumber(1)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={2}
              size={65}
              onPress={() => handlePressNumber(2)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={3}
              size={65}
              onPress={() => handlePressNumber(3)}
              style={{ margin: 10 }}
            />
          </View>
          <View style={styles.rowPincode}>
            <IconRounder
              text={4}
              size={65}
              onPress={() => handlePressNumber(4)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={5}
              size={65}
              onPress={() => handlePressNumber(5)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={6}
              size={65}
              onPress={() => handlePressNumber(6)}
              style={{ margin: 10 }}
            />
          </View>
          <View style={styles.rowPincode}>
            <IconRounder
              text={7}
              size={65}
              onPress={() => handlePressNumber(7)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={8}
              size={65}
              onPress={() => handlePressNumber(8)}
              style={{ margin: 10 }}
            />
            <IconRounder
              text={9}
              size={65}
              onPress={() => handlePressNumber(9)}
              style={{ margin: 10 }}
            />
          </View>
          <View style={styles.rowPincode}>
            <TouchableOpacity onPress={handleAuthenTricker}>
              <Image
                source={icons.faceID}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                  tintColor: COLORS.primary,
                  position: 'relative',
                  right: 20,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
            <IconRounder
              text={0}
              size={65}
              onPress={() => handlePressNumber(0)}
              style={{ margin: 10 }}
            />
            <TouchableOpacity onPress={handlePressDelete}>
              <Icon
                name="close-outline"
                size={65}
                color={COLORS.primary}
                style={{ position: 'relative', left: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  activePasscode: {
    width: 10,
    height: 10,
    borderRadius: 360,
    borderWidth: 1,
    margin: 5,
  },
  rowPincode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
});

export default Passcode;
