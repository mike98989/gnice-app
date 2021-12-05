import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Fashion_details = (props) => (
    <>
    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.fashion_brand}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>BRAND</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.condition_state}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>CONDITION</Text>  
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.gender}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>GENDER</Text>    
    </View>

    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.color}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>COLOR</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.size}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SIZE</Text>
    </View>
    </View>
    </>
)

export default Fashion_details;