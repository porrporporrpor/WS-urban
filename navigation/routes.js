import React from 'react';
import Tabs from './tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  OnBoarding,
  Parcel,
  ParcelInfo,
  ReceivedParcel,
  UpdateProfile,
  Privilege,
  FaceTracking,
  Passcode,
  Facility,
  TranslateChat,
} from '../screens';
import { FONTS } from '../constants';

const Stack = createStackNavigator();

const Routes = ({ params }) => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerTitleStyle: { ...FONTS.h3 },
      }}
    >
      {/* Screen */}
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Parcel"
        component={Parcel}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ParcelInfo"
        component={ParcelInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReceivedParcel"
        component={ReceivedParcel}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Privillage"
        component={Privilege}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FaceTracking"
        component={FaceTracking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Passcode"
        component={Passcode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Facility"
        component={Facility}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TranslateChat"
        component={TranslateChat}
        options={{
          headerShown: false,
        }}
      />

      {/* Tab */}
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
