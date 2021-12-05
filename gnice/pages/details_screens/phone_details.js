import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Phone_details = (props) => (
    <>
    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.brand}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>BRAND</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.condition_state}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>CONDITION</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.internal_storage}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>INTERNAL STORAGE</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.main_camera}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MAIN CAMERA</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.battery}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>BATTERY</Text>
    </View>

    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.model}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MODEL</Text>   
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.color}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>COLOR</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.second_condition}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SECOND CONDITION</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.selfie_camera}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SELFIE CAMERA</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.sim}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SIM SLOT</Text>
    </View>
    </View>
    </>
)

export default Phone_details;