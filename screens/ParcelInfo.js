import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Container, Left, Body, List, ListItem } from 'native-base';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { CustomHeader } from '../components';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  border: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SIZES.radius,
    alignItems: 'center',
  },
});

const QRCodeRender = ({ size, value }) => {
  const QRContent = `parcelID : ${value}`;
  console.log(QRContent);
  return (
    <QRCode
      value={QRContent}
      size={size}
      color={COLORS.black}
      backgroundColor="white"
    />
  );
};
const CustomListItem = ({ title, value }) => (
  <ListItem style={{ height: 50 }}>
    <Left>
      <Text>{title}</Text>
    </Left>
    <Body style={{ alignItems: 'flex-end' }}>
      <Text style={{ ...FONTS.body4 }}>{value}</Text>
    </Body>
  </ListItem>
);
const ParcelInfo = ({ navigation }) => {
  const [modalQRVisible, setModalQRVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const parcelInfo = useSelector((state) => state.parcelReducer.parcelInfo);
  console.log(parcelInfo);
  return (
    <Container>
      <CustomHeader
        title={'พัสดุ ' + parcelInfo.name}
        onPress={() => {
          navigation.navigate('Parcel');
        }}
      />

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            paddingTop: SIZES.padding,
          }}
        >
          {/* Half Background */}
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS.primary,
              width: SIZES.width,
              height: SIZES.height / 2,
              zIndex: -1,
            }}
          />
          {/* QRCode */}
          <View
            id="qr-section"
            style={{ flexDirection: 'row', alignItems: 'flex-end' }}
          >
            <View id="qr-render" style={styles.border}>
              <QRCodeRender size={150} value={parcelInfo.id} />
              {/* QRModal */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalQRVisible}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.border}>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        paddingBottom: SIZES.radius,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setModalQRVisible(!modalQRVisible);
                        }}
                      >
                        <Icon name="close" size={32} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ margin: 20 }}>
                      <QRCodeRender size={270} value={parcelInfo.id} />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableOpacity
              id="zoom-qr"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                marginBottom: 15,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.radius * 2,
                alignItems: 'center',
              }}
              onPress={() => {
                setModalQRVisible(true);
              }}
            >
              <Icon name="ios-search" color={COLORS.primary} size={25} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              paddingVertical: SIZES.padding,
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            นำ QR code ให้เจ้าหน้าที่สแกน เพื่อรับพัสดุ
          </Text>

          <View id="parcel-info" style={styles.border}>
            {/* Image */}
            <View id="image-section">
              {/* ImageModel */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalImageVisible}
              >
                <SafeAreaView
                  style={{
                    backgroundColor: COLORS.black,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      top: 20,
                      left: 20,
                      zIndex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setModalImageVisible(!modalImageVisible);
                      }}
                    >
                      <Icon
                        name="close-circle"
                        color={COLORS.white}
                        size={40}
                      />
                    </TouchableOpacity>
                  </View>

                  <Image
                    source={images.frozenHills}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </SafeAreaView>
              </Modal>

              <TouchableOpacity onPress={() => setModalImageVisible(true)}>
                <Image
                  source={images.frozenHills}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width - 50,
                    height: SIZES.height / 6,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* Parcel Description */}
            <View
              style={{
                alignItems: 'center',
                paddingTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.h3 }}>ข้อมูลพัสดุ</Text>
              <List style={{ width: SIZES.width - 50 }}>
                <CustomListItem
                  title="บ้านเลขที่"
                  value={parcelInfo.unitNumber}
                />
                <CustomListItem
                  title="ชื่อเจ้าของพัสดุ"
                  value={parcelInfo.ownerParcel}
                />
                <CustomListItem
                  title="หมายเลขติดตามพัสดุ"
                  value={parcelInfo.trackingNumber}
                />
                <CustomListItem
                  title="บริการขนส่ง"
                  value={parcelInfo.deliveryService}
                />
                <CustomListItem
                  title="ลักษณะพัสดุ"
                  value={parcelInfo.parcelType}
                />
                <CustomListItem
                  title="เข้าระบบเมื่อ"
                  value={parcelInfo.addedToSystem}
                />
                <CustomListItem
                  title="นำเช้าระบบโดย"
                  value={parcelInfo.deliveryService}
                />
              </List>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: SIZES.width,
          height: SIZES.height,
          opacity: 0.3,
          zIndex: modalQRVisible ? 1 : -1,
          backgroundColor: COLORS.black,
        }}
      />
    </Container>
  );
};

export default ParcelInfo;
