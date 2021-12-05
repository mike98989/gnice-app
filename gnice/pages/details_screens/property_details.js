import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Property_details = (props) => (
    <>
    {props.that.state.subCategorySelected!='44' && props.that.state.subCategorySelected!='45'? (
    <View style={[custom_style.product_details_container]}>     
    <View style={{flexDirection:'row',width:'100%'}}>
    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/house_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.build_type}</Text>
    </View>
    
    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/bed_icon.png')}  style={{height: 25, width:33}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.number_of_bedrooms} bedrooms</Text> 
    </View>

    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/bath_tub_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.number_of_bathrooms} bathrooms</Text> 
    </View>
    {props.that.props.route.params.paramsdata.has_parking=='YES' ? (
    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/car_icon.png')}  style={{height: 26, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>Parking</Text> 
    </View>
    ):null}
    

    </View>

    </View>
    ):null}

    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.property_size}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>PROPERTY SIZE</Text> 
    </View>

    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.condition_state}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>CONDITION</Text>    
    </View>
    </View>

    <View style={[custom_style.product_details_container,{flexDirection:'column'}]}>
    <Text style={{marginBottom:10}}>PROPERTY LOCATION</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.property_address}</Text>    
    </View>
    </>
)

export default Property_details;