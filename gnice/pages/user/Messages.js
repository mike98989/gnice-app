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
import * as Logic from '../../methods/Logic';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'


export default class Messages extends Component <{}>{


	constructor(props){
    super(props);
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  	}

    state = {
      userData:[],
      messages:[],
      showLoader:false,
    }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
          });
      
      }
  
      update_state =()=>{
        Requests.fetch_all_user_messages(this);  
      }
      
    render(){
    return(
        <Container style={[custom_style.container,{backgroundColor:'#c9e0f4'}]}>
        <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
        position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>    
        {/* <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/> */}
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>       
        <View style={{marginTop:30,marginBottom:20}}>
        <Image source={require('../../images/chat_black.png')}  style={{alignSelf:'center',height: 28, width:25}}/>
        <Text style={[custom_style.section_header,{textAlign:'center',marginTop:10}]}>My Messages</Text> 
        </View>

        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
        ):null}

        <View style={[custom_style.curved_top_side_view,{flex:1,backgroundColor:'#fff',paddingHorizontal:10,paddingTop:0,height:'auto',overflow:'hidden'}]}>
        <ScrollView>
        {!this.state.showLoader ? (
            <List>
              
            {this.state.messages.map((body, i) => (
            image_value = Logic.split_value(body.image, ','), 
             <ListItem noIndent key={i} thumbnail style={{paddingLeft:0}}>
              <Left style={{paddingLeft:0}}>
                <Thumbnail square style={{paddingLeft:0,borderRadius:10}} source={{uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}} />
              </Left>
              <Body style={{paddingBottom:5}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:11}}>
                <Image source={require('../../images/user_icon.png')}  style={{marginRight:3,height: 11, width:11,alignSelf:'flex-start',marginTop:0}}/> {body.sender_name} - <Image source={require('../../images/phone_icon.png')}  style={{marginRight:3,height: 9, width:9,alignSelf:'flex-start',marginTop:1}}/> {body.sender_phone} - <Image source={require('../../images/envelope.png')}  style={{marginRight:3,height: 9, width:11,alignSelf:'flex-start',marginTop:1}}/> {body.sender_email}</Text>
                 </View>
                <Text note style={{fontSize:12,fontStyle: 'italic',}}>{body.message}</Text>
                <Text note style={{fontSize:9,alignSelf:'flex-end',color:'#186684',marginRight:10,marginTop:5}}>
                {body.date} - ({this.timeAgo.format(new Date(Date.parse(body.date.replace(/-/g, '/'))))})
                </Text>
              </Body>
              
            </ListItem>
            // <ListItem key={i}>
            //     <Text>{i+1}</Text>
            //     <Body><Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 50, width: null, flex: 1}}/></Body>
            //     <Body><Text>{body.sender_name}</Text><Text>{body.message}</Text></Body>
            // </ListItem>
            ))}

            {/*<ListItem noIndent onPress={() => props.navigation.navigate('Home')}>
                <Text>Main Home</Text>
            </ListItem>
            
            <ListItem noIndent onPress={() => props.navigation.navigate('LandingScreen')}>
            <Text>My Dashboard</Text>
            </ListItem>

            <ListItem noIndent onPress={() => props.navigation.navigate('NewProduct')}>
            <Text>New Product</Text>
            </ListItem>

            <ListItem noIndent onPress={() => props.navigation.navigate('MyProducts')}>
            <Text>My Products</Text>
            </ListItem>

            <ListItem noIndent onPress={() => props.navigation.navigate('Messages')}>
            <Text>Messages</Text>
            </ListItem>


            <ListItem noIndent onPress={() => props.navigation.navigate('MyProfile')}>
            <Text>My Profile</Text>
            </ListItem> */}
            
            </List>
        ):null}
          </ScrollView>
          
        </View>
        
        </Container>
	);
	}
}