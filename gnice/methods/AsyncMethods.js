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
    if((dataObject.seller=='1')&&(dataObject.account_type=='0')){
      that.props.navigation.navigate('SellerAccountTypeScreen_preview',{paramsdata:null});
    }  
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


  export const _loadSellerActivationData = async(that)=>{
    var selected_account_type = await AsyncStorage.getItem('selected_account_type');
    var email_to_activated = await AsyncStorage.getItem('email_to_activated');
    
    if((selected_account_type!=null)&&(selected_account_type !='')){
      that.setState({
        selected_account_type:selected_account_type,
        email_to_activated:email_to_activated,
      })
      
    }
    
  
    }


