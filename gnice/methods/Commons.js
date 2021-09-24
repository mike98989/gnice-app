import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Nav from './Navigation';


export const _logout = (props,Screen) => {
  AsyncStorage.clear();
  Nav._openscreen.bind(this,props,'UserLogin')
  //props.navigation.navigate(Screen);
}


