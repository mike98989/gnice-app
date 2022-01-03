import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import * as Logic from '../../../methods/Logic';
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line


const Property_form = (props) => (
    <View>    
    {props.that.state.subCategorySelected =='44' || props.that.state.subCategorySelected =='45' ? (    
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
             ):null}
            {props.that.state.subCategorySelected!='44' && props.that.state.subCategorySelected!='45'? (
                <>
            <Picker
              title="Select Building Type"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Building Type"
              showSearch
              value={props.that.state.propertyBuildTypeDropDownValue}
              onChange={item => Logic.onPropertyBuildTypeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.build_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
            {/* )}
            {props.that.state.subCategorySelected!='44' && props.that.state.subCategorySelected!='45'?( */}
            <View style={{flexDirection:'row'}}>
            <View style={custom_style.split_form_left}> 
             <Text style={[{marginBottom:5,paddingLeft:10}]}>Number of bathrooms</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="No. of bathroom" keyboardType="number-pad"
            placeholderTextColor="grey"  selectionColor={'#1688EA'} value={props.that.state.no_of_bathrooms} onChangeText={(no_of_bathrooms) =>props.that.setState({no_of_bathrooms}) }
            />
            </View>
            <View style={custom_style.split_form_right}>
            <Text style={[{marginBottom:5,paddingLeft:10}]}>Number of bedrooms</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="No. of bedroom" keyboardType="number-pad"
            placeholderTextColor="grey"  selectionColor={'#1688EA'} value={props.that.state.no_of_bedrooms} onChangeText={(no_of_bedrooms) =>props.that.setState({no_of_bedrooms}) }
            />
            </View>
            </View>
            </>
            ):null}
           

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Property Size</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Property Size" keyboardType="default"
            placeholderTextColor="grey"  selectionColor={'#1688EA'} value={props.that.state.square_meters} onChangeText={(square_meters) =>props.that.setState({square_meters}) }
            />

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Property Address</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Location of the property" keyboardType="default"
            placeholderTextColor="grey"  selectionColor={'#1688EA'} value={props.that.state.property_address} onChangeText={(property_address) =>props.that.setState({property_address}) }
            />
    </View>
)

export default Property_form;