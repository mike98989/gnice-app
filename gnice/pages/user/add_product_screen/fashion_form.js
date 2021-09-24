import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input, Picker,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 


const Fashion_form = (props) => (
    <View>    
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Size</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Size" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(size) =>props.that.setState({size}) }
            /> 
    </View>
)

export default Fashion_form;