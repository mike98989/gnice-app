import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../../components/custom_style'; 
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import * as Logic from '../../../methods/Logic';


const Car_form = (props) => (
    <View>    
            <Picker
              title="Select Make"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Make"
              showSearch
              value={props.that.state.carMakeDropDownValue}
              onChange={item => Logic.onCarMakeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.car_makes).map(([i, value]) => {
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
              value={props.that.state.carModelDropDownValue}
              onChange={item => Logic.onCarModelValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.that.state.carModelListSelected !== [] ? (
                    Object.entries(props.that.state.carModelListSelected).map(([a, value]) => {
                        return <Picker.Item key={a} label={value.model} value={a} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
        
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Trim</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Trim" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.trim} onChangeText={(trim) =>props.that.setState({trim})}
        /> 
     {/* <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Property Types</Text> 
            <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={props.that.state.propertyTypeSelected}
              onValueChange={props.propertyTypeChange.bind(this)}
            >
             {props.that.state.required_tables !== [] ? (
                    Object.entries(props.that.state.required_tables.property_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}       

            </Picker>*/}

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Color</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Color" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.color} onChangeText={(color) =>props.that.setState({color})}
        />

        <Picker
              title="Registered Car?"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="--Registered Car?--"
              showSearch
              value={props.that.state.registeredCarDropDownValue}
              onChange={item => Logic.onRegisteredCarValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            <Picker.Item label="NO" value="NO" />
            <Picker.Item label="YES" value="YES" />
                   
            </Picker>

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Seats</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Seats" keyboardType="number-pad" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.seats} onChangeText={(seats) =>props.that.setState({seats})}
        /> 
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Number of Cylinders</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Number of cylinders" keyboardType="number-pad" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.cylinders} onChangeText={(cylinders) =>props.that.setState({cylinders})}
        />   
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Engine Size</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Engine Size" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.engine_size} onChangeText={(engine_size) =>props.that.setState({engine_size})}
        />  

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Horse Power</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Horse Power" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.horse_power} onChangeText={(horse_power) =>props.that.setState({horse_power})}
        />  

            
        <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Body Type"
              showSearch
              placeholder="Select Body Type"
              value={props.that.state.carBodyTypeDropDownValue}
              onChange={item => Logic.onCarBodyTypeValueChange(item,props.that)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
              {
                    Object.entries(props.that.state.required_tables.car_body_types).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.type} value={i} />;
                    })
                }    
        </Picker>

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Year of Manufacture</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Year of Manufacture" keyboardType="number-pad" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.year_of_manufacture} onChangeText={(year_of_manufacture) =>props.that.setState({year_of_manufacture})}
        />  

        <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Fuel"
              showSearch
              placeholder="Select Fuel"
              value={props.that.state.carFuelDropDownValue}
              onChange={item => Logic.onCarFuelValueChange(item,props.that)}
            >
              {
                    Object.entries(props.that.state.required_tables.fuels).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.fuel} value={i} />;
                    })
                }    
        </Picker>

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Mileage</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Mileage" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.mileage} onChangeText={(mileage) =>props.that.setState({mileage})}
        />  

        <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Transmission"
              showSearch
              placeholder="Select Transmission"
              value={props.that.state.carTransmissionDropDownValue}
              onChange={item => Logic.onCarTransmissionValueChange(item,props.that)}
            >
              {
                    Object.entries(props.that.state.required_tables.transmission).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.transmission} value={i} />;
                    })
                }    
        </Picker>
        

        <Text style={[{marginBottom:5,paddingLeft:10}]}>VIN</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="VIN" keyboardType="default" selectionColor={'#1688EA'}
        placeholderTextColor="grey" selectionColor={'#1688EA'} value={props.that.state.vin} onChangeText={(vin) =>props.that.setState({vin})}
        />  

        <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Drive Train"
              showSearch
              placeholder="Select Drive Train"
              value={props.that.state.carDriveTrainDropDownValue}
              onChange={item => Logic.onCarDriveTrainValueChange(item,props.that)}
            >
              {
                    Object.entries(props.that.state.required_tables.drivetrains).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.drivetrain} value={i} />;
                    })
                }    
        </Picker>

    </View>
)

export default Car_form;