import React, {Component} from 'react';
import { StyleSheet,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../components/MainHeader';
import * as Nav from '../methods/Navigation';
import * as Requests from '../methods/Requests';

export default class Home extends Component <{}>{

	constructor(props){
    super(props);
  	}

    render(){
    return(
    <Container style={{backgroundColor:'#fff'}}>
        <ImageBackground source={require('../images/gnice_top_login_bg.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10000000,top:-5, width: '100%',height:'50%',paddingTop:5,}]}>	
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        <Image source={require('../images/gnice_logo.png')}  style={{alignSelf:'center',marginTop:50,height: 90, width:65}}/>
        <Text style={[custom_style.section_header,{alignSelf:'center',marginTop:40,marginBottom:0}]}>Login</Text>
        <KeyboardAvoidingView>
        <View style={{flexDirection:'column',alignItems:'center',marginTop:20}}>
        <View>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        onSubmitEditing = {()=>this.password.focus()}
        placeholderTextColor="grey"
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="********" secureTextEntry={true} selectionColor="#fff"
        onSubmitEditing = {()=>this.password.focus()}
        placeholderTextColor="grey"
        />
        </View>
        <View>
        <TouchableOpacity style={custom_style.login_btn} onPress={Requests.login.bind(this)}>
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Login</Text><Icon name='ios-arrow-forward' style={{color:'#fff'}} />
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>


        <TouchableOpacity>
         <Text style={{color:'#aaa',fontWeight:'bold',fontSize:17,marginTop:20,alignSelf:'center'}}>Forgot Password?</Text>   
         </TouchableOpacity>  
        
        <TouchableOpacity style={[custom_style.signup_btn,custom_style.textInputShadow]} onPress={Nav._openscreen.bind(this,this.props,'UserSignup')}>
            <Text style={{color:'#c1700a',fontWeight:'bold',fontSize:18}}>Register</Text>
        </TouchableOpacity>

        </ImageBackground>

        <ImageBackground source={require('../images/gnice_bottom_login_bg.png')} style={[{resizeMode: "contain",
        position:'absolute',bottom:0, width: '100%',height:'40%',}]}>

      
        </ImageBackground>
        
    </Container>
	);
	}
}