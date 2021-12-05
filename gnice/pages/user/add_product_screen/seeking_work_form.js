import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';


const Seeking_work_form = (props) => (
    <View>    
    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}>        
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

    </View>
    <View style={custom_style.split_form_right}>
    <Picker
              title="Select Marital Status"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Marital Status"
              showSearch
              value={props.that.state.maritalStatusDropDownValue}
              onChange={item => Logic.onMaritalStatusValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.marital_status).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.marital_status} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
    </View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}>  
    <Picker
              title="Select Employment Status"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Employment Status"
              showSearch
              value={props.that.state.employmentStatusDropDownValue}
              onChange={item => Logic.onEmploymentStatusValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.employment_status).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.employment_status} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
    </View>
    <View style={custom_style.split_form_right}>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Age</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Age" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.age} onChangeText={(age) =>props.that.setState({age}) }
    />
    </View>
    </View>

    <Picker
              title="Select Education Level"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Education Level"
              showSearch
              value={props.that.state.degreeTypeDropDownValue}
              onChange={item => Logic.onDegreeTypeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.degree_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

    <View>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Certifications <Text style={{fontSize:8}}>Seperate skills using comma</Text></Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="certifications" keyboardType="default"
    placeholderTextColor="grey" value={props.that.state.certifications} onChangeText={(certifications) =>props.that.setState({certifications})} selectionColor={'#1688EA'}
    />
    </View>

    <View>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Skills <Text style={{fontSize:8}}>Seperate skills using comma</Text></Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Skills" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.skills} onChangeText={(skills) =>props.that.setState({skills}) }
    />
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={custom_style.split_form_left}> 
    <Picker
              title="Select Job Type"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Job Type"
              showSearch
              value={props.that.state.jobTypeDropDownValue}
              onChange={item => Logic.onJobTypeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.job_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
    </View>
    <View style={custom_style.split_form_right}>
    <Picker
              title="Still Studying?"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="--Still Studying?--"
              showSearch
              value={props.that.state.studyingDropDownValue}
              onChange={item => Logic.onStudyingValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            <Picker.Item label="YES" value="YES" />
            <Picker.Item label="NO" value="NO" />
                  
            </Picker>
    </View>
    </View>


    </View>
)

export default Seeking_work_form;