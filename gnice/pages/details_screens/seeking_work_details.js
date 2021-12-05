import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Seeking_work_details = (props) => (
    <>
    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.job_type}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>JOB TYPE</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.employment_status}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>EMPLOYMENT STATUS</Text>  
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.education}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>EDUCATION</Text>  
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.certifications}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>CERTIFICATIONS</Text>
    </View>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.gender}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>GENDER</Text>        
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.marital_status}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MARITAL STATUS</Text>    
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.still_studying}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>STILL STUDYING</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.age}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>AGE</Text>
    </View>
    </View>

    <View style={[custom_style.product_details_container]}>   
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.skills}</Text>   
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>Skills</Text> 
     
    </View>
    </>
)

export default Seeking_work_details;