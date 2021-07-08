import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input, Picker,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 


const Property_form = (props) => (
    <View>    
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Property Type</Text>  
            <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
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

            </Picker>

     <Text style={[{marginBottom:5,paddingLeft:10}]}>Square Meters</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Square Meters" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(price) =>this.setState({price}) }
            />
    </View>
)

export default Property_form;