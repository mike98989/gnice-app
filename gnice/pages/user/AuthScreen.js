import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import * as Requests from '../../methods/Requests';


export default class AuthScreen extends Component <{}>{

	constructor(props){
    super(props);
  	}

    state = {
      userData:[],
      messages_count:'',
      products_count:'',
      showLoader:true,
    }

    componentDidMount =()=> {
      AsyncMethods._loadSessionState(this).done();
      //this._loadInitialState().done();
      const unsubscribe = this.props.navigation.addListener('focus', () => {
        AsyncMethods._loadSessionState(this).done();
        });
     
    }
    
      update_state=()=>{
          //return null;
        //Nav._openscreen(this,this.props,'LandingScreen',null);
        this.props.navigation.navigate('LandingScreen',null);
      }

    

    render(){
    return(
    <Container style={{flex:1,backgroundColor:'#fff',justifyContent:'center'}}>
      {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
    ):null} 
    </Container>
	);
	}
}