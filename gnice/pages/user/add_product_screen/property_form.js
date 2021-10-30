import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import * as Logic from '../../../methods/Logic';
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line


const Property_form = (props) => (
    <View>    
    <Picker
              title="Select Property Type"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Property Type"
              showSearch
              value={props.that.state.propertyTypeDropDownValue}
              onChange={item => Logic.onPropertyTypeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.property_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Square Meters</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Square Meters" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey"  selectionColor={'#1688EA'} value={props.that.state.square_meters} onChangeText={(square_meters) =>props.that.setState({sqare_meters}) }
            />
    </View>
)

export default Property_form;