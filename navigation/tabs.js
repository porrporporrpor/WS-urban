import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Announcement, Home, Setting, Social } from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, SIZES, FONTS } from '../constants';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const tabOptions = {
  showLabel: false,
  style: {
    height: 100,
  },
};
const Tabs = ({ params }) => {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;
          const bgColor = focused ? COLORS.lightPrimary : COLORS.white;
          switch (route.name) {
            case 'Social':
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    margin: SIZES.base,
                    borderRadius: 10,
                    width: '80%',
                  }}
                >
                  <Icon name="home" color={tintColor} size={25} />
                  <Text style={{ color: tintColor, ...FONTS.body4 }}>
                    {(t, 'social')}
                  </Text>
                </View>
              );
            case 'Home':
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    margin: SIZES.base,
                    borderRadius: 10,
                    width: '80%',
                  }}
                >
                  <Icon name="bars" color={tintColor} size={25} />
                  <Text style={{ color: tintColor, ...FONTS.body4 }}>
                    {t('home')}
                  </Text>
                </View>
              );
            case 'Announcement':
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    margin: SIZES.base,
                    borderRadius: 10,
                    width: '80%',
                  }}
                >
                  <Icon name="sticky-note-o" color={tintColor} size={25} />
                  <Text style={{ color: tintColor, ...FONTS.body4 }}>
                    {t('anouncement')}
                  </Text>
                </View>
              );
            case 'Setting':
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    margin: SIZES.base,
                    borderRadius: 10,
                    width: '80%',
                  }}
                >
                  <Icon name="cog" color={tintColor} size={25} />
                  <Text style={{ color: tintColor, ...FONTS.body4 }}>
                    {t('settings')}
                  </Text>
                </View>
              );
          }
        },
      })}
    >
      {/* <Tab.Screen name="Social" component={Social} /> */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Announcement"
        component={Announcement}
        options={{ title: 'Announcement' }}
      />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default Tabs;
