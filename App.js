import React, {useEffect} from 'react';
import Navigation from './navigations/Navigation';
import { InitializeFirebase } from './database/firebase';



export default function App() {
  
  useEffect(() => {
    InitializeFirebase();
  },[]);
  return (
    <Navigation/>
  );
}
