import React, {Component} from 'react';
import { Container, Header, Content,Item,Label,Input, Picker,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 


const Fashion_form = (props) => (
    <View>    
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Size</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Size" keyboardType="number-pad" selectionColor={'#1688EA'}
            placeholderTextColor="grey" value={props.that.state.size} onChangeText={(size) =>props.that.setState({size}) }
            /> 
    </View>
)

export default Fashion_form;