import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../../components/MainHeader'
import * as Nav from '../../methods/Navigation'
import * as Requests from '../../methods/Requests';
import * as AsyncMethods from '../../methods/AsyncMethods';

export default class Home extends Component <{}>{

	constructor(props){
    super(props);

  	}
    state = {
        email: '',
        password:'',
        confirm_password:'',
        errorMsg:'',
        showEmailView:true,
        showConfirmationCodeView:false,
        showFinishedView:false,
        showLoader:false,
        user_token:'',
    }

    _change_password = () => {
        Requests.change_pass(this);
    }

    // _confirm_password_recovery_code = () => {
    //     Requests.confirm_password_recovery_code(this);
    // }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
      }
    
      update_state =()=>{
        return null;
      }

    render(){
    //this._check_render_view();    
    return(
    <Container style={{backgroundColor:'#c9e0f4'}}>
       
       <KeyboardAvoidingView>
        <ScrollView>

        <ImageBackground source={require('../../images/gnice_top_login_bg.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0, width: '100%',height:'50%',paddingTop:0,}]}></ImageBackground>	
        
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        <View style={[{flex:1,justifyContent:'center',marginBottom:0}]}> 
         
        <Image source={require('../../images/gnice_logo.png')}  style={{alignSelf:'center',marginTop:100,height: 50, width:50}}/>  
        <Text style={[custom_style.section_header,{alignSelf:'center',marginTop:20,marginBottom:0}]}>Change Password</Text>
        {this.state.showEmailView ? (
        <View style={{paddingHorizontal:30,paddingVertical:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>Please new enter passwords.</Text>
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="New Password" keyboardType="default" selectionColor={'#1688EA'}
        onChangeText={(password) =>this.setState({password}) }
        placeholderTextColor="grey" autoFocus={true} secureTextEntry={true}
        /> 
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm New Password" keyboardType="default" selectionColor={'#1688EA'}
        onChangeText={(confirm_password) =>this.setState({confirm_password})}
        placeholderTextColor="grey" secureTextEntry={true}
        />

        

        <TouchableOpacity style={[custom_style.login_btn,{marginTop:30,flexDirection:'row'}]} onPress={this._change_password}>
        {this.state.showLoader ?(
        <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
        <Text style={{color:'#fff'}}>Continue</Text>
        </TouchableOpacity>
        </View>
         ):null
        }

    {this.state.showFinishedView ? (
        <View style={{paddingHorizontal:30,paddingVertical:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:24,textAlign:'center',fontWeight:'bold',marginBottom:10}}>Bravo</Text>
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>Your account password has changed. Please proceed to login</Text>
        <TouchableOpacity style={[custom_style.login_btn,custom_style.right_border_radius,custom_style.left_border_radius,{alignSelf:'center',marginTop:20,backgroundColor:'#ff6347'}]} onPress={Nav._openscreen.bind(this,this.props,'UserLogin')}>
        <Text style={{color:'#fff'}}>Login</Text>
        </TouchableOpacity>
        </View>
         ):null
        }
        
        </View>
         
        
        
        

        {/* <ImageBackground source={require('../images/gnice_bottom_login_bg.png')} style={[{resizeMode: "cover",
        position:'absolute',bottom:0, width: '100%',height:'40%',}]}>

        </ImageBackground> */}
        </ScrollView>
        </KeyboardAvoidingView>
    </Container>
	);
	}
}