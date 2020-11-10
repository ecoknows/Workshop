import React, {useEffect, useState} from 'react';
import Navigation from './navigations/Navigation';
import { InitializeFirebase } from './database/firebase';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';


const  getFonts =()=> Font.loadAsync({
  'OpenSans-bold' : require('./assets/fonts/open-sans/OpenSans-Bold.ttf'),
  'OpenSans-extra-bold' : require('./assets/fonts/open-sans/OpenSans-ExtraBold.ttf'),
  'OpenSans-semi-bold' : require('./assets/fonts/open-sans/OpenSans-SemiBold.ttf'),
  'OpenSans-light' : require('./assets/fonts/open-sans/OpenSans-Light.ttf'),
  'OpenSans-regular' : require('./assets/fonts/open-sans/OpenSans-Regular.ttf'),
  'Ambit-bold' : require('./assets/fonts/ambit/Ambit-Bold.otf'),
  'Ambit-light' : require('./assets/fonts/ambit/Ambit-Light.otf'),
  'Ambit-regular' : require('./assets/fonts/ambit/Ambit-Regular.otf'),
  'Ambit-semi-bold' : require('./assets/fonts/ambit/Ambit-SemiBold.ttf'),
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    InitializeFirebase();
  },[]);
  
  if(fontsLoaded){
    return(
      <Navigation/>
    );
  } else {
    
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    );
  }
}
