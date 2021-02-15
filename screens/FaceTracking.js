import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { Root, Header, Body, Left, Right, Title, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS, COLORS, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import moment from 'moment';

const FaceTracking = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [capture, setCapture] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [startCountdown, setStartCountdown] = useState(false);
  const [camera, setCamera] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState('');
  const [takedPhoto, setTakedPhoto] = useState(false);

  useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
    })();
  }, []);

  const takeAPhoto = async () => {
    console.log('---take--------');
    let photo = await camera.takePictureAsync({
      base64: true,
    });
    setPhoto(photo.base64);
    setTakedPhoto(true);
  };

  const handleFacesDetected = (event) => {
    if (capture === true) {
      var n = moment().format();
      if (event.faces.length !== 0) {
        let left = event.faces[0].leftEyePosition;
        let right = event.faces[0].rightEyePosition;
        let mouth = event.faces[0].leftMouthPosition;
        if (left.y > 140 && mouth.y < 480) {
          takeAPhoto();
        } else {
          Alert.alert('Try again');
        }
      }

      setCapture(false);
    }
  };

  const handleFlipCamera = () =>
    cameraType === Camera.Constants.Type.front
      ? setCameraType(Camera.Constants.Type.back)
      : setCameraType(Camera.Constants.Type.front);

  useEffect(() => {
    if (startCountdown === true && countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setStartCountdown(false);
      setCountdown(3);
      setCapture(true);
    }
  }, [startCountdown, countdown]);

  return (
    <Root style={{ backgroundColor: COLORS.white }}>
      <Header hasTabs style={{ height: 50, backgroundColor: COLORS.white }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={34} />
          </Button>
        </Left>
        <Body>
          <Title style={{ ...FONTS.h3, paddingTop: 10 }}>{t('property')}</Title>
        </Body>
        <Right />
      </Header>
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => {
            setCamera(ref);
          }}
          style={{ flex: 0.9, justifyContent: 'center' }}
          type={cameraType}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 1000,
            tracking: true,
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: 20,
              justifyContent: 'center',
            }}
            onPress={handleFlipCamera}
          >
            <Icon
              name="camera-reverse-outline"
              color={COLORS.white}
              size={32}
            />
          </TouchableOpacity>

          <View
            style={{
              width: SIZES.width - 50,
              height: SIZES.width - 50,
              backgroundColor: 'transparent',
              borderColor: COLORS.primary,
              borderWidth: 2,
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                position: 'absolute',
                left: 95,
                top: 170,
              }}
            >
              EYE(L)
            </Text>

            <Text
              style={{
                color: COLORS.white,
                position: 'absolute',
                right: 95,
                top: 170,
              }}
            >
              EYE(R)
            </Text>
            <Text
              style={{
                color: COLORS.white,
                position: 'absolute',
                bottom: 60,
                alignSelf: 'center',
              }}
            >
              MOUTH
            </Text>
            {takedPhoto ? (
              <Image
                source={{ uri: `data:image/jpg;base64,${photo}` }}
                style={{
                  width: SIZES.width - 54,
                  height: SIZES.width - 54,
                  position: 'absolute',
                  alignContent: 'center',
                  zIndex: 10,
                  transform: [{ scaleX: -1 }],
                }}
              />
            ) : (
              <View />
            )}
          </View>
          {startCountdown ? (
            <Text
              style={{
                position: 'absolute',
                fontSize: 250,
                color: COLORS.white,
                alignSelf: 'center',
              }}
            >
              {countdown}
            </Text>
          ) : (
            <Text />
          )}
        </Camera>
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
            setTakedPhoto(false);
            console.log(takedPhoto);
            setStartCountdown(true);
          }}
        >
          {takedPhoto ? (
            <Text style={{ ...FONTS.h3 }}>RETAKE</Text>
          ) : (
            <Text style={{ ...FONTS.h3 }}>CAPTURE</Text>
          )}
        </Button>
      </View>
    </Root>
  );
};

export default FaceTracking;
