import React, { useEffect, useState } from 'react';
import Navigation from './navigations/Navigation';
import { InitializeFirebase } from './database/firebase';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const getFonts = () =>
  Font.loadAsync({
    'Noto-medium': require('./assets/fonts/noto-sans/NotoSans-Medium.ttf'),
    'Noto-extra-bold': require('./assets/fonts/noto-sans/NotoSans-ExtraBold.ttf'),
    'Noto-bold': require('./assets/fonts/noto-sans/NotoSans-Bold.ttf'),
    'Noto-semi-bold': require('./assets/fonts/noto-sans/NotoSans-SemiBold.ttf'),
    'Noto-regular': require('./assets/fonts/noto-sans/NotoSans-Regular.ttf'),
    'OpenSans-light': require('./assets/fonts/open-sans/OpenSans-Light.ttf'),
    'Ambit-bold': require('./assets/fonts/ambit/Ambit-Bold.otf'),
    'Ambit-light': require('./assets/fonts/ambit/Ambit-Light.otf'),
    'Ambit-regular': require('./assets/fonts/ambit/Ambit-Regular.otf'),
    'Ambit-semi-bold': require('./assets/fonts/ambit/Ambit-SemiBold.ttf'),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // axios.defaults.baseURL = 'http://10.0.2.2:3001/api'; // EMULATOR API
  axios.defaults.baseURL = 'http://192.168.1.15:3001/api'; // LOCAL API WITH REAL DEVICE
  // axios.defaults.baseURL = 'https://hatdogsilog.loca.lt/api'; // OPEN PORT API 
  

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
