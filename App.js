import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Routes from './navigation/routes';
import reducer from './reducers';
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_700Bold,
  Prompt_900Black,
} from '@expo-google-fonts/prompt';
import './i18n';

const store = createStore(reducer, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_700Bold,
    Prompt_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
