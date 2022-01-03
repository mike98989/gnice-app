import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Services_details = (props) => (
    <>
    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.company_name}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>COMPANY NAME</Text>
    </View>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
   
    </View>
    </View>

    </>
)

export default Services_details;