// AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InfoScreen from '../screens/InfoScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {Dimensions, LogBox, Platform, Text, View} from 'react-native';
import {themeColors} from '../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NewspaperIcon as HomeOutline,
  UserCircleIcon as HeartOutline,
  CogIcon as BagOutline,
} from 'react-native-heroicons/outline';
import {
  NewspaperIcon as HomeSolid,
  UserCircleIcon as HeartSolid,
  CogIcon as BagSolid,
} from 'react-native-heroicons/solid';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import DonateScreen from '../screens/DonateScreen';
import YourDonateScreen from '../screens/YourDonations';
import RootStackParamList from '../Component/RootList';
import Successscreen from '../screens/Success';
import ResetOtpScreen from '../screens/resetPassword';
import Verify from '../screens/Verify';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetOtpScreen"
          component={ResetOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Donate"
          component={DonateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="YourDonate"
          component={YourDonateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={Successscreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Verify"
          component={Verify}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => menuIcons(route, focused),
        tabBarStyle: {
          height: '11%',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBlockColor: 'black',
          borderTopLeftRadius: 20, // Add border radius to the top left corner
          borderTopRightRadius: 20, // Add border radius to the top right corner
          borderWidth: 1, // Add border width
          borderColor: 'grey', // Add border color
          borderBottomWidth:0,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route: {name: string}, focused: any) => {
  let icon;

  if (route.name === 'Profile') {
    icon = focused ? (
      <HeartSolid
        size="30"
        color={themeColors.bgLight}
        style={{marginLeft: 2}}
      />
    ) : (
      <HeartOutline
        size="30"
        strokeWidth={2}
        color="grey"
        style={{marginLeft: 2}}
      />
    );
  } else if (route.name === 'Setting') {
    icon = focused ? (
      <BagSolid size="30" color={themeColors.bgLight} style={{marginLeft: 2}} />
    ) : (
      <BagOutline
        size="30"
        strokeWidth={2}
        color="grey"
        style={{marginLeft: 2}}
      />
    );
  }

  let buttonClass = focused ? 'bg-white' : '';

  return (
    <View
      className={
        'flex flex-col items-center justify-center p-3 shadow ' + buttonClass
      }>
      {icon}
      <Text
        style={{marginTop: 5, color: focused ? themeColors.bgLight : 'grey'}}>
        {route.name == 'Profile' ? 'Home' : route.name}
      </Text>
    </View>
  );
};

export default AppNavigator;
