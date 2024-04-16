// App.tsx
import React, { useEffect, useState } from 'react';
import AppNavigator from './Navigation/AppNavigation';
import UserContext from './context/userContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
// ... other imports as needed

const App: React.FC = () => {
  
  const [uid, setUid] = useState<string | null>(null);
  const setup = async () => {
    GoogleSignin.configure({
      webClientId: '394702408006-511ndbstkrb0qqm6vrf8tnqpbq65tc9h.apps.googleusercontent.com',
    });
  }
  useEffect( ()=>{
     setup();
  },[])

  // In your React Native component






  async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
      console.log('Authorised ',authStatus);
    }
  }
  const getToken = async () =>{
   const token = await messaging().getToken();
   console.log(token);
  }
  useEffect(()=>{
    const checkInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('Notification caused app to open from killed state:', initialNotification);
      }
    };
    checkInitialNotification();
     requestPermission();
   // getToken();
  },[])

 

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      <AppNavigator />
    </UserContext.Provider>
  );
};

export default App;
