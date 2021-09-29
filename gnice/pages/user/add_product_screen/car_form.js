import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line


const Car_form = (props) => (
    <View>    

    <Picker
              title="Select Make"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Make"
              showSearch
              value={props.state.carMakeSelected}
              onChange={item => props.carMakeChange(item)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.state.required_tables !== [] ? (
                    Object.entries(props.state.required_tables.car_makes).map(([i, value]) => {
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
              value={props.state.carModelSelected}
              onChange={item => props.carModelChange(item)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.state.carModelListSelected !== [] ? (
                    Object.entries(props.state.carModelListSelected).map(([a, value]) => {
                        return <Picker.Item key={a} label={value.model} value={a} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>


     {/* <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Property Types</Text> 
            <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={props.state.propertyTypeSelected}
              onValueChange={props.propertyTypeChange.bind(this)}
            >
             {props.state.required_tables !== [] ? (
                    Object.entries(props.state.required_tables.property_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}       

            </Picker>*/}

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Color</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Color" keyboardType="default" selectionColor="#fff"
        placeholderTextColor="grey" selectionColor={'#1688EA'} onChangeText={(color) =>props.state.setState({color}) }
        /> 
    </View>
)

export default Car_form;