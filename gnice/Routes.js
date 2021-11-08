import React, {Component} from 'react';
import {View,Text,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home4';
import Pinned from './pages/Pinned';
import Product from './pages/Product';
import Products from './pages/Products';
import SearchResults from './pages/Search';
import SellerPage from './pages/SellerPage';
import ReportAbuse from './pages/ReportAbuse';
import Review from './pages/Review';
import SubCategories from './pages/SubCategories';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserScreens from './pages/UserScreens';
import LandingScreen from './pages/user/LandingScreen';
import MyProducts from './pages/user/MyProducts';
import NewProduct from './pages/user/NewProduct';
import EditProduct from './pages/user/EditProduct';
import Messages from './pages/user/Messages';
import Transactions from './pages/user/Transactions';
import MyProfile from './pages/user/MyProfile';
import EditProfile from './pages/user/EditProfile';
import ChangePassword from './pages/user/ChangePassword';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import SellerAccountTypeScreen_preview from './pages/SellerAccountTypeScreen_preview';
import CardPaymentUi from './pages/CardPaymentUi';
import TransactionStatus from './pages/TransactionStatus';


import UserCustomDrawerContent from './components/UserScreenCustomDrawer'
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList, DrawerItem } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function UserArea() {
  return (

    
    <Drawer.Navigator initialRouteName='LandingScreen' drawerContent={props => <UserCustomDrawerContent {...props} that={this} />} drawerContentOptions={{
    activeTintColor: '#e91e63',
    }}>
    <Drawer.Screen name="LandingScreen" options={{ drawerLabel: 'LandingScreen' }} component={LandingScreen} />
    <Drawer.Screen name="NewProduct" options={{ drawerLabel: 'NewProduct' }} component={NewProduct} />
    <Drawer.Screen name="EditProduct" options={{ drawerLabel: 'EditProduct' }} component={EditProduct} />
    <Drawer.Screen name="MyProducts" options={{ drawerLabel: 'MyProducts' }} component={MyProducts} />
    <Drawer.Screen name="MyProfile" options={{ drawerLabel: 'MyProfile' }} component={MyProfile} />
    <Drawer.Screen name="EditProfile" options={{ drawerLabel: 'EditProfile' }} component={EditProfile} />
    <Drawer.Screen name="ChangePassword" options={{ drawerLabel: 'ChangePassword' }} component={ChangePassword} />
    <Drawer.Screen name="Messages" options={{ drawerLabel: 'Messages' }} component={Messages} />
    <Drawer.Screen name="Transactions" options={{ drawerLabel: 'Transactions' }} component={Transactions} />
    </Drawer.Navigator>
  
    // <Stack.Navigator  screenOptions={{headerShown: false}}>
    //   <Stack.Screen name="LandingScreen" component={LandingScreen} />
    // </Stack.Navigator>
  );
}


export default function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
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
      <Stack.Screen name="CardPaymentUi" component={CardPaymentUi} />
      <Stack.Screen name="NewProduct" component={NewProduct} />
      <Stack.Screen name="ReportAbuse" component={ReportAbuse} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="SellerPage" component={SellerPage} />
      <Stack.Screen name="TransactionStatus" component={TransactionStatus} />
      <Stack.Screen name="Messages" component={Messages} />


    </Stack.Navigator>
    </NavigationContainer>
    );
}