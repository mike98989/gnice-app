import React, {Component} from 'react';
import { StyleSheet,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import MainHeader from '../components/MainHeader';
import * as Nav from '../methods/Navigation'
import Carousel, {Pagination} from 'react-native-snap-carousel';


export default class Home extends Component <{}>{

	constructor(props){
    super(props);
  }

  init_carousel_content=()=>{
    this.state = {  
    activeSlide:1,   
    content:[
        {title:'image8.jpeg'},
        {title:'image9.jpeg'},
        {title:'image10.jpeg'},
            ]    
    }
    }
 

    render(){
    return(
    <Container>
      <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0, width: '100%',height:'50%',}]}></ImageBackground> 
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        {/* <View style={custom_style.container}>
        
        </View> */}

        <View style={[{margin:10,height:400,marginBottom:7,borderRadius:30,backgroundColor:'#fff',overflow:'hidden'}]}>
        <Image source={{ uri: global.serverUrl+global.imageBaseUrl+this.props.route.params.paramsdata.image}}  style={{width: '100%',height:300}}/>  
        <Text>{JSON.stringify(this.props.route.params.paramsdata)}</Text>
        </View>
        
    </Container>
	);
	}
}