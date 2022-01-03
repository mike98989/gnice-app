import React, {Component} from 'react';
import { Badge,ListItem, List, Left,Right, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import { DrawerContentScrollView} from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import {View,Text,StatusBar,KeyboardAvoidingView,Button,TextInput,TouchableOpacity,Image,ImageBackground,
} from 'react-native';
import {custom_style} from './custom_style';
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Nav from '../methods/Navigation';



export default class CustomDrawerContent extends Component <{}>{
  constructor(props){
    super(props);
    this.state = {
      userData:[],
    }
  	}

    componentDidMount =()=> {
      AsyncMethods._loadSessionState(this).done();
      const unsubscribe = this.props.navigation.addListener('focus', () => {
        AsyncMethods._loadSessionState(this).done();
      });
    
    }
    update_state=()=>{
      return null;
    }

    

//export function CustomDrawerContent(props) {
//const CustomDrawerContent = (props) => (
  
  //alert(JSON.stringify(that)),
 //let { func } = props;
 render(){
   
  return (
    <View style={[custom_style.fullHeight,{marginVertical:0,backgroundColor:'#ddd'}]}>
    <View style={{height:200}}>
   <ImageBackground source={require('../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'100%',paddingTop:5,}]}></ImageBackground>
    <Image source={require('../images/gnice_logo.png')}  style={{height: 25, width:25,marginTop:40,alignSelf:'flex-end'}}/>
    <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'MyProfile')}>
    <Image source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.state.userData.image}}  style={{borderRadius:25,borderWidth:0.5,borderColor:'#ccc',height: 50, width:50,marginTop:10,alignSelf:'center'}}/>
    </TouchableOpacity>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{this.state.userData.fullname}</Text>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{this.state.userData.email}</Text>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{this.state.userData.phone}</Text>
    </View>
      <List style={{paddingVertical:10,paddingLeft:10,}}>
      <ListItem noIndent onPress={() => this.props.navigation.navigate('Home')}>
        <Text>Main Home</Text>
      </ListItem>
      
      <ListItem noIndent onPress={() => this.props.navigation.navigate('LandingScreen')}>
      <Text>My Dashboard</Text>
      </ListItem>

      <ListItem noIndent onPress={() => this.props.navigation.navigate('NewProduct')}>
      <Text>New Product</Text>
      </ListItem>

      <ListItem noIndent onPress={() => this.props.navigation.navigate('MyProducts')}>
      <Text>My Products</Text>
      </ListItem>

      <ListItem noIndent onPress={() => this.props.navigation.navigate('Messages')}>
      <Text>Messages</Text>
      </ListItem>

      <ListItem noIndent onPress={() => this.props.navigation.navigate('Transactions')}>
      <Text>Payment History</Text>
      </ListItem>

      <ListItem noIndent onPress={() => this.props.navigation.navigate('MyProfile')}>
      <Text>My Profile</Text>
      </ListItem>

      <ListItem noIndent onPress={Nav._logout.bind(this,this.props,'Home',null)}>
      <Text>Signout</Text>
      </ListItem>
      
      </List>
      
    
    </View>
  )
 }
}
//export default CustomDrawerContent;