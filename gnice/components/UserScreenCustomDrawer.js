import React, {Component} from 'react';
import { Badge,ListItem, List, Left,Right, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import { DrawerContentScrollView} from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import {View,Text,StatusBar,KeyboardAvoidingView,Button,
  TextInput,TouchableOpacity,Image,ImageBackground,
} from 'react-native';

import {custom_style} from '../components/custom_style';

//export function CustomDrawerContent(props) {
const CustomDrawerContent = (props) => (
  
  //alert(JSON.stringify(props.that.state)),
 //let { func } = props;
  //return (
    <View {...props} style={[custom_style.fullHeight,{paddingVertical:80,paddingLeft:10,marginVertical:0,backgroundColor:'#ddd'}]}>
   
      <List>
      
      <ListItem noIndent onPress={() => props.navigation.navigate('Home')}>
        <Text>Home</Text>
      </ListItem>
      
      <ListItem noIndent onPress={() => props.navigation.navigate('MyProfile')}>
      <Text>My Profile</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('MyProducts')}>
      <Text>My Products</Text>
      </ListItem>

      <ListItem noIndent onPress={() => props.navigation.navigate('ClientsResponse')}>
      <Text>Client's Response</Text>
      </ListItem>
      
      </List>
      
    
    </View>
  );
export default CustomDrawerContent;