import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View,Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Picker,Select, Content,Item,Label,Input,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
import * as Requests from '../../methods/Requests';
import Car_form from './add_product_screen/car_form';
import Property_form from './add_product_screen/property_form';
import Phones_form from './add_product_screen/phones_form';
import Fashion_form from './add_product_screen/fashion_form';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import * as Logic from '../../methods/Logic';


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
      categoryDropDownValue:'-1',
      conditionDropDownValue:'-1',
      conditionSelected:'0',
      propertyTypeSelected:'0',
      subCategoryListSelected:[],
      subCategorySelected:'',
      subCategoryDropDownValue:'-1',
      carModelListSelected:[],
      phoneModelListSelected:[],
      lgalListSelected:[],
      carMakeSelected:'0',
      carModelSelected:'0',
      phoneMakeSelected:'0',
      phoneModelSelected:'0',
      required_tables:[],
      formGroup:null,
      formValues:[],
      stateSelected:'',
      lgaSelected:'',
      resourcePath:[],
      uploadImageCount:0,
      color:'',
      
      
    }

    formData = new FormData();

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        //this._loadInitialState().done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
          });
      }
      
      // _loadInitialState = async()=>{  
      // Requests.fetch_all_categories_and_sub_categories(this);
      // Requests.fetch_required_table(this);
      // }
     
      update_state =()=>{
        Requests.fetch_all_categories_and_sub_categories(this);  
        Requests.fetch_required_table(this);
      }

      onCategoryValueChange(value) { 

       let objectval = JSON.parse(JSON.stringify(this.state.categories_and_sub[value]));   
        this.setState({
        categorySelected:this.state.categories_and_sub[value].id,  
        categoryDropDownValue:value,
        subCategoryListSelected: objectval.subcategory,
        });
        Logic.update_new_product_category_view(this.state.categories_and_sub[value].id,this);
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
            subCategorySelected: objectval.sub_id,
            subCategoryDropDownValue:value,
            showProductForm:true,
        }); 

        Logic.update_new_product_subcategory_view(value,this);

        }


      _add_products=()=>{
        Requests.addProducts(this);
      }

      onConditionValueChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.required_tables.conditions[value]));   
         this.setState({
          conditionDropDownValue:value,  
         conditionSelected: objectval.conditon_id
         });
         
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
        
    <Container style={{backgroundColor:'#c9e0f4'}}>
      <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'15%',paddingTop:3,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingHorizontal:20}]}>
        <Image source={require('../../images/gnice_logo_only.png')}  style={{height: 34, width:25,marginBottom:5,marginTop:30,marginLeft:0}}/>
        <Text style={[custom_style.section_header,{marginLeft:0,marginTop:10}]}>New Ads</Text>
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        
        <ScrollView style={{marginBottom:50}}>
        <KeyboardAvoidingView
        >
        <Form>
        <Text>Select Category</Text> 
         
        <Picker 
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#fff" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.categoryDropDownValue}
              onValueChange={this.onCategoryValueChange.bind(this)}
              itemStyle={{ backgroundColor: "#fff", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
            >
            {this.state.categories_and_sub !== [] ? (
                    Object.entries(this.state.categories_and_sub).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                ) : (
                    <Picker.Item label="Loading..." value="0" />
                )}    
             <Picker.Item label="Select Category" value="-1"/>
            
            </Picker>

            <Text>Select Sub Category</Text>   
            <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.subCategoryDropDownValue}
              onValueChange={this.onSubCategoryValueChange.bind(this)}
            >
              {
                    Object.entries(this.state.subCategoryListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                }    
             <Picker.Item label="Select Sub Category" value="-1"/>
            
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
            {this.state.formGroup == 'fashion' ? (
            <View>  
            <Fashion_form that={this.state}/>
            </View>
            ):null
            }
           
           <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Condition</Text>   
            <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.conditionDropDownValue}
              onValueChange={this.onConditionValueChange.bind(this)}
            >
              {
                    Object.entries(this.state.required_tables.conditions).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.state} value={i} />;
                    })
                }    
             <Picker.Item label="Select Condition" value="-1"/>
            
            </Picker>

           <Text style={[{marginBottom:5,paddingLeft:10}]}>Select State Region</Text>   
           <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
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
           <Picker style={[custom_style.formcontrol_product_screen,{paddingLeft:0}]}
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

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Nearest land mark</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Nearest Land mark" keyboardType="default" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(land_mark) =>this.setState({land_mark})}
            />

                
           <Text style={[{marginBottom:5,paddingLeft:10}]}>Title</Text> 
            <TextInput style={[custom_style.formcontrol_product_screen]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            placeholderTextColor="grey" onChangeText={(advert_title) =>this.setState({advert_title}) }
            />

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Price</Text> 
            <View style={{flexDirection:'row'}}>
            <View style={[custom_style.formcontrol_product_screen,{backgroundColor:'#ccc',width:40,borderRadius:0,alignItems:'center',alignContent:'center',paddingLeft:0}]}>
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
            
            
            <Text>Name</Text> 
            <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.fullname} editable={false}
            />
            <Text>Phone Number</Text> 
            <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.phone} editable={false}
            />

          
            <View style={{flexDirection:'row'}}>
            {/* <Text>{JSON.stringify(this.state.resourcePath)}</Text> */}
            {this.state.uploadImageCount>0 ? (
            this.state.resourcePath.map((item, i) => ( 
            <Image key={i} source={{uri:item.uri}} style={custom_style.advert_images} />
            ))
            ):null}
            
              <TouchableOpacity onPress={Logic.chooseMultipleImage.bind(this,this)}>
                  <View style={custom_style.image_pick}>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12}}>Browse Image</Text>
                  </View>
              </TouchableOpacity>
            </View>

          </Form>
        

      <View style={{flexDirection:'row',justifyContent:'center',marginTop:30,marginBottom:30}}> 
    <LinearGradient colors={['#266469', '#4983b5', '#388db1']} onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}
      style={[custom_style.action_call_btn,{height:40}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={this._add_products}>
      {this.state.showLoader ?(
        <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
      <Text style={{fontSize:16,color:'#fff'}}>POST ADS </Text>
      <Image source={require('../../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 40, width:30}}/> 
      </TouchableOpacity>
    </LinearGradient>


    
      </View> 

        </KeyboardAvoidingView>
        </ScrollView>
        

        </View>
        
    </Container>
	);
	}
}


