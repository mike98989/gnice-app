import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

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
    update_state =()=>{
      return null;
    }

    render(){
    return(
    <Container style={{backgroundColor:'#fff'}}>
      <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingTop:20}]}>
        <Image source={require('../../images/gnice_logo_only.png')}  style={{height: 40, width:35,marginBottom:5,marginTop:10,marginLeft:20}}/>
        <Text style={[custom_style.section_header,{marginLeft:25,marginTop:20}]}>Dashboard</Text>
        <Text style={[custom_style.section_header,{marginLeft:25,fontSize:13,fontWeight:'bold',color:'#e37a17'}]}>{new Date().toLocaleString()}</Text>
        {this.state.userData.seller_account_details ?(
        <View style={{flexDirection:'column',paddingHorizontal:20}}>

        <LinearGradient
          style={[custom_style.dashboard_box2,{marginRight:30}]}
        colors={['#528ccf', '#6ba7ec', '#fff']}
        start={{ x: 0.5, y: 0 }}>
        <Text style={[custom_style.dashboard_box1_header,{fontSize:27}]}>{this.state.userData.seller_account_details.title} account package</Text>
        <Text style={[custom_style.dashboard_box1_sub_header]}>You have 5 ads slot left and 14 days left</Text>
        <TouchableOpacity style={[custom_style.login_btn,{width:'30%'}]} onPress={Nav._openscreen.bind(this,this.props,'SellerAccountTypeScreen_preview',null)}>
        <Text style={{fontSize:14,color:'#fff'}}>Upgrade</Text>
        </TouchableOpacity>
          </LinearGradient>

          <View style={{flexDirection:'row'}}>
          <LinearGradient
          style={[custom_style.dashboard_box1,{marginRight:10}]}
        colors={['#528ccf', '#6ba7ec', '#fff']}
        start={{ x: 0, y: 0 }}>
        <Text style={[custom_style.dashboard_box1_header]}>30</Text>
        <Text style={[custom_style.dashboard_box1_sub_header]}>Total uploaded postings</Text>
          </LinearGradient>

          <LinearGradient
          style={[custom_style.dashboard_box1]}
        colors={['#f5610a', '#f09058', '#fff']}
        start={{ x: 0.5, y: 0 }}>

        <Text style={[custom_style.dashboard_box1_header]}>30</Text>
        <Text style={[custom_style.dashboard_box1_sub_header]}>Total client's response</Text>

          </LinearGradient>
          </View>
          
        </View>
        
        ):null}
        </View>
        
    </Container>
	);
	}
}