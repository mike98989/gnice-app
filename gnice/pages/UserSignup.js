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
        fullname: '',
        email: '',
        phone: '',
        password:'',
        confirm_password:'',
        errorMsg:'',
        showRegisterView:true,
        showConfirmationView:false,
        showEmailInputField:false,
        showFinishedView:false,
        showLoader:false,
        sellerAccount:false,
        code1:'',
        code2:'',
        code3:'',
        code4:'',
    }

    _signup = () => {
        Requests.signup(this);
    }
    _confirm_code = () => {
        Requests.confirm_signup(this);
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
    this._check_render_view();    
    return(
    <Container style={{backgroundColor:'#fff'}}>
        <ImageBackground source={require('../images/gnice_top_login_bg.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10000000,top:-5, width: '100%',height:'50%',paddingTop:5,}]}>	
    
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        
        <View style={[{flex:1,justifyContent:'center',marginBottom:0}]}>  
        <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',marginTop:270,height: 70, width:58}}/>  
          
        <Text style={[custom_style.section_header,{alignSelf:'center',marginTop:20,marginBottom:0}]}>Signup</Text>
        {this.state.showRegisterView ? (
        <View>    
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <KeyboardAvoidingView>
        <View style={{flexDirection:'column',alignItems:'center',marginTop:20}}>
        <View>
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Full Name" keyboardType="default" selectionColor="#fff"
        onSubmitEditing = {()=>this.password.focus()} onChangeText={(fullname) =>this.setState({fullname}) }
        placeholderTextColor="grey"
        />

        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        placeholderTextColor="grey" onChangeText={(email) =>this.setState({email}) }
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Phone Number" keyboardType="number-pad" selectionColor="#fff" onChangeText={(phone) =>this.setState({phone}) }
        placeholderTextColor="grey"
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{marginTop:30}]} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder="Password" selectionColor="#fff" onChangeText={(password) =>this.setState({password}) }
        placeholderTextColor="grey"
        />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Confirm Password" secureTextEntry={true} selectionColor="#fff" onChangeText={(confirm_password) =>this.setState({confirm_password}) }
        placeholderTextColor="grey"
        />
        </View>
        <View style={{flexDirection:'row',marginVertical:15}}>
            <CheckBox value={this.state.sellerAccount} onValueChange={(sellerAccount) => {this.setState({sellerAccount}); console.log("value="+sellerAccount);}} style={custom_style.signup_checkbox}/>
            <Text style={{fontWeight:'bold',fontSize:16,color:'#555'}}>I would also want sell </Text>
        </View>
        <View>
        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row'}]} onPress={this._signup}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
            
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Signup</Text><Icon name='ios-arrow-forward' style={{color:'#fff'}} />
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={[custom_style.signup_btn,custom_style.right_border_radius,custom_style.textInputShadow]} onPress={Nav._openscreen.bind(this,this.props,'UserLogin')}>
            <Text style={{color:'#c1700a',fontWeight:'bold',fontSize:18}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'UserSignup','confirm')}>
         <Text style={{fontStyle: 'italic',color:'#454444',fontSize:17,marginTop:20,alignSelf:'center'}}>I already have confirmation code?</Text>   
         </TouchableOpacity>  
        </View>
        ):null
        }
        {this.state.showConfirmationView ? (
        <View style={{paddingHorizontal:30,paddingVertical:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        {!this.state.showEmailInputField ?(    
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>A confirmation email have been sent to your  email address. Please enter the confirmation code</Text>
        ):
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>Please enter the confirmation code sent to your email.</Text>
        }
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        {this.state.showEmailInputField ?(
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{textAlign:'center'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        onChangeText={(email) =>this.setState({email}) }
        placeholderTextColor="grey"
        /> 
        ):null
        }
        
        <View style={{flexDirection:'row',marginTop:20}}>
            <TextInput keyboardType="numeric" ref={(input) => { this.code1 = input; }} onChangeText={(code1) =>{this.setState({code1}); this.code2.focus() }} autoFocus = {true} style={[custom_style.confirmation_code_box,{marginRight:10}]}></TextInput>
            <TextInput keyboardType="numeric" ref={(input) => { this.code2 = input; }} onChangeText={(code2) =>{this.setState({code2}); this.code3.focus() }}style={[custom_style.confirmation_code_box,{marginRight:10}]}></TextInput>
            <TextInput keyboardType="numeric"  ref={(input) => { this.code3 = input; }} style={[custom_style.confirmation_code_box,{marginRight:10}]}  onChangeText={(code3) =>{this.setState({code3}); this.code4.focus()} }></TextInput>
            <TextInput keyboardType="numeric" ref={(input) => { this.code4 = input; }} onChangeText={(code4) =>{this.setState({code4})} } style={[custom_style.confirmation_code_box]}></TextInput>
        </View>
        <TouchableOpacity style={[custom_style.login_btn,{marginTop:30,flexDirection:'row'}]} onPress={this._confirm_code}>
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
        <Text style={{lineHeight:25,fontSize:24,textAlign:'center',fontWeight:'bold',marginBottom:10}}>Weldone {this.state.fullname}</Text>
        <Text style={{lineHeight:25,fontSize:16,textAlign:'center'}}>Your account ({this.state.email.toLowerCase()}) is activated. Please proceed to login</Text>
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