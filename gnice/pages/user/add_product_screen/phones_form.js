import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';


const Phone_form = (props) => (
    <View>    
    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}>  
    <Picker
              title="Select Make/Brand"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Make/Brand"
              showSearch
              value={props.that.state.phoneMakeDropDownValue}
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
  </View>
  <View style={custom_style.split_form_right}>
            <Picker
              title="Select Model"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Model"
              showSearch
              value={props.that.state.phoneModelDropDownValue}
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
            </View>
            </View>
    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}>        
     <Text style={[{marginBottom:5,paddingLeft:10}]}>Ram Size</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Ram Size" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.ram_size} onChangeText={(ram_size) =>props.that.setState({ram_size}) }
    />
    </View>
    <View style={custom_style.split_form_right}>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Internal Memory</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Internal Memory" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.internal_memory} onChangeText={(internal_memory) =>props.that.setState({internal_memory}) }
    />
    </View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}>  
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Battery Capacity</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Battery Capacity" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.battery_capacity} onChangeText={(battery_capacity) =>props.that.setState({battery_capacity}) }
    />
    </View>
    <View style={custom_style.split_form_right}>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Number of Sim Card</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Number of sim card" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.no_of_sim} onChangeText={(no_of_sim) =>props.that.setState({no_of_sim}) }
    />
    </View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}> 
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Main Camera</Text>   
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Main Camera" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.main_camera} onChangeText={(main_camera) =>props.that.setState({main_camera}) }
    />
    {/* <Picker
              title="Main Camera?"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="--Main Camera?--"
              showSearch
              value={props.that.state.mainCameraDropDownValue}
              onChange={item => Logic.onMainCameraValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            <Picker.Item label="NO" value="NO" />
            <Picker.Item label="YES" value="YES" />
                   
            </Picker> */}
    </View> 

    <View style={custom_style.split_form_right}>   
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Selfie Camera</Text>  
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Selfie Camera" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.selfie_camera} onChangeText={(selfie_camera) =>props.that.setState({selfie_camera}) }
    />
    {/* <Picker
              title="Selfie Camera?"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="--Selfie Camera?--"
              showSearch
              value={props.that.state.selfieCameraDropDownValue}
              onChange={item => Logic.onSelfieCameraValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            <Picker.Item label="NO" value="NO" />
            <Picker.Item label="YES" value="YES" />
                   
            </Picker> */}
    </View>
    </View>

    <Text style={[{marginBottom:5,paddingLeft:10}]}>Phone Resolution</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Phone Resolution" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.resolution} onChangeText={(resolution) =>props.that.setState({resolution}) }
    />


    </View>
)

export default Phone_form;