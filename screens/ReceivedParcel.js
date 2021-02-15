import React, { useState, createRef } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Container, Left, Body, List, ListItem } from 'native-base';
import { COLORS, FONTS, images, SIZES, icons } from '../constants';
import { CustomHeader, MenuBlock } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { parcelAction } from '../actions';
const styles = StyleSheet.create({
  border: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SIZES.radius,
    alignItems: 'center',
  },
});

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
const actionSheetRef = createRef();

const ReceivedParcel = ({ navigation }) => {
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const dispatch = useDispatch();
  const parcelInfo = useSelector((state) => state.parcelReducer.parcelInfo);
  console.log(parcelInfo);
  return (
    <Container>
      <CustomHeader
        title={'พัสดุ ' + parcelInfo.name}
        onPress={() => {
          navigation.navigate('Parcel');
        }}
        rightMenu={() => {
          actionSheetRef.current?.setModalVisible();
        }}
      />
      {/* Modal */}
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: SIZES.width,
            backgroundColor: COLORS.white,
            paddingHorizontal: SIZES.base,
            paddingVertical: SIZES.padding,
          }}
        >
          <MenuBlock
            icon="trash-outline"
            label="ลบประวัติพัสดุ"
            onPress={() => {
              console.log('start delete button');
              dispatch(parcelAction.clearHistory(parcelInfo.id));
              navigation.navigate('Parcel');
            }}
          />
        </View>
      </ActionSheet>

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
              height: 200,
              zIndex: -1,
            }}
          />

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
                <ImageBackground
                  source={images.frozenHills}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width - 50,
                    height: SIZES.height / 6,
                    borderRadius: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      paddingVertical: SIZES.radius,
                      position: 'absolute',
                      bottom: 0,
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body2,
                      }}
                    >
                      พัสดุรับแล้ว
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            {/* Received Parcel Info */}
            <View
              id="received-parcel-description"
              style={{
                alignItems: 'center',
                paddingTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.h3 }}>รายละเอียดการรับพัสดุ</Text>
              <List style={{ width: SIZES.width - 50 }}>
                <CustomListItem
                  title="รับพัสดุเมื่อ"
                  value={parcelInfo.collectedOn}
                />
                <CustomListItem
                  title="ชื่อผู้มารับพัสดุ"
                  value={parcelInfo.collectedBy}
                />
                <CustomListItem
                  title="จ่ายพัสดุออกโดย"
                  value={parcelInfo.releasedBy}
                />
              </List>
            </View>

            {/* Parcel Description */}
            <View
              id="parcel-description"
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
                  value={parcelInfo.addedBy}
                />
              </List>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ReceivedParcel;
