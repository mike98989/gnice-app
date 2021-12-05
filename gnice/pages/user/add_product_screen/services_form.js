import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';


const Services_form = (props) => (
    <View>    
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Company Name</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Company Name" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.company_name} onChangeText={(company_name) =>props.that.setState({company_name}) }
    />
    {/* <Text style={[{marginBottom:5,paddingLeft:10}]}>Work Experience</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Work Experience" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.work_experience} onChangeText={(work_experience) =>props.that.setState({work_experience}) }
    /> */}
    </View>

    
)

export default Services_form;