import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, List, ListItem, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../../components/custom_style';
import MainFooter from '../../components/MainFooter';
import * as Nav from '../../methods/Navigation'
import UserScreenHeader from '../../components/UserScreenHeader';
import * as AsyncMethods from '../../methods/AsyncMethods';
import LinearGradient from 'react-native-linear-gradient';
import * as Requests from '../../methods/Requests';
import MainHeader from '../../components/MainHeader'



export default class EditProfile extends Component <{}>{


	constructor(props){
    super(props);
  	}

    state = {
      showLoader:false,
      userData:[],
      fullname:'',
    }

    _update_profile = () => {
        Requests.updateProfile(this);
    }

    

    componentDidMount =()=> {
       AsyncMethods._loadSessionState(this).done();
      }
      
      update_state=()=>{
        this.setState({
            fullname:this.state.userData.fullname,
            email:this.state.userData.email,
            phone:this.state.userData.phone,
            whatsapp:this.state.userData.whatsapp,
        })
      }
    render(){
    return(
        <Container style={{backgroundColor:'#c9e0f4'}}>
        <ImageBackground source={require('../../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:140,paddingTop:5,}]}></ImageBackground>    
         <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/> 

         <View style={{paddingTop:20,marginTop:40}}>
         <ScrollView style={{marginBottom:0}}>
        <KeyboardAvoidingView>
        <View style={[custom_style.container,{bottom:0,marginBottom:30}]}>
        <View style={[{justifyContent:'center', alignItems:'center'}]}>
        <Image source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.state.userData.image}} style={{borderRadius:50,overflow:'hidden',width:95,height:95}}/>
            <Text style={[{marginVertical:0}]}>Edit </Text>
            <Text style={{fontWeight:'bold'}}>{this.state.userData.fullname}'s Profile</Text>
        </View>
        
        
        <View style={[custom_style.curved_top_side_view,{backgroundColor:'#fff',paddingHorizontal:20,paddingTop:0,height:'auto',}]}>
        
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Full Name</Text> 
        <TextInput style={[custom_style.formcontrol_product_screen,{width:'100%',color:'#000',paddingLeft:20}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Full Name" keyboardType="default" selectionColor={'#1688EA'} value={this.state.fullname}
        placeholderTextColor="grey" onChangeText={(fullname) =>this.setState({fullname})}
        />

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Email</Text> 
        <TextInput style={[custom_style.formcontrol_product_screen,{width:'100%',backgroundColor:'#ececec',color:'#aaa',paddingLeft:20}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" keyboardType="default" selectionColor={'#1688EA'} value={this.state.email}
        placeholderTextColor="grey" editable={false}
        />

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Phone Number</Text> 
        <TextInput style={[custom_style.formcontrol_product_screen,{width:'100%',color:'#000',paddingLeft:20}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Phone number" keyboardType="number-pad" selectionColor={'#1688EA'} value={this.state.phone}
        placeholderTextColor="grey" onChangeText={(phone) =>this.setState({phone})}
        />

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Whatsapp Number</Text> 
        <TextInput style={[custom_style.formcontrol_product_screen,{width:'100%',color:'#000',paddingLeft:20}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Whatsapp" keyboardType="default" selectionColor={'#1688EA'} value={this.state.whatsapp}
        placeholderTextColor="grey" onChangeText={(whatsapp) =>this.setState({whatsapp})}
        />

            <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center'}]} onPress={this._update_profile}>
            {this.state.showLoader ?(
            <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
            ):null}  
            <Text style={{fontSize:13,color:'#fff'}}>Update Profile</Text>
            </TouchableOpacity>
            
          
          </View>
          
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
        
        {/* <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
        />      */}
        </Container>
	);
	}
}