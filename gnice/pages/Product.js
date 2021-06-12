import React, {Component} from 'react';
import { StyleSheet,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../components/MainHeader'

export default class Home extends Component <{}>{

	constructor(props){
    super(props);
    
  	}

    _opendrawer = () => {
        this.props.navigation.openDrawer();
     }  

    render(){
    return(
    <Container>
        <MainHeader header_type="transparent" title="Gnice" openDrawer={this._opendrawer.bind(this)}/>
        <View style={custom_style.container}>
        <Text>Product Page</Text>
        </View>
        
    </Container>
	);
	}
}