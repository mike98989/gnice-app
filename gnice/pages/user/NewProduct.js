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
import Phones_form from './add_product_screen/phones_form';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';


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
      phoneModelListSelected:[],
      lgalListSelected:[],
      carMakeSelected:'0',
      carModelSelected:'0',
      phoneMakeSelected:'0',
      phoneModelSelected:'0',
      required_tables:[],
      formGroup:'',
      stateSelected:'',
      lgaSelected:'',
      
      
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
      

     chooseImage = () => {
        //chooseFile = () => {
          var options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.showImagePicker(options, response => {
            //console.log('Response = ', response);
      
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              //console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              let source = response;
              // You can also display the image using data:
              //console.log(source.fileSize);
              //console.log(JSON.parse(JSON.stringify(source)));
              //console.log(JSON.stringify(source.filename))
              //let source = { uri: 'data:image/jpeg;base64,' + response.data };
              
              this.setState({
                filePath: source,
                isGroupImageSelected:true,
                showLoader:that.state.isNotPickerModal ? false : true,
                pickerModal:true,
              });
            }
          });
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

        else if(objectval.sub_id=='7'){
          this.setState({ 
              formGroup: 'phones',
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
       
       onStateValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.required_tables.states[value]));   
         this.setState({
        lgalListSelected: objectval.lgas,  
        stateSelected:value,  
         });
       }

       onlgaValueChange(props,value) {
        //let objectval = JSON.parse(JSON.stringify(this.state.required_tables.states[value]));   
         this.setState({  
        lgaSelected:value,  
         });
       }

       onPhoneMakeValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.required_tables.phone_makes[value]));   
         this.setState({
        phoneMakeSelected:value,  
         phoneModelListSelected: objectval.phone_models
         });
         
       }
       
       onPhoneModelValueChange(props,value) {
        this.setState({
        phoneModelSelected:value,  
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
        <ScrollView style={{marginBottom:50}}>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"position"}>
        <View style={{flexDirection:'column',alignItems:'center'}}>
        <View>
        
        <Form>

        <Text style={[custom_style.product_details_title,{textAlign:'center',marginBottom:20,fontFamily:'Rajdhani'}]}>New Advert</Text>   
        

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Category</Text> 
          
        <Picker style={[custom_style.formcontrol_product_screen,{color:'#ccc'}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
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
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
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
            {this.state.formGroup == 'phones' ? (
            <View>  
            <Phones_form state={this.state}  phoneMakeChange = {this.onPhoneMakeValueChange.bind(this,this.props)} phoneModelChange={this.onPhoneModelValueChange.bind(this,this.props)}/>
            </View>
            ):null
            }
           
           <Text style={[{marginBottom:5,paddingLeft:10}]}>Select State Region</Text>   
           <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.stateSelected}
              onValueChange={this.onStateValueChange.bind(this)}
            >
                {
                    Object.entries(this.state.required_tables.states).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.state} value={i} />;
                    })
                  }
                <Picker.Item label="Select State" value="" />
            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Local Region</Text>   
           <Picker style={[custom_style.formcontrol_product_screen]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.lgaSelected}
              onValueChange={this.onlgaValueChange.bind(this)}
            >
                {
                    Object.entries(this.state.lgalListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.Lga} value={i} />;
                    })
                  }
                <Picker.Item label="Select LGA" value="" />
            </Picker>

           <Text style={[{marginBottom:5,paddingLeft:10}]}>Title</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(title) =>this.setState({title}) }
            />

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Price</Text> 
            <View style={{flexDirection:'row'}}>
            <View style={[custom_style.formcontrol_product_screen,{backgroundColor:'#ccc',width:35,borderRadius:0,alignItems:'center',alignContent:'center',paddingLeft:0}]}>
              <Text style={{fontWeight:'bold',paddingTop:3}}>N</Text></View><TextInput style={[custom_style.formcontrol_product_screen,{borderTopLeftRadius:0,borderBottomLeftRadius:0,width:315}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Price" keyboardType="number-pad" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(price) =>this.setState({price}) }
            />
            </View>

            <View style={{flexDirection:'row',marginVertical:15}}>
            <CheckBox value={false} onValueChange={(negotiable_price) => {this.setState({negotiable_price})}} style={custom_style.signup_checkbox}/>
            <Text style={{fontSize:16,color:'#555'}}>Price is negotiable</Text>
          </View>

            
            </View>
            ):null}
            
            
            <Text style={[{marginBottom:5,paddingLeft:10}]}>Name</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.fullname} editable={false}
            />
            <Text style={[{marginBottom:5,paddingLeft:10}]}>Phone Number</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.phone} editable={false}
            />

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={this.chooseImage()}>
                  <View style={custom_style.image_pick}>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12}}>Browse Image</Text>
                  </View>
                  </TouchableOpacity>
            </View>

          </Form>
        

      <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginBottom:30}}> 
    <LinearGradient colors={['#266469', '#4983b5', '#388db1']} onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}
      style={[custom_style.action_call_btn,{marginRight:5,height:50}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}}>
      {this.state.showLoader ?(
        <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
      <Text style={{fontSize:16,color:'#fff'}}>POST ADS </Text>
      <Image source={require('../../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 50, width:30}}/> 
      </TouchableOpacity>
    </LinearGradient>


    
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