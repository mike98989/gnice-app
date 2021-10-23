import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, List, ListItem, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../../components/custom_style';
import MainFooter from '../../components/MainFooter';
import * as Nav from '../../methods/Navigation'
import UserScreenHeader from '../../components/UserScreenHeader';
import * as AsyncMethods from '../../methods/AsyncMethods';
import LinearGradient from 'react-native-linear-gradient';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import * as Logic from '../../methods/Logic';
import * as Requests from '../../methods/Requests';


export default class MyProfile extends Component <{}>{

	constructor(props){
    super(props);
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  	}

    state = {
      showLoader:false,
      userData:[],
      resourcePath:[],
      uploadImageCount:0,
      
    }

    _do_profile_upload =()=>{
      Requests.updateProfileImage(this);
    }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
          });
      }
      
    update_state =()=>{
      return null;
    }

    render(){
    return(
        <Container style={{backgroundColor:'#c9e0f4'}}>
        <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>    
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        
        <View style={[custom_style.container,{marginTop:30,justifyContent:'center', alignItems:'center'}]}>
        {this.state.uploadImageCount==0 ? (
            <TouchableOpacity onPress={Logic.chooseImage.bind(this,this)}>
            <Image source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.state.userData.image}} style={{borderRadius:50,overflow:'hidden',width:100,height:100}}/>
            </TouchableOpacity>
          ):null}

            {this.state.uploadImageCount>0 ? (
             <View style={{flexDirection:'column'}}> 
            <TouchableOpacity onPress={Logic.chooseImage.bind(this,this)}>  
            <Image source={{uri:this.state.resourcePath.uri}} style={{borderRadius:50,overflow:'hidden',width:100,height:100,marginTop:10,}} />
            </TouchableOpacity>
            
            {this.state.showLoader ?(
            <Image source={require('../../images/spinner4.gif')}  style={{alignSelf:'center',marginHorizontal:5,height: 45, width:45}}/> 
            ):null}  

            <TouchableOpacity style={[custom_style.generic_btn,{alignSelf:'center'}]} onPress={this._do_profile_upload}>
            <Text style={{fontSize:13,color:'#fff',textAlign:'center'}}>
            Upload</Text>
            </TouchableOpacity>

            </View>
            ):null}

            

            <Text style={[custom_style.section_header,{marginVertical:2}]}>{this.state.userData.fullname}</Text>
            <Text style={{color:'#0e3f5f',fontSize:11}}>Click profile image to browse</Text>


        {/* <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',}]}>
            {!this.state.showLoader ?(
            <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
            ):null}  
        <Text style={{fontSize:17,color:'#fff'}}>Upload</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={[custom_style.signup_btn,custom_style.right_border_radius,custom_style.textInputShadow,{alignSelf:'flex-start',width:160,marginTop:15,marginBottom:0,}]} onPress={Nav._openscreen.bind(this,this.props,'ChangePassword',null)}>
            <Text style={{color:'#0e3f5f',fontSize:14,fontWeight:'bold'}}>Change Password</Text>
        </TouchableOpacity>
        </View>

        {this.state.userData.seller_account_details ?(
        <View style={[custom_style.curved_top_side_view,{backgroundColor:'#fff',paddingTop:10,height:'auto',marginTop:0}]}>
        <ScrollView>
          <List>
            <ListItem>
              <Text>Seller ID: {this.state.userData.seller_id}</Text>
            </ListItem>
            <ListItem style={{flexDirection:'row'}}>
              <View style={{flexDirection:'row'}}>
            <Text style={{alignSelf:'flex-start'}}>Account Type: <Text style={{fontWeight:'bold', color:'#6b4607'}}>{this.state.userData.seller_account_details.title}</Text></Text>
            <TouchableOpacity style={{alignSelf:'flex-end',padding:6,backgroundColor:'#cca748',borderRadius:10,marginTop:-5,marginLeft:10}} onPress={Nav._openscreen.bind(this,this.props,'SellerAccountTypeScreen_preview',null)}>
              <Text style={{fontSize:13,alignSelf:'flex-end',}}>Change</Text>
            </TouchableOpacity>
            </View>
            </ListItem>
            <ListItem>
              <Text>Email: {this.state.userData.email}</Text>
            </ListItem>
            <ListItem>
              <Text>Phone Number: {this.state.userData.phone}</Text>
            </ListItem>
            <ListItem>
              <Text>Whatsapp Number: {this.state.userData.whatsapp}</Text>
            </ListItem>
            <ListItem>
             <Text>Last Seen: {this.timeAgo.format(new Date(Date.parse(this.state.userData.last_login.replace(/-/g, '/'))))}</Text>
            </ListItem>
            <ListItem>
             <Text>Registered: {this.state.userData.signup_date}</Text>
            </ListItem>
            <ListItem style={{flexDirection:'column'}}>
            <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center'}]} onPress={Nav._openscreen.bind(this,this.props,'EditProfile',null)}>
            <Text style={{fontSize:17,color:'#fff'}}>Update Profile</Text>
            </TouchableOpacity>

           

            </ListItem>
          </List>
          </ScrollView>
          </View>
        ):null}
        
        {/* <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            />  */}
        </Container>
	);
	}
}