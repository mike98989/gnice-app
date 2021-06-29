import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Nav from './Navigation';

export const _loadSessionState = async(that)=>{
  var token = await AsyncStorage.getItem('user-token');
  var datavalue = await AsyncStorage.getItem('user-data');
  var dataObject = JSON.parse(datavalue);
  
  if((token!=null)&&(token !='')){
    that.setState({
      userID:dataObject.id,
      userToken:token,
      userData:dataObject,
    })  
  }else{
  AsyncStorage.clear();
  //Toast.show({text: "Invalid Token!",buttonText: "",position: "bottom"});
  //var props = this.props.navigation;
  that.props.navigation.navigate('UserLogin');
  // setTimeout(function(){ 
  //     props.navigate('UserLogin');
  // }, 0);
  
  }

  }


