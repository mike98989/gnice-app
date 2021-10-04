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
      let paramsValue = JSON.parse(this.props.route.params.paramsdata);
    return(
        <Container style={[{justifyContent:'center',backgroundColor:'#d4d6d7'}]}>

        <View>
        {this.props.route.params.transStatus!='success'?(  
        <Image source={require('../images/cancel_icon.png')}  style={{alignSelf:'center',height: 60, width:60}}/>
        ):null}

        {this.props.route.params.transStatus=='success'?(  
        <Image source={require('../images/ok_icon.png')}  style={{alignSelf:'center',height: 65, width:65}}/>
        ):null}

          {this.props.route.params.transRef?(
            <View>
            <Text style={{textAlign:'center',fontWeight:'bold'}}>Transaction Status</Text>
            {this.props.route.params.transStatus=='success'?(
              <Text  style={{textAlign:'center'}}>Your Transaction was successful. Your transaction reference is <Text style={{fontWeight:'bold'}}>{this.props.route.params.transRef}</Text>.</Text>
            ):
            <Text style="textAlign:center;">Your Tranaction failed. Your transaction reference is <Text style={{fontWeight:'bold'}}>{this.props.route.params.transRef}</Text>.</Text>
            }
            </View>
          ):null}
          
           {paramsValue ? (  
          <View style={[{width:'80%',justifyContent:'center', alignItems:'center',alignSelf:'center'}]}>
            <Text style={{fontSize:14,textAlign:'center',fontWeight:'bold'}}>Your account have been renewed on <Text style={{fontSize:18}}>{paramsValue.seller_account_details.title}</Text> Package</Text>
        </View>
           ):null}

     

            <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'LandingScreen',null)} style={[custom_style.login_btn,custom_style.right_border_radius,custom_style.left_border_radius,{alignSelf:'center',marginTop:10,backgroundColor:'#ff6347'}]}>
            <Text style={{color:'#fff'}}>Goto Home</Text>
            </TouchableOpacity>
        </View>

        
        
        </Container>
	);
	}
}