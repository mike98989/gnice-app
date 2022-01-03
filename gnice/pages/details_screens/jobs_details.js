import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Job_details = (props) => (
    <>
    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.company_name}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>COMPANY NAME</Text>     
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.job_type}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>JOB TYPE</Text>  
    </View>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.minimum_years_experience}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MINIMUM EXPERIENCE</Text>        
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.application_deadline}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>APPLICATION DEADLINE</Text>
    </View>
    </View>

    <View style={[custom_style.product_details_container]}>   
    <Text style={[custom_style.product_details_title,{color:'#3f80a3',fontSize:14}]}>Responsibilities</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.responsibilities}</Text>   
    </View>
    <View style={[custom_style.product_details_container]}>   
    <Text style={[custom_style.product_details_title,{color:'#3f80a3',fontSize:14}]}>Requirements and Skills</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.skills}</Text>   
    </View>
    <View style={[custom_style.product_details_container]}>   
    <Text style={[custom_style.product_details_title,{color:'#3f80a3',fontSize:14}]}>Minimum Qualification Requirements</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.minimum_qualification}</Text>   
    </View>
    </>
)

export default Job_details;