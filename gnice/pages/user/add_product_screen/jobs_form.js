import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground,Pressable} from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CurrencyInput from 'react-native-currency-input';

const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);

  };



const Jobs_form = (props) => (
    <View>
    <Text style={[{marginBottom:5,paddingLeft:10}]}>Company Name</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Company Name" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.company_name} onChangeText={(company_name) =>props.that.setState({company_name}) }/>
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

    <Text style={[{marginBottom:5,paddingLeft:10}]}>Minimum Years of Experience</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Minimum Years of Experience" keyboardType="number-pad" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.min_years_experience} onChangeText={(min_years_experience) =>props.that.setState({min_years_experience}) }
    />

  <Text style={[{marginBottom:5,paddingLeft:10}]}>Responsibilities</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Responsibilities" keyboardType="default" selectionColor={'#1688EA'}  multiline={true}
    placeholderTextColor="grey" value={props.that.state.responsibilities} onChangeText={(responsibilities) =>props.that.setState({responsibilities}) }
    />

  <Text style={[{marginBottom:5,paddingLeft:10}]}>Requirements and Skills</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Requirements and Skills" keyboardType="default" selectionColor={'#1688EA'}  multiline={true}
    placeholderTextColor="grey" value={props.that.state.skills} onChangeText={(skills) =>props.that.setState({skills}) }
    />

  <Text style={[{marginBottom:5,paddingLeft:10}]}>Minimum Qualification</Text> 
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Miminum Qualification" keyboardType="default" selectionColor={'#1688EA'}  multiline={true}
    placeholderTextColor="grey" value={props.that.state.min_qualification} onChangeText={(min_qualification) =>props.that.setState({min_qualification}) }
    />

    <Text style={[{marginBottom:5,paddingLeft:10}]}>Application Deadline</Text>
    <TouchableOpacity onPress={()=>{props.that.setState({showDatePicker:true})}}>
    <View pointerEvents="none">    
    <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="YYYY-MM-DD" keyboardType="default" selectionColor={'#1688EA'}
    placeholderTextColor="grey" value={props.that.state.application_deadline} onChangeText={(application_deadline) =>props.that.setState({application_deadline})}
    />
    </View>
    </TouchableOpacity>
    {/* {props.that.state.showDatePicker && ( */}
    {/* <DateTimePicker
        isVisible={false}
        testID="dateTimePicker"
        value={props.that.state.application_deadline_date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={Logic.onapplicationDateChange}
      /> */}
    {/* )} */}

    <DateTimePickerModal
        isVisible={props.that.state.showDatePicker}
        mode="date"
        date={new Date(props.that.state.application_deadline)}
        //onConfirm={handleConfirm}
        onConfirm={(date)=>{
        var new_date = date.getFullYear()+'-'+("0"+(date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);props.that.setState({showDatePicker:false,application_deadline:new_date})}}
        onCancel={()=>{props.that.setState({showDatePicker:false})}}
      />
    
            <Text style={[{marginBottom:5,paddingLeft:10}]}>Salary</Text> 
            <View style={{flexDirection:'row'}}>
            <View style={[custom_style.formcontrol_product_screen,{backgroundColor:'#ccc',width:40,borderRadius:0,alignItems:'center',alignContent:'center',paddingLeft:0}]}>
              <Text style={{fontWeight:'bold',paddingTop:9}}>N</Text></View>

              <CurrencyInput
              value={props.that.state.salary}
              onChangeValue={(salary) =>props.that.setState({salary}) }
              prefix=""
              delimiter=","
              separator="."
              precision={0}
              style={[custom_style.formcontrol,{height:40,paddingTop:13,paddingLeft:8,borderTopLeftRadius:0,borderBottomLeftRadius:0,borderTopRightRadius:10,borderBottomRightRadius:10,width:280}]}
              />
    
              {/* <TextInput style={[custom_style.formcontrol,{height:40,paddingTop:13,paddingLeft:8,borderTopLeftRadius:0,borderBottomLeftRadius:0,borderTopRightRadius:10,borderBottomRightRadius:10,width:280}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Price" keyboardType="number-pad" selectionColor={'#1688EA'}
            placeholderTextColor="grey" onChangeText={(price) =>this.setState({price}) }
            /> */}
            </View>

    </View>
)

export default Jobs_form;