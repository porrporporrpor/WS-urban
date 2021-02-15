import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import {
  Root,
  ActionSheet,
  Header,
  Body,
  Left,
  Right,
  Title,
  Thumbnail,
  Item,
  Input,
  Button,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../actions';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import { FONTS, COLORS } from '../constants';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BUTTONS = ['Take Photo', 'Choose from Library', 'Cancel'];
const CANCEL_INDEX = BUTTONS.length - 1;

const UpdateProfile = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const userID = route.params.userID;
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(userAction.getOne(userID));
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(userInfo);
    setFirstname(userInfo.firstname);
    setLastname(userInfo.lastname);
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const updateUserInfoValidationSchema = Yup.object().shape({
    firstname: Yup.string().required('โปรดระบุชื่อของคุณ'),
    lastname: Yup.string().required('โปรดระบุนามสกุลของคุณ'),
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(userAction.getOne(userID));
    setRefreshing(false);
  }, []);
  const pickImage = async (pickerType) => {
    let result;

    switch (pickerType) {
      case 'camera':
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        break;

      default:
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        break;
    }
    console.log(result);

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };
  const handleUpdateImage = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: 'Change Profile Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('Open camera');
            pickImage('camera');
            break;
          case 1:
            console.log('Open gellery');
            pickImage('gallery');
            break;
          default:
            break;
        }
      }
    );
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
            {t('personalInformation')}
          </Title>
        </Body>
        <Right />
      </Header>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Formik
            enableReinitialize
            validationSchema={updateUserInfoValidationSchema}
            initialValues={{ firstname: firstname, lastname: lastname }}
            onSubmit={(values) => {
              dispatch(
                userAction.updateUserProfile(1, {
                  avatar: avatar,
                  firstname: values.firstname,
                  lastname: values.lastname,
                })
              );
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View
                style={{
                  marginHorizontal: 30,
                  marginTop: 30,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity onPress={handleUpdateImage}>
                  <Thumbnail
                    style={{ width: 100, height: 100, borderRadius: 360 }}
                    source={{
                      uri: avatar,
                    }}
                  />
                </TouchableOpacity>

                <Item
                  success={errors.firstname === undefined}
                  error={errors.firstname !== undefined}
                >
                  <Icon
                    name="person-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Input
                    placeholder="ชื่อ"
                    name="firstname"
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                  />
                  {errors.firstname === undefined ? (
                    <Icon
                      name="checkmark-circle"
                      size={20}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Text />
                  )}
                </Item>
                {errors.firstname && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'red',
                    }}
                  >
                    {errors.firstname}
                  </Text>
                )}
                <Item
                  success={errors.lastname === undefined}
                  error={errors.lastname !== undefined}
                >
                  <Icon
                    name="person-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Input
                    placeholder="นามสกุล"
                    name="lastname"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                  />
                  {errors.lastname === undefined ? (
                    <Icon
                      name="checkmark-circle"
                      size={20}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Text />
                  )}
                </Item>
                {errors.lastname && (
                  <Text style={{ fontSize: 12, color: 'red' }}>
                    {errors.lastname}
                  </Text>
                )}
                <Text
                  style={{
                    marginVertical: 30,
                    color: COLORS.gray,
                  }}
                >
                  กรุณาใช้ชื่อนามสกุลจริง เพื่อให้นิติแจ้งเตือนพัสดุได้ถูกต้อง
                </Text>
                <Button
                  full
                  style={
                    !isValid
                      ? { backgroundColor: COLORS.gray }
                      : { backgroundColor: COLORS.primary }
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body3,
                    }}
                  >
                    ยืนยัน
                  </Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Root>
  );
};

export default UpdateProfile;
