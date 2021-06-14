import React, {Component} from 'react';
import {View,Text,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import Product from './pages/Product';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';

import CustomDrawerContent from './components/CustomDrawer'
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList, DrawerItem } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} that={this} />} drawerContentOptions={{
    activeTintColor: '#e91e63',
    }}>
    <Drawer.Screen name="Home" options={{ drawerLabel: 'Home' }} component={Home} />
    <Drawer.Screen name="Product" options={{ drawerLabel: 'Product' }} component={Product} />
    <Drawer.Screen name="UserLogin" options={{ drawerLabel: 'UserLogin' }} component={UserLogin} />
    <Drawer.Screen name="UserSignup" options={{ drawerLabel: 'UserSignup' }} component={UserSignup} />
      </Drawer.Navigator>
        
     
    </NavigationContainer>


    );
}