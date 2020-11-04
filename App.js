import React, {useEffect} from 'react';
import Navigation from './navigations/Navigation';
import { InitializeFirebase } from './database/firebase';
import { check_login_user } from './database/current_user';



export default function App() {
  
  useEffect(() => {
    InitializeFirebase();
  },[]);
  return (
    <Navigation/>
  );
}
