import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';


const Phone_form = (props) => (
    <View>    
    
    <Picker
              title="Select Brand"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Brand"
              showSearch
              value={props.that.state.phoneMakeSelected}
              onChange={item => Logic.onPhoneMakeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.phone_makes).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.make} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
  
            <Picker
              title="Select Model"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Model"
              showSearch
              value={props.that.state.phoneModelArraySelected}
              onChange={item => Logic.onPhoneModelValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.phoneModelListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.model} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

            
     {/* <Text style={[{marginBottom:5,paddingLeft:10}]}>Square Meters</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Square Meters" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(price) =>this.setState({price}) }
            /> */}
    </View>
)

export default Phone_form;