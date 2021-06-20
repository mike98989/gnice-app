import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {custom_style} from '../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../components/MainHeader'
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';

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
        code1:'',
        code2:'',
        code3:'',
        code4:'',
    }

    _send_recovery_code = () => {
        Requests.send_recovery_code(this);
    }

    _confirm_password_recovery_code = () => {
        Requests.confirm_password_recovery_code(this);
    }

    _check_render_view = ()=>{
        if(this.props.route.params.paramsdata){
            this.state.showRegisterView=false;
            this.state.showConfirmationView=true;
            this.state.showEmailInputField=true;
            //this.setState({showRegisterView:false,showConfirmationView:true})
        }
        // else{
        //     this.state.showRegisterView=true;
        //     this.state.showConfirmationView=false;
        //     this.state.showEmailInputField=false;
        // }
    }
    
    

    render(){
    //this._check_render_view();    
    return(
    <Container style={{backgroundColor:'#fff'}}>
        <ImageBackground source={require('../images/gnice_top_login_bg.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10000000,top:-5, width: '100%',height:'50%',paddingTop:5,}]}>	
    
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        
        <View style={[{flex:1,justifyContent:'center',marginBottom:0}]}>  
        <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',marginTop:270,height: 70, width:58}}/>  
          
        <Text style={[custom_style.section_header,{alignSelf:'center',marginTop:20,marginBottom:0}]}>Forgot Password</Text>
        {this.state.showEmailView ? (
        <View style={{paddingHorizontal:30,paddingVertical:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>Please enter your email address.</Text>
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{textAlign:'center'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        onChangeText={(email) =>this.setState({email}) }
        placeholderTextColor="grey"
        /> 
        <TouchableOpacity style={[custom_style.login_btn,{marginTop:30,flexDirection:'row'}]} onPress={this._send_recovery_code}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
        <Text style={{color:'#fff'}}>Continue</Text>
        </TouchableOpacity>
        </View>
         ):null
        }

    {this.state.showConfirmationCodeView ? (
        <View style={{paddingHorizontal:30,paddingVertical:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
         <Text style={{marginTop:10,lineHeight:25,fontSize:16,textAlign:'center'}}>Please enter the confirmation code sent to your email.</Text>
         <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>  
         <View style={{flexDirection:'row',marginTop:20}}>
         <TextInput keyboardType="numeric" ref={(input) => { this.code1 = input; }} onChangeText={(code1) =>{this.setState({code1}); this.code2.focus() }} autoFocus = {true} style={[custom_style.confirmation_code_box,{marginRight:10}]}></TextInput>
         <TextInput keyboardType="numeric" ref={(input) => { this.code2 = input; }} onChangeText={(code2) =>{this.setState({code2}); this.code3.focus() }}style={[custom_style.confirmation_code_box,{marginRight:10}]}></TextInput>
         <TextInput keyboardType="numeric"  ref={(input) => { this.code3 = input; }} style={[custom_style.confirmation_code_box,{marginRight:10}]}  onChangeText={(code3) =>{this.setState({code3}); this.code4.focus()} }></TextInput>
         <TextInput keyboardType="numeric" ref={(input) => { this.code4 = input; }} onChangeText={(code4) =>{this.setState({code4})} } style={[custom_style.confirmation_code_box]}></TextInput>
        </View>
        <Text style={{marginTop:30,paddingLeft:10,color:'#7e7b7b',lineHeight:25,fontStyle:'italic',fontSize:16,alignSelf:'flex-start'}}>Enter New Password</Text>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{marginTop:5}]} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder="New Password" selectionColor="#fff" onChangeText={(password) =>this.setState({password}) }
        placeholderTextColor="grey"
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm New Password" secureTextEntry={true} selectionColor="#fff" onChangeText={(confirm_password) =>this.setState({confirm_password}) }
        placeholderTextColor="grey"
        />

        <TouchableOpacity style={[custom_style.login_btn,{marginTop:30,flexDirection:'row'}]} onPress={this._confirm_password_recovery_code}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
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
         
        
        
        </ImageBackground>

        {/* <ImageBackground source={require('../images/gnice_bottom_login_bg.png')} style={[{resizeMode: "cover",
        position:'absolute',bottom:0, width: '100%',height:'40%',}]}>

        </ImageBackground> */}
        
    </Container>
	);
	}
}