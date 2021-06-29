import React, {Component} from 'react';
import {View,Text,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landingscreen from './user/LandingScreen';
import Home from './Home';
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast,Root} from "native-base";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default class UserScreen extends Component<{}> {
    constructor(props){
        super(props);
        this.default_screen = "Landingscreen";
    }

    state={
        userToken:'',
        userData:[],
    }
  
  componentWillUnmount() {  
  Toast.toastInstance = null;     
  }

  componentDidMount =()=> {
    this._loadInitialState().done();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      alert('call this one');   
      });

  }

  
  _loadInitialState = async()=>{
    var token = await AsyncStorage.getItem('user-token');
    var datavalue = await AsyncStorage.getItem('user-data');
    var dataObject = JSON.parse(datavalue);
    
    if((token!=null)&&(token !='')){
    this.setState({
        userID:dataObject.id,
        userToken:token,
        userData:dataObject,
      })  
    }else{
    AsyncStorage.clear();
    Toast.show({text: "Invalid Token!",buttonText: "",position: "bottom"});
    var props = this.props.navigation;
    props.navigate('UserLogin');
    // setTimeout(function(){ 
    //     props.navigate('UserLogin');
    // }, 0);
    
    }
  
    }
    
  render(){  
  return (
    <Root>
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName={this.default_screen} drawerContentOptions={{
    activeTintColor: '#e91e63',
    }}>
    <Drawer.Screen name="Landingscreen" parent_navigation={this.props.navigate} options={{ drawerLabel: 'Landingscreen' }} component={Landingscreen} />
    </Drawer.Navigator>
    </NavigationContainer>

    </Root>
    )}
}