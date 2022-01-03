import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../methods/Logic';


const Car_details = (props) => (
    <>
    <View style={[custom_style.product_details_container]}>     
    <View style={{flexDirection:'row',width:'100%'}}>
    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/gear_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.transmission_type_vehicle}</Text>
    </View>
    
    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/fuel_pump_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.fuel_vehicle}</Text> 
    </View>

    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/odometer_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.mileage_vehicle} km</Text> 
    </View>

    <View style={{flexDirection:'column',alignItems:'center',width:'25%'}}>
    <View style={custom_style.details_icon}>
    <Image source={require('../../images/buy_car_icon.png')}  style={{height: 30, width:30}}/>
    </View> 
    <Text style={{fontSize:11}}>{props.that.props.route.params.paramsdata.condition_state}</Text> 
    </View>

    </View>

    </View>

    <View style={[custom_style.product_details_container,{flexDirection:'row'}]}>
    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.brand}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MAKE</Text>    
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.model}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>MODEL</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.color}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>COLOR</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.year_of_manufacture}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>YEAR</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.seats_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SEATS</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.trim_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>TRIM</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.number_of_cylinders}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>NO. OF CYLINDERS</Text> 
    </View>

    <View style={{flexDirection:'column',alignContent:'center',width:'50%'}}>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.registered_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>REGISTERED?</Text>    
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.drivetrain_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>DRIVETRAIN</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.horse_power_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>HORSE POWER</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.body_type_vehicle}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>BODY TYPE</Text>
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.second_condition}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>SECOND CONDITION</Text> 
    <Text style={{fontSize:12}}>{props.that.props.route.params.paramsdata.engine_size}</Text>    
    <Text style={{fontSize:10,color:'#aaa',marginBottom:10}}>ENGINE SIZE</Text> 
    </View>
    </View>
    </>
)

export default Car_details;