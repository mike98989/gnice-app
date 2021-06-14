import React, {Component} from 'react';
import { StyleSheet,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../components/MainHeader';
import * as Nav from '../methods/Navigation'

export default class Home extends Component <{}>{

	constructor(props){
    super(props);
    
  	}

 

    render(){
    return(
    <Container>
        <MainHeader header_type="transparent" nav_type="complete" title="Product" profileImageClick={Nav._openscreen.bind(this,this.props,'UserLogin')} cartImageClick={Nav._openscreen.bind(this,this.props,'Cart')} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={custom_style.container}>
        <Text>Product Page</Text>
        </View>
        
    </Container>
	);
	}
}