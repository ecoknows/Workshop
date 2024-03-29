import React, {useEffect, useState} from 'react';
import Navigation from './navigations/Navigation';
import {InitializeFirebase} from './database/firebase';
import axios from 'axios';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {local_api_url} from './constants/urls';
import Toast from 'react-native-toast-message';
import {delete_login_user} from './database/current_user';
import SocketInstance from './constants/SocketIO';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  axios.defaults.baseURL = local_api_url;

  SocketInstance.getInstance();

  return (
    <Provider store={store}>
      <Navigation />
      <Toast ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
}
