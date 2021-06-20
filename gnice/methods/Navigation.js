import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const _opendrawer = (props) => {
    props.navigation.openDrawer();
 }  

export const _goback = (props) => {
    props.navigation.goBack();
 } 

export const _openscreen = (props,Screen,values) => {
  props.navigation.navigate(Screen,{paramsdata:values});
}
export const _logout = (props,Screen) => {
  //AsyncStorage.clear();
  alert(JSON.stringify(props));
  props.navigation.navigate('Routes', { screen: 'Home' });
  //props.navigation.navigate(Screen);
}
