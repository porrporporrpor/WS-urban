import React from 'react';
import { ScrollView, FlatList, View, Image } from 'react-native';
import { Container, Text, Tab, Tabs, TabHeading, Badge } from 'native-base';
import { COLORS, FONTS, icons } from '../constants';
import { CustomHeader, ParcelBlock } from '../components';
import { parcelAction } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const Parcel = ({ navigation }) => {
  const dispatch = useDispatch();
  const parcelList = useSelector((state) => state.parcelReducer.parcelList);

  const newParcelUnRead = parcelList.filter(
    (parcel) => parcel.collectedOn === undefined && !parcel.markAsRead
  ).length;

  const historyParcelUnRead = parcelList.filter(
    (parcel) => parcel.collectedOn !== undefined && !parcel.markAsRead
  ).length;

  const renderNewParcelItem = ({ item }) => {
    return (
      <ParcelBlock
        key={item.id}
        markAsRead={item.markAsRead}
        ownerParcel={item.ownerParcel}
        addedBy={item.addedBy}
        unitNumber={item.unitNumber}
        addedToSystem={item.addedToSystem}
        onPress={() => {
          console.log(item.markAsRead);
          !item.markAsRead
            ? dispatch(parcelAction.updateMarkAsRead(item.id))
            : {};
          dispatch(parcelAction.getOne(item.id));
          navigation.navigate('ParcelInfo');
        }}
      />
    );
  };
  const renderHistoryParcelItem = ({ item }) => {
    return (
      <ParcelBlock
        key={item.id}
        markAsRead={item.markAsRead}
        ownerParcel={item.ownerParcel}
        addedBy={item.addedBy}
        unitNumber={item.unitNumber}
        addedToSystem={item.addedToSystem}
        onPress={() => {
          !item.markAsRead
            ? dispatch(parcelAction.updateMarkAsRead(item.id))
            : {};
          dispatch(parcelAction.getOne(item.id));
          navigation.navigate('ReceivedParcel');
        }}
      />
    );
  };
  return (
    <Container>
      <CustomHeader
        title="พัสดุท้งหมด"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />

      {/* Tab */}
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: COLORS.primary,
        }}
      >
        <Tab
          heading={
            <TabHeading>
              <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                พัสดุใหม่
              </Text>
              {newParcelUnRead !== 0 ? (
                <Badge style={{ position: 'absolute', right: 41 }}>
                  <Text style={{ ...FONTS.body4 }}>{newParcelUnRead}</Text>
                </Badge>
              ) : (
                <Badge style={{ opacity: 0, position: 'absolute' }} />
              )}
            </TabHeading>
          }
          style={{ backgroundColor: '#f2f2f2' }}
        >
          {/* Parcel list */}
          <FlatList
            data={parcelList.filter(
              (parcel) => parcel.collectedOn === undefined
            )}
            renderItem={renderNewParcelItem}
            keyExtractor={(item) => item.id}
          />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                ประวัติพัสดุ
              </Text>
              {historyParcelUnRead !== 0 ? (
                <Badge style={{ position: 'absolute', right: 35 }}>
                  <Text style={{ ...FONTS.body4 }}>{historyParcelUnRead}</Text>
                </Badge>
              ) : (
                <Badge style={{ opacity: 0, position: 'absolute' }} />
              )}
            </TabHeading>
          }
          style={{ backgroundColor: '#f2f2f2' }}
        >
          {/* History list */}
          <FlatList
            data={parcelList.filter(
              (parcel) => parcel.collectedOn !== undefined
            )}
            renderItem={renderHistoryParcelItem}
            keyExtractor={(item) => item.id}
          />
        </Tab>
      </Tabs>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
        }}
      >
        <Image
          source={icons.home}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: COLORS.primary }}
        />
        <Text style={{ color: COLORS.primary, ...FONTS.body4 }}> URBANICE</Text>
        <Text style={{ ...FONTS.body4 }}> ระบบบริหารพัสดุคอนโดและหมู่บ้าน</Text>
      </View>
    </Container>
  );
};

export default Parcel;
