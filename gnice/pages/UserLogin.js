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
    

  state = {
    username: '',
    password: '',
    errorMsg:'',
    showLoader:false,
  }

  _do_Login = () => {
    Requests.login(this);
  }

    render(){
    return(
    <Container style={{backgroundColor:'#ddd'}}>
        <ImageBackground source={require('../images/gnice_top_login_bg.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10000000,top:-5, width: '100%',height:'50%',paddingTop:5,}]}>	 
        <ImageBackground source={require('../images/gnice_burble_backgroud.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:0, width: '100%',height:'30%',paddingTop:5,}]}>
        </ImageBackground> 
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',marginTop:50,height: 80, width:65}}/>
        <Text style={[custom_style.section_header,{alignSelf:'center',marginTop:40,marginBottom:0}]}>Login</Text>
        <Text style={{alignSelf:'center',color:'#484747'}}>Login with your email and password</Text>
        <KeyboardAvoidingView>
        <View style={{flexDirection:'column',alignItems:'center',marginTop:20}}>
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <View>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' autoFocus = {true} placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        onSubmitEditing = {()=>this.password.focus()} onChangeText={(username) =>this.setState({username}) }
        placeholderTextColor="grey"
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="********" secureTextEntry={true} selectionColor="#fff" onChangeText={(password) =>this.setState({password}) }
        placeholderTextColor="grey"
        />
        </View>
        <View>
        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row'}]} onPress={this._do_Login}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}  
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Login</Text><Icon name='ios-arrow-forward' style={{color:'#fff'}} />
        
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>


        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'ForgotPasswordScreen',null)}>
         <Text style={{color:'#5d5b5b',fontWeight:'bold',fontSize:17,marginTop:20,alignSelf:'center'}}>Forgot Password?</Text>   
         </TouchableOpacity>  

         <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'UserSignup','confirm')}>
         <Text style={{fontStyle: 'italic',color:'#454444',fontSize:17,marginTop:20,alignSelf:'center'}}>I already have confirmation code?</Text>   
         </TouchableOpacity>  
        
        <TouchableOpacity style={[custom_style.signup_btn,custom_style.right_border_radius,custom_style.textInputShadow]} onPress={Nav._openscreen.bind(this,this.props,'UserSignup',null)}>
            <Text style={{color:'#c1700a',fontWeight:'bold',fontSize:18}}>Register</Text>
        </TouchableOpacity>

        </ImageBackground>

        {/* <ImageBackground source={require('../images/gnice_bottom_login_bg.png')} style={[{resizeMode: "contain",
        position:'absolute',bottom:0, width: '100%',height:'40%',}]}>

      
        </ImageBackground> */}
        
    </Container>
	);
	}
}