import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, images } from '../constants';
import { AnnouncementCard } from '../components';

const Announcement = ({ navigation }) => (
  <Container>
    <Header hasTabs style={{ height: 50 }}>
      <Left />
      <Body>
        <Title style={{ ...FONTS.h3, paddingTop: 10 }}>ประกาศ</Title>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            console.log('search');
          }}
        >
          <Icon name="search" size={27} />
        </Button>
        <Button
          transparent
          onPress={() => {
            console.log('right menu');
          }}
        >
          <Icon name="ellipsis-vertical" size={27} />
        </Button>
      </Right>
    </Header>
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
              ประกาศสำคัญ
            </Text>
          </TabHeading>
        }
        style={{ backgroundColor: COLORS.lightGray }}
      >
        <ScrollView>
          <AnnouncementCard
            title="ทำไมต้องชำระค่าส่วนกลาง"
            subtitle="ฝ่ายบริหาร"
            image={images.beach}
            time="5 ม.ค. 2564, 14:43 น."
            like="1"
            seen="81"
            onPress={() => {
              console.log('anouncement');
            }}
          />
          <AnnouncementCard
            title="ทำไมต้องชำระค่าส่วนกลาง"
            subtitle="ฝ่ายบริหาร"
            image={images.beach}
            time="5 ม.ค. 2564, 14:43 น."
            like="1"
            seen="81"
            onPress={() => {
              console.log('anouncement');
            }}
          />
          <AnnouncementCard
            title="ทำไมต้องชำระค่าส่วนกลาง"
            subtitle="ฝ่ายบริหาร"
            image={images.beach}
            time="5 ม.ค. 2564, 14:43 น."
            like="1"
            seen="81"
            onPress={() => {
              console.log('anouncement');
            }}
          />
        </ScrollView>
      </Tab>

      <Tab
        heading={
          <TabHeading>
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
              ข่าวสารทั่วไป
            </Text>
          </TabHeading>
        }
        style={{ backgroundColor: COLORS.lightGray }}
      >
        <ScrollView>
          <AnnouncementCard
            title="ทำไมต้องชำระค่าส่วนกลาง"
            subtitle="ฝ่ายบริหาร"
            image={images.skiVilla}
            time="5 ม.ค. 2564, 14:43 น."
            like="1"
            seen="81"
            onPress={() => {
              console.log('anouncement');
            }}
          />
        </ScrollView>
      </Tab>
    </Tabs>
  </Container>
);

export default Announcement;
