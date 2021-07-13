import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../../components/custom_style';
import MainFooter from '../../components/MainFooter';
import * as Nav from '../../methods/Navigation'
import * as AsyncMethods from '../../methods/AsyncMethods';
import * as Requests from '../../methods/Requests';
import * as Logic from '../../methods/Logic';



export default class Pinned extends Component <{}>{


	constructor(props){
    super(props);
    
  	}

    state = {
      showLoader:true,
      
    }


    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
    
        this._loadInitialState().done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
            Requests.fetch_all_user_products(this); 
          });
      
      }
      
      _loadInitialState = async()=>{  
      Requests.fetch_all_user_products(this);
      }


    render(){
    return(
        <Container style={{backgroundColor:'#fff'}}>
        <View style={[custom_style.container,{justifyContent:'center', alignItems:'center'}]}>
            <Text>My Products</Text>

            
        </View>
        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            /> 
        </Container>
	);
	}
}