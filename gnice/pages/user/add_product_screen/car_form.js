import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input, Picker,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 


const Car_form = (props) => (
    <View>    

    <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Make</Text> 
            <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={props.state.carMakeSelected}
              onValueChange={props.carMakeChange.bind(this)}
            >
             {props.state.required_tables !== [] ? (
                    Object.entries(props.state.required_tables.car_makes).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.make} value={i} />;
                    })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}       

            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Model</Text> 
            <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={props.state.carModelSelected}
              onValueChange={props.carModelChange.bind(this)}
            >
             {props.state.carModelListSelected !== [] ? (
                    Object.entries(props.state.carModelListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.model} value={i} />;
                    })
                ) : (
                    <Picker.Item label="Loading..." value="0" />
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
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Color" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(color) =>this.setState({color}) }
            /> 
    </View>
)

export default Car_form;