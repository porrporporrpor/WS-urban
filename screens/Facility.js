import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Clipboard, View, Text } from 'react-native';
import {
  Root,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Toast,
  Content,
  Item,
  Input,
  Picker,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS, COLORS, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';
import { qrAction } from '../actions';
import moment from 'moment';
import axios from 'axios';

const Facility = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [scanned, setScanned] = useState(false);
  const [codeContent, setCodeContent] = useState([]);
  const [cjihao, setCjihao] = useState('');
  const [mjihao, setMjihao] = useState('');
  const [status, setStatus] = useState(undefined);
  const [startCapture, setStartCapture] = useState(false);

  useEffect(() => {
    (async () => {
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(false);
    setStartCapture(false);
    // codeContent.push({ type: type.split('.')[2], content: data });
    // qrAction.scan(cjihao, mjihao, data, status, moment().unix());
    const LOCAL_API_URL = 'vms-local.thssoft.com';
    let time = moment().unix();
    await axios
      .get(
        `https://${LOCAL_API_URL}/qa/mcardsea.php?cjihao=${cjihao}&mjihao=${mjihao}&cardid=${data}&status=${status}&time=${time}`
      )
      .then((res) => {
        console.log('success call local-api');
        Toast.show({
          text: 'success call local-api',
          buttonText: 'OK',
          position: 'bottom',
          duration: 300000,
          style: {
            backgroundColor: COLORS.primary,
            maxHeight: 100,
          },
          textStyle: {
            alignContent: 'center',
          },
        });
      });
  };

  return (
    <Root style={{ backgroundColor: COLORS.white }}>
      <Header hasTabs style={{ height: 50, backgroundColor: COLORS.white }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={34} />
          </Button>
        </Left>
        <Body>
          <Title style={{ ...FONTS.h3, paddingTop: 10 }}>{t('facility')}</Title>
        </Body>
        <Right />
      </Header>
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={startCapture ? handleBarCodeScanned : undefined}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Item regular>
          <Input
            placeholder="Enter cjihao (device serial number)"
            onChangeText={(text) => setCjihao(text)}
            value={cjihao}
          />
        </Item>
        <Item regular>
          <Input
            placeholder="Enter mjihao (device number)"
            onChangeText={(text) => setMjihao(text)}
            value={mjihao}
          />
        </Item>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: SIZES.width - 20 }}
            placeholder="Select status"
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => {
              itemValue === 'Elevator' ? setStatus(11) : setStatus(itemValue);
            }}
          >
            <Picker.Item label="Gate IN" value={10} />
            <Picker.Item label="Gate OUT" value={11} />
            <Picker.Item label="Elevator" value="elevator" />
          </Picker>
        </Item>
      </View>
      {cjihao !== '' && mjihao !== '' && status !== undefined ? (
        <Button
          full
          style={{
            position: 'absolute',
            bottom: 0,
            width: SIZES.width,
            height: 90,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => {
            scanned ? setStartCapture(false) : setStartCapture(true);
          }}
        >
          <Text style={{ ...FONTS.h3 }}>SCAN</Text>
        </Button>
      ) : (
        <Button
          full
          disabled
          style={{
            position: 'absolute',
            bottom: 0,
            width: SIZES.width,
            height: 90,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>SCAN</Text>
        </Button>
      )}
    </Root>
  );
};

export default Facility;
