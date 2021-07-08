import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'



export default class Pinned extends Component <{}>{


	constructor(props){
    super(props);
    
  	}

    state = {
      showLoader:false,
    }


    render(){
    return(
        <Container style={{backgroundColor:'#d4d6d7'}}>
        <View style={[custom_style.container,{justifyContent:'center', alignItems:'center'}]}>
            <Text>Transaction Status</Text>
            <Text>{JSON.stringify(this.props.route.params.paramsdata)}</Text>
        </View>
        
        </Container>
	);
	}
}