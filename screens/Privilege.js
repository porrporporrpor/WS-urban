import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Clipboard,
  View,
  Text,
  Image,
} from 'react-native';
import {
  Root,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Toast,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS, COLORS, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Privilege = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [scanned, setScanned] = useState(false);
  const [codeContent, setCodeContent] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     BarCodeScanner.scanFromURLAsync(image, [
  //       BarCodeScanner.Constants.BarCodeType.qr,
  //     ]);
  //   }
  // };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    codeContent.push({ type: type.split('.')[2], content: data });
    setCodeContent(codeContent);
    let toastText = data;
    if (data.length > 50) {
      toastText = data.substring(0, 50);
      toastText = `${toastText} ...(more)`;
    }
    Toast.show({
      text: toastText,
      buttonText: 'COPY',
      position: 'bottom',
      duration: 300000,
      style: {
        backgroundColor: COLORS.primary,
        maxHeight: 100,
      },
      textStyle: {
        alignContent: 'center',
      },
      onClose: () => copyToClipboard(data),
    });
    setTimeout(() => {
      setScanned(false);
    }, 1500);
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
          <Title style={{ ...FONTS.h3, paddingTop: 10 }}>
            {t('privileges')}
          </Title>
        </Body>
        <Right />
      </Header>
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <View
            style={{
              height: '100%',
              borderWidth: SIZES.width * 0.125,
              borderColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* <TouchableOpacity onPress={pickImage}>
              <Icon name="people" color={COLORS.white} size={40} />
            </TouchableOpacity> */}
            <Text
              style={{
                color: COLORS.white,
                marginTop: '10%',
                textAlign: 'center',
                color: 'white',
                ...FONTS.body2,
              }}
            >
              Scan your QR code
            </Text>
            <View
              style={{
                width: SIZES.width * 0.7,
                height: SIZES.width * 0.7,
              }}
            />
          </View>
        </BarCodeScanner>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {codeContent.map((code, index) => (
          <Text key={index}>
            {code.type} : {code.content}
          </Text>
        ))}
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </ScrollView>
    </Root>
  );
};

export default Privilege;
