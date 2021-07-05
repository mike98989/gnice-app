import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content,Item,Label,Input, Picker,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
import * as Requests from '../../methods/Requests';
import Car_form from './add_product_screen/car_form';
import Property_form from './add_product_screen/property_form';

//import RNPickerSelect from 'react-native-picker-select';
//import {Picker} from '@react-native-picker/picker';

//import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LandingScreen extends Component <{}>{

	constructor(props){
    super(props);
  	}

    state = {
      userData:[],
      categories_and_sub:[],
      categorySelected:'0',
      propertyTypeSelected:'0',
      subCategoryListSelected:[],
      subCategorySelected:'',
      carModelListSelected:[],
      carMakeSelected:'0',
      carModelSelected:'0',
      required_tables:[],
      formGroup:'',
      
    }

    
    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
    
        this._loadInitialState().done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
            Requests.fetch_all_categories_and_sub_categories(this);  
            Requests.fetch_required_table(this);
          });
      
      }
      
      _loadInitialState = async()=>{  
      Requests.fetch_all_categories_and_sub_categories(this);
      Requests.fetch_required_table(this);
      }
     
      onCategoryValueChange(value) {
       let objectval = JSON.parse(JSON.stringify(this.state.categories_and_sub[value]));   
        this.setState({
        categorySelected:value,  
        subCategoryListSelected: objectval.subcategory
        });
        //alert(JSON.stringify(this.state.subcategoryselected));
        
      }

      onSubCategoryValueChange(value) {
        let objectval = JSON.parse(JSON.stringify(this.state.subCategoryListSelected[value]));  
        this.setState({ 
            subCategorySelected: value,
            showProductForm:true,
        }); 

        if(objectval.sub_id=='27'){
            this.setState({ 
                formGroup: 'cars',
            }); 
        }
        else if(objectval.sub_id=='42'){
            this.setState({ 
                formGroup: 'properties',
            }); 
        }
         
       }

       onCarMakeValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.required_tables.car_makes[value]));   
         this.setState({
        carMakeSelected:value,  
         carModelListSelected: objectval.car_models
         });
         
       }

       onCarModelValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.carModelListSelected[value]));   
         this.setState({
        carModelSelected:value,  
         });
       }

       onPropertyTypeValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.required_tables.property_types[value]));   
         this.setState({
        propertyTypeSelected:value,  
         });
         
         
       }
       

  
    render(){
    return(
        
    <Container>
      <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'15%',paddingTop:3,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <View style={[custom_style.container]}>
        <View style={[{justifyContent:'center',marginBottom:0}]}>  
        <View> 
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        <ScrollView>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"position"}>
        <View style={{flexDirection:'column',alignItems:'center'}}>
        <View>
        
        <Form>

        <Text style={[custom_style.product_details_title,{textAlign:'center',marginBottom:20}]}>New Advert</Text>   
        

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Category</Text> 
          
        <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.categorySelected}
              onValueChange={this.onCategoryValueChange.bind(this)}
            >
            {this.state.categories_and_sub !== [] ? (
                    Object.entries(this.state.categories_and_sub).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                ) : (
                    <Picker.Item label="Loading..." value="0" />
                )}    
             
            
            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Sub Category</Text>   
            <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.subCategorySelected}
              onValueChange={this.onSubCategoryValueChange.bind(this)}
            >
            {
                    Object.entries(this.state.subCategoryListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                }    
             <Picker.Item label="Select Category" value=""/>
            
            </Picker>
            {this.state.showProductForm ? (
            <View>
            {this.state.formGroup == 'cars' ? (
            <View>       
            <Car_form state={this.state} carMakeChange={this.onCarMakeValueChange.bind(this,this.props)} carModelChange={this.onCarModelValueChange.bind(this,this.props)} />
            </View>
            ):null
            }
            {this.state.formGroup == 'properties' ? (
            <View>  
            <Property_form state={this.state}  propertyTypeChange = {this.onPropertyTypeValueChange.bind(this,this.props)} />
            </View>
            ):null
            }
           
           
           <Text style={[{marginBottom:5,paddingLeft:10}]}>Title</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(title) =>this.setState({title}) }
            />

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Price</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Price" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(price) =>this.setState({price}) }
            />
            
            </View>
            ):null}
            
            

          </Form>
        
          <View style={{alignItems:'center'}}>
        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',marginTop:70}]} onPress={this._signup}>
        {this.state.showLoader ?(
        <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
            
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Continue</Text><Icon name='ios-arrow-forward' style={{color:'#fff'}} />
        </TouchableOpacity>
        </View>
        
        
        </View>
        
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </View>
        </View>

        </View>
        
    </Container>
	);
	}
}