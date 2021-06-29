import React, {Component} from 'react';
import {View,Text,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import Pinned from './pages/Pinned';
import Product from './pages/Product';
import Products from './pages/Products';

import SubCategories from './pages/SubCategories';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserScreens from './pages/UserScreens';
import LandingScreen from './pages/user/LandingScreen';

import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import SellerAccountTypeScreen_preview from './pages/SellerAccountTypeScreen_preview';


import CustomDrawerContent from './components/CustomDrawer'
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList, DrawerItem } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function UserArea() {
  return (

    
    <Drawer.Navigator initialRouteName='LandingScreen' drawerContent={props => <CustomDrawerContent {...props} that={this} />} drawerContentOptions={{
    activeTintColor: '#e91e63',
    }}>
    <Drawer.Screen name="LandingScreen" options={{ drawerLabel: 'LandingScreen' }} component={LandingScreen} />
    
    </Drawer.Navigator>
  
    // <Stack.Navigator  screenOptions={{headerShown: false}}>
    //   <Stack.Screen name="LandingScreen" component={LandingScreen} />
    // </Stack.Navigator>
  );
}


export default function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pinned" component={Pinned} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="UserLogin" component={UserLogin} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="UserArea" component={UserArea} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="UserScreens" component={UserScreens} />
      <Stack.Screen name="SellerAccountTypeScreen_preview" component={SellerAccountTypeScreen_preview} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
    </NavigationContainer>
    );
}