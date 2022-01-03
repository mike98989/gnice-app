import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';

const Fashion_form = (props) => (
    <View> 
    <Picker
              title="Select Fashion Brand"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Fashion Brand"
              showSearch
              value={props.that.state.fashionBrandDropDownValue}
              onChange={item => Logic.onFashionBrandValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.fashion_brands).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.brand} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

     <Picker
              title="Gender"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="--Gender--"
              showSearch
              value={props.that.state.genderDropDownValue}
              onChange={item => Logic.onGenderValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Complicated" value="Complicated" />       
            </Picker>
    

        <View style={{flexDirection:'row'}}>
       <View style={custom_style.split_form_left}> 
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Size</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Size" keyboardType="number-pad" selectionColor={'#1688EA'}
            placeholderTextColor="grey" value={props.that.state.size} onChangeText={(size) =>props.that.setState({size}) }
            /> 
        </View>
        <View style={custom_style.split_form_right}>     
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Color</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Color" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.color} onChangeText={(color) =>props.that.setState({color})}
        />
        </View>
        </View>
    </View>
)

export default Fashion_form;