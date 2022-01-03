import React, {Component,useState } from 'react';
import { Badge,ListItem, List, Left,Right, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import { DrawerContentScrollView} from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import {View,Text,StatusBar,KeyboardAvoidingView,Button,
  TextInput,TouchableOpacity,Image,ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {custom_style} from '../components/custom_style';
import * as Nav from '../methods/Navigation';

const DrawerContent  = async()=> {
//function Example() {
const [userData, setUserData] = useState([]);
var token = await AsyncStorage.getItem('user-token');
var datavalue = await AsyncStorage.getItem('user-data');
var dataObject = JSON.parse(datavalue);

setUserData(dataObject);

return (
<View style={{paddingTop:100}}><Text>{JSON.stringify(data)}</Text></View>
)
}
//export default DrawerContent;

//export function CustomDrawerContent(props) {
const CustomDrawerContent = (props) => (
 
  //console.log(props.userData),
 //let { func } = props;
  //return (
    <View {...props} style={[custom_style.fullHeight,{marginVertical:0,backgroundColor:'#ddd'}]}>
    <View style={{height:200}}>
   <ImageBackground source={require('../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'100%',paddingTop:5,}]}></ImageBackground>
    <Image source={require('../images/gnice_logo.png')}  style={{height: 25, width:25,marginTop:40,alignSelf:'flex-end'}}/>
    <TouchableOpacity onPress={Nav._openscreen.bind(this,props,'MyProfile')}>
    <Image source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+props.userData.image}}  style={{borderRadius:25,borderWidth:0.5,borderColor:'#ccc',height: 50, width:50,marginTop:10,alignSelf:'center'}}/>
    </TouchableOpacity>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{props.userData.fullname}</Text>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{props.userData.email}</Text>
    <Text style={[{marginLeft:0,fontSize:12,color:'#fff',alignSelf:'center'}]}>{props.userData.phone}</Text>
    </View>
      <List style={{paddingVertical:10,paddingLeft:10,}}>
      
      <ListItem noIndent onPress={() => props.navigation.navigate('Home')}>
        <Text>Main Home</Text>
      </ListItem>
      
      <ListItem noIndent onPress={() => props.navigation.navigate('LandingScreen')}>
      <Text>My Dashboard</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('NewProduct',{paramsdata:null})}>
      <Text>New Product</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('MyProducts')}>
      <Text>My Products</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('Messages')}>
      <Text>Messages</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('Transactions')}>
      <Text>Payment History</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('MyProfile')}>
      <Text>My Profile</Text>
      </ListItem>

      <ListItem noIndent onPress={Nav._logout.bind(this,props,'Home',null)}>
      <Text>Signout</Text>
      </ListItem>
      
      </List>
      
    
    </View>
  );
export default CustomDrawerContent;