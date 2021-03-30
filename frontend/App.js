import React, { useEffect, useState } from 'react';
import Navigation from './navigations/Navigation';
import { InitializeFirebase } from './database/firebase';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { local_api_url } from './constants/urls';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  axios.defaults.baseURL = local_api_url; 
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
