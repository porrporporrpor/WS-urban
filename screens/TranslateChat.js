import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Item,
  Input,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { IconRounder } from '../components';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { FONTS, COLORS, SIZES, icons } from '../constants';
import moment from 'moment';
const TranslateChat = ({ navigation }) => {
  const mockMessage = [
    {
      id: 1,
      userID: 'u01',
      message: 'โหล 12 โหล',
      status: 'Read',
      type: 'text',
      timestamp: '2021-01-27 10:16:00.538274',
    },
    {
      id: 2,
      userID: 'u02',
      message: 'ว่าไง',
      status: 'Read',
      type: 'text',
      timestamp: '2021-01-27 10:17:00.538274',
    },
    {
      id: 3,
      userID: 'u02',
      message: 'มีไร',
      status: 'Read',
      type: 'text',
      timestamp: '2021-01-29 10:17:01.538274',
    },
    {
      id: 4,
      userID: 'u02',
      message: icons.speechBubble,
      status: 'Read',
      type: 'sticker',
      timestamp: '2021-01-29 10:17:01.538274',
    },
    {
      id: 5,
      userID: 'u01',
      message:
        'ลองพิมพ์ good morning เทสดูว่าได้มั้ย กับพิมพ์ยาวๆ เกินหลายบรรทัดงี้',
      status: 'Read',
      type: 'text',
      timestamp: '2021-01-29 10:18:01.538274',
    },
  ];
  const stickerList = [
    {
      id: 1,
      list: [
        icons.bookmark,
        icons.bus,
        icons.compass,
        icons.eat,
        icons.event,
        icons.home,
        icons.search,
        icons.starEmpty,
        icons.starFull,
        icons.starHalf,
      ],
    },
    {
      id: 2,
      list: [
        icons.parking,
        icons.taxi,
        icons.train,
        icons.user,
        icons.villa,
        icons.wind,
        icons.movieTicket,
        icons.speechBubble,
        icons.box,
        icons.bill,
        icons.faceID,
      ],
    },
  ];

  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [targetMessage, setTargetMessage] = useState(mockMessage);
  const { t, i18n } = useTranslation();
  const [isTyping, setIsTyping] = useState(false);
  const [showSticker, setShowSticker] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(undefined);
  const [voice, setVoice] = useState();
  const [soundObj, setSoundObj] = useState();
  const [textMessage, setTextMessage] = useState();
  const [scrollView, setScrollView] = useState();
  const handleTextSpeak = (text) => {
    Speech.stop();
    Speech.speak(text, { language: 'th-TH', rate: 1.1 });
  };

  const clearShowing = () => {
    Keyboard.dismiss();
    setShowSticker(false);
    setShowRecording(false);
  };
  const handleShowSticker = () => {
    setShowRecording(false);
    Keyboard.dismiss();
    showSticker ? setShowSticker(false) : setShowSticker(true);
  };
  const handleShowRecording = () => {
    setShowSticker(false);
    Keyboard.dismiss();
    showRecording ? setShowRecording(false) : setShowRecording(true);
  };

  const startRecording = async () => {
    setIsRecording(true);
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };
  const stopRecording = async () => {
    setIsRecording(false);
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored');
    targetMessage.push({
      id: moment.now(),
      userID: 'u02',
      message: uri,
      status: 'Unread',
      type: 'voice',
      timestamp: moment.now(),
    });
    setTargetMessage(targetMessage);
    setVoice(uri);
  };
  const playSound = async () => {
    await stopSound();
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: voice });

    setSoundObj(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  };
  const stopSound = async () => {
    if (soundObj !== undefined) {
      await soundObj.stopAsync();
    }
  };
  const sentMessage = (text, messageType) => {
    if (text !== undefined) {
      targetMessage.push({
        id: moment.now(),
        userID: 'u02',
        message: text,
        status: 'Unread',
        type: messageType,
        timestamp: moment.now(),
      });
      setTargetMessage(targetMessage);
      setTextMessage();
      forceUpdate();
      console.log(targetMessage);
    }
    scrollView.scrollToEnd({ animated: true });
  };
  return (
    <Container>
      <Header hasTabs style={{ height: 50, backgroundColor: COLORS.white }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Speech.stop();
              stopSound();
              navigation.goBack();
            }}
          >
            <Icon name="chevron-back-outline" size={34} />
          </Button>
        </Left>
        <Body>
          <Title style={{ ...FONTS.h3, paddingTop: 10 }}>
            {t('phoneBook')}
          </Title>
        </Body>
        <Right />
      </Header>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={(ref) => {
            setScrollView(ref);
          }}
          onTouchStart={clearShowing}
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}
        >
          {targetMessage.map((item) => {
            return (
              <View key={item.id}>
                {item.userID === 'u01' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}
                  >
                    <IconRounder text="u" />
                    <View>
                      {item.type === 'sticker' && (
                        <Image
                          source={item.message}
                          style={{
                            width: 70,
                            height: 70,
                            margin: 20,
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.targetMessageBox}>
                      {item.type === 'text' && (
                        <Text key={item.id} style={{ color: COLORS.black }}>
                          {item.message}
                        </Text>
                      )}
                      {item.type === 'voice' && (
                        <TouchableOpacity onPress={playSound}>
                          <Text>
                            <Icon name="play-circle" size={20} />
                            <Icon name="pulse" size={20} />
                            <Icon name="pulse" size={20} />
                            <Icon name="pulse" size={20} />
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => handleTextSpeak(item.message)}
                    >
                      <Icon name="volume-low" size={20} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 12 }}>
                      {moment(item.timestamp).format('LT')}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      alignItems: 'flex-end',
                    }}
                  >
                    <View>
                      {item.type === 'sticker' && (
                        <Image
                          source={item.message}
                          style={{
                            width: 70,
                            height: 70,
                            margin: 20,
                          }}
                        />
                      )}
                    </View>
                    {item.type === 'text' && (
                      <View style={styles.selfMessageBox}>
                        <Text key={item.id} style={{ color: COLORS.black }}>
                          {item.message}
                        </Text>
                      </View>
                    )}

                    {item.type === 'voice' && (
                      <View style={styles.selfMessageBox}>
                        <TouchableOpacity onPress={playSound}>
                          <Text>
                            <Icon name="play-circle" size={20} />
                            <Icon name="pulse" size={20} />
                            <Icon name="pulse" size={20} />
                            <Icon name="pulse" size={20} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={{ alignItems: 'flex-end' }}>
                      {item.status === 'Read' ? (
                        <Text style={{ fontSize: 12 }}>{item.status}</Text>
                      ) : (
                        <Text />
                      )}
                      <Text style={{ fontSize: 12 }}>
                        {moment(item.timestamp).format('LT')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <SafeAreaView
          style={{
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {isTyping ? (
              <TouchableOpacity onPress={() => setIsTyping(false)}>
                <Icon
                  name="chevron-forward-outline"
                  size={35}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity>
                  <Icon name="add-outline" size={35} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="camera-outline" size={30} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="image-outline" size={30} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            )}

            <Item
              rounded
              style={
                isTyping
                  ? {
                      width: SIZES.width * 0.75,
                      height: SIZES.height * 0.04,
                      backgroundColor: COLORS.lightPrimary,
                    }
                  : {
                      width: SIZES.width * 0.6,
                      height: SIZES.height * 0.04,
                      backgroundColor: COLORS.lightPrimary,
                    }
              }
            >
              <Input
                placeholder="Aa"
                onSubmitEditing={() => sentMessage(textMessage, 'text')}
                onChangeText={(text) => setTextMessage(text)}
                onTouchStart={() => {
                  setShowSticker(false);
                  setShowRecording(false);
                  setIsTyping(true);
                }}
                onBlur={() => setIsTyping(false)}
                blurOnSubmit={false}
                value={textMessage}
              />
              <TouchableOpacity onPress={handleShowSticker}>
                <Icon
                  name="flower-outline"
                  size={25}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </Item>
            <TouchableOpacity onPress={handleShowRecording}>
              <Icon name="mic-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {showRecording ? (
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={
                isRecording
                  ? {
                      width: SIZES.width * 0.35,
                      height: SIZES.width * 0.35,
                      borderWidth: 8,
                      borderColor: 'red',
                      borderRadius: 360,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      width: SIZES.width * 0.35,
                      height: SIZES.width * 0.35,
                      borderColor: COLORS.lightGray,
                      borderWidth: 8,
                      borderRadius: 360,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }
            >
              <TouchableOpacity
                onLongPress={startRecording}
                onPressOut={stopRecording}
                style={{
                  width: SIZES.width * 0.25,
                  height: SIZES.width * 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="mic" size={40} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View />
        )}
        {showSticker ? (
          <Tabs renderTabBar={() => <ScrollableTab />} style={{ flex: 0.5 }}>
            {stickerList.map((item) => {
              return (
                <Tab
                  key={item.id}
                  heading={
                    <TabHeading>
                      <Text>{item.id}</Text>
                    </TabHeading>
                  }
                >
                  <ScrollView>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}
                    >
                      {item.list.map((sticker) => {
                        return (
                          <TouchableOpacity
                            onPress={() => sentMessage(sticker, 'sticker')}
                          >
                            <Image
                              source={sticker}
                              resizeMode="contain"
                              style={{
                                width: 40,
                                height: 40,
                                marginHorizontal: 40,
                                marginVertical: 10,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </Tab>
              );
            })}
          </Tabs>
        ) : (
          <View />
        )}
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  targetMessageBox: {
    paddingHorizontal: SIZES.width * 0.03,
    paddingVertical: SIZES.width * 0.02,
    marginVertical: SIZES.width * 0.015,
    marginHorizontal: SIZES.width * 0.01,
    maxWidth: SIZES.width * 0.6,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  selfMessageBox: {
    paddingHorizontal: SIZES.width * 0.03,
    paddingVertical: SIZES.width * 0.02,
    marginTop: SIZES.width * 0.015,
    marginHorizontal: SIZES.width * 0.01,
    maxWidth: SIZES.width * 0.6,
    borderRadius: 15,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
});
export default TranslateChat;
