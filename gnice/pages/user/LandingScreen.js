import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LandingScreen extends Component <{}>{

	constructor(props){
    super(props);
  	}

    state = {
      userData:[]
    }

    componentDidMount =()=> {
      AsyncMethods._loadSessionState(this).done();
  
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        AsyncMethods._loadSessionState(this).done(); 
      });
  
    }
  
  
    render(){
    return(
    <Container>
      <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'UserLogin')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={custom_style.container} p>
        {/* <Text>{JSON.stringify(this.state.userData)}</Text> */}
        </View>
        
    </Container>
	);
	}
}