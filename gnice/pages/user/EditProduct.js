import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View,Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header,Select, Content,Item,Label,Input,Form,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
import * as Requests from '../../methods/Requests';
import Car_form from './add_product_screen/car_form';
import Property_form from './add_product_screen/property_form';
import Phones_form from './add_product_screen/phones_form';
import Fashion_form from './add_product_screen/fashion_form';
import Seeking_work_form from './add_product_screen/seeking_work_form';
import Services_form from './add_product_screen/services_form';
import Jobs_form from './add_product_screen/jobs_form';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import * as Logic from '../../methods/Logic';
// import {Picker} from '@react-native-picker/picker'; //eslint-disable-line
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line
import CurrencyInput from 'react-native-currency-input';
import MainHeader from '../../components/MainHeader'

//import RNPickerSelect from 'react-native-picker-select';
//import {Picker} from '@react-native-picker/picker';

//import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EditProduct extends Component <{}>{

	constructor(props){
    super(props);
    //alert(JSON.stringify(props.route.params.paramsdata.category));
    
    this.state = {
        update_edit_view:true,  
        userData:[],
        categoryDropDownValue:null,
        categories_and_sub:[],
        categorySelected:'0',
        conditionDropDownValue:null,
        secondConditionDropDownValue:null,
        carBodyTypeDropDownValue:null,
        carTransmissionDropDownValue:null,
        carDriveTrainDropDownValue:null,
        carFuelDropDownValue:null,
        conditionSelected:'0',
        propertyTypeSelected:null,
        propertyTypeDropDownValue:null,
        subCategoryListSelected:[],
        subCategorySelected:'0',
        carModelListSelected:[],
        phoneModelListSelected:[],
        lgalListSelected:[],
        carMakeSelected:null,
        carMakeDropDownValue:null,
        carModelDropDownValue:null,
        carModelSelected:null,
        carModelArraySelected:'0',
        phoneMakeSelected:'0',
        phoneModelSelected:'0',
        phoneModelArraySelected:'0',
        required_tables:[],
        formGroup:null,
        formValues:[],
        stateSelected:null,
        stateDropDownValue:null,
        lgaDropDownValue:null,
        lgaSelected:null,
        lgaArraySelected:'0',
        resourcePath:[],
        uploadImageCount:0,
        color:'',
        trim:'',
        seats:null,
        showLoader:true,
        showForm:false,
        showSubmitLoader:false,
        showDatePicker:false,
        images:[],
      }
  	}

    
    

    formData = new FormData();

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          //alert(JSON.stringify(this.props.route.params.paramsdata.category));
          this.setState({showLoader:true,showForm:false,categoryDropDownValue:null,showSubmitLoader:false});
          AsyncMethods._loadSessionState(this).done();
          });
      }
    
    // componentWillUnmount() {
    //   this.props.route.params=null
    // }
    
      update_state =()=>{
       
        Requests.fetch_all_categories_and_sub_categories(this)
        Requests.fetch_required_table(this,this.state.update_edit_view);
        
        // {!this.state.showLoader ?(
        //     Logic.fetch_picker_selected_values(this)
        // ):null}
        //let categoryObject = {value:this.props.route.params.paramsdata.category,label:'Property'};
        //this.setState({categoryDropDownValue:categoryObject})
      }

      _update_products=()=>{
        Requests.updateProducts(this);
      }

      
    render(){
    function CurrencyTextInput() {
      const [price, setPrice] = React.useState(0); // can also be null
      return (
        <CurrencyInput
          value={price}
          onChangeValue={setPrice}
          prefix=""
          delimiter=","
          separator="."
          precision={0}
          style={[custom_style.formcontrol,{height:40,paddingTop:13,paddingLeft:8,borderTopLeftRadius:0,borderBottomLeftRadius:0,borderTopRightRadius:10,borderBottomRightRadius:10,width:280}]}
          onChangeText={(formattedValue) => {
            console.log(formattedValue); // $2,310.46
          }}
        />
      );
    }   
    
    return(
        
        
    <Container style={{backgroundColor:'#e1e5e7'}}>
      <ImageBackground source={require('../../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute', left: 0,top: 0,zIndex:0,top:15, width: '100%',height:140,paddingTop:3,}]}></ImageBackground>
        {/* <UserScreenHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/> */}
        <MainHeader header_type="transparent" go_back={Nav._goback.bind(this,this.props)} nav_type="backOnly"/>
        <Text style={[custom_style.section_header,{color:'#fff',marginTop:20}]}>Edit Product/Service</Text>
        <Text style={[custom_style.section_header,{marginLeft:2,color:'#fff',fontSize:13,marginBottom:10}]}>{this.props.route.params.paramsdata.name}</Text>
        <View style={[custom_style.container,{paddingHorizontal:0,paddingTop:0}]}>
        <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
        {/* <Text>{JSON.stringify(this.state.categories_and_sub)}</Text> */}
        
        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../images/spinner4.gif')}  style={{height: 55, width:55}}/>
        </View> 
      ):null}
        <ScrollView style={{marginBottom:30}}>
        <KeyboardAvoidingView>
         {this.state.showForm ?( 
        <Form style={{paddingHorizontal:20}}>
          <Text style={[{marginBottom:5,paddingLeft:10}]}>Title</Text> 
          <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor={'#1688EA'}
          placeholderTextColor="grey" value={this.state.advert_title} onChangeText={(advert_title) =>this.setState({advert_title}) }
          />


        <Picker
              title="Select Category"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Category"
              showSearch
              value={this.state.categoryDropDownValue}
              onChange={item => Logic.onCategoryValueChange(item,this,true)}
              //onValueChange={Logic.onCategoryValueChange.bind(this,props.state)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {this.state.categories_and_sub !== [] ? (
                    Object.entries(this.state.categories_and_sub).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>
                  
            <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select Sub Category"
              showSearch
              placeholder="Select Sub Category"
              value={this.state.subCategoryDropDownValue}
              onChange={item => Logic.onSubCategoryValueChange(item,this,true)}
            >
              {
                    Object.entries(this.state.subCategoryListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                }    
            </Picker>
            

            {this.state.showProductForm ? (
            <View>
            {this.state.formGroup == 'cars' ? (
            <View>       
            {/* <Car_form state={this.state} carMakeChange={()=>Logic.onCarMakeValueChange(this)} carModelChange={this.onCarModelValueChange.bind(this,this.props)} /> */}
            <Car_form that={this} />
            </View>
            ):null
            }
            {this.state.formGroup == 'properties' ? (
            <View>  
            {/* <Property_form state={this.state}  propertyTypeChange = {this.onPropertyTypeValueChange.bind(this,this.props)} /> */}
            <Property_form that={this} />
            </View>
            ):null
            }
            {this.state.formGroup == 'phones' ? (
            <View>  
            {/* <Phones_form state={this.state}  phoneMakeChange = {this.onPhoneMakeValueChange.bind(this,this.props)} phoneModelChange={this.onPhoneModelValueChange.bind(this,this.props)}/> */}
            <Phones_form that={this}/>
            </View>
            ):null
            }
            {this.state.formGroup == 'fashion' ? (
            <View>  
            <Fashion_form that={this}/>
            </View>
            ):null
            }

            {this.state.formGroup == 'seeking_work_form' ? (
            <View>  
            <Seeking_work_form that={this}/>
            </View>
            ):null
            }

            {this.state.formGroup == 'services_form' ? (
            <View>  
            <Services_form that={this}/>
            </View>
            ):null
            }

            {this.state.formGroup == 'jobs_form' ? (
            <View>  
            <Jobs_form that={this}/>
            </View>
            ):null
            }
          
           {this.state.subCategorySelected=='44' || this.state.subCategorySelected=='45' || this.state.categorySelectedObject.grouped=='1'?(
            <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select Condition"
              showSearch
              placeholder="Select Condition"
              value={this.state.conditionDropDownValue}
              onChange={item => Logic.onConditionValueChange(item,this)}
            >
              {
                    Object.entries(this.state.required_tables.conditions).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.state} value={i} />;
                    })
                }    
            </Picker>
            ):null}

           
            {this.state.categorySelected=='1' || this.state.categorySelected=='3' || this.state.categorySelected=='8' || this.state.categorySelected=='9' || this.state.categorySelected=='26'?(
            <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select Second Condition"
              showSearch
              placeholder="Select Second Condition"
              value={this.state.secondConditionDropDownValue}
              onChange={item => Logic.onSecondConditionValueChange(item,this)}
            >
              {
                    Object.entries(this.state.required_tables.second_conditions).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.state} value={i} />;
                    })
                }    
            </Picker>
            ):null}

           <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select State"
              showSearch
              placeholder="Select State"
              value={this.state.stateDropDownValue}
              onChange={item => Logic.onStateValueChange(item,this)}
            >
              {
                    Object.entries(this.state.required_tables.states).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.state} value={i} />;
                    })
                }    
            </Picker>

              <Picker style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select City"
              showSearch
              placeholder="Select City"
              value={this.state.lgaDropDownValue}
              onChange={item => Logic.onlgaValueChange(item,this)}
            >
              {
                    Object.entries(this.state.lgalListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.Lga} value={i} />;
                    })
                }    
            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Nearest land mark</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Nearest Land mark" keyboardType="default"
            placeholderTextColor="grey" value={this.state.land_mark} onChangeText={(land_mark) =>this.setState({land_mark})} selectionColor={'#1688EA'}
            />
            {this.state.categorySelected!='23'?(
            <>
            <Text style={[{marginBottom:5,paddingLeft:10}]}>Price</Text> 
            <View style={{flexDirection:'row'}}>
            <View style={[custom_style.formcontrol_product_screen,{backgroundColor:'#ccc',width:40,borderRadius:0,alignItems:'center',alignContent:'center',paddingLeft:0}]}>
              <Text style={{fontWeight:'bold',paddingTop:9}}>N</Text></View>
              <CurrencyInput
              value={this.state.price}
              onChangeValue={(price) =>this.setState({price}) }
              prefix=""
              delimiter=","
              separator="."
              precision={0}
              style={[custom_style.formcontrol,{height:40,paddingTop:13,paddingLeft:8,borderTopLeftRadius:0,borderBottomLeftRadius:0,borderTopRightRadius:10,borderBottomRightRadius:10,width:280}]}
              />
            </View>
            </>
            ):null}
            

            <View style={{flexDirection:'row',marginVertical:15}}>
            <CheckBox value={this.state.negotiable_price} onValueChange={(negotiable_price) => {this.setState({negotiable_price})}} style={custom_style.signup_checkbox}/>
            <Text style={{fontSize:16,color:'#555'}}>Price is negotiable</Text>
          </View>

          <View style={{flexDirection:'row',marginVertical:15}}>
            <CheckBox value={this.state.delivery_available} onValueChange={(delivery_available) => {this.setState({delivery_available})}} style={custom_style.signup_checkbox}/>
            <Text style={{fontSize:16,color:'#555'}}>Delivery Available</Text>
          </View>


            <Text style={[{marginBottom:5,paddingLeft:10}]}>Details</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,paddingTop:10,width:'100%',borderColor:'#ddd8d8',textAlignVertical: 'top',}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Details" selectionColor={'#1688EA'}
            placeholderTextColor="grey" multiline={true}  value={this.state.advert_details} numberOfLines={4} onChangeText={(advert_details) =>this.setState({advert_details}) }
            />

          <Text style={[{marginBottom:5,paddingLeft:10}]}>Store/Office</Text>
          <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,paddingTop:10,width:'100%',borderColor:'#ddd8d8',textAlignVertical: 'top',}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Store/Office Address" selectionColor={'#1688EA'}
        placeholderTextColor="grey" multiline={true} numberOfLines={4}  value={this.state.store_address} onChangeText={(store_address) =>this.setState({store_address}) }
        />
            </View>
            ):null}
            
            
            {/* <Text>Name</Text> 
            <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.fullname} editable={false}
            />
            <Text>Phone Number</Text> 
            <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{backgroundColor:'#eee'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
            value={this.state.userData.phone} editable={false}
            /> */}

          
            <View style={{flexDirection:'row', flexWrap: 'wrap',}}>
            {/* <Text>{JSON.stringify(this.state.resourcePath)}</Text> */}

            {this.state.images.length !=0 ? (
            this.state.images.map((item, i) => ( 
            <TouchableOpacity key={i} onPress={()=>Logic.deleteUploadedImage(i,item,this)}>  
            <View style={{flexDirection:'column',height:80,width:80,justifyContent:'center',}}>
            <View style={[custom_style.image_pick,{paddingHorizontal:5,opacity:0.7,backgroundColor:'#000',position:'relative'}]}> 
            <Image  source={{ uri: global.serverUrl+global.UploadImageBaseUrl+item}} style={custom_style.advert_images} />
            </View>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,position:'absolute',alignSelf:'center', color:'#fff'}}>X Cancel</Text>  
            </View>
            </TouchableOpacity>
            ))
            ):null}

            {this.state.uploadImageCount>0 ? (
            this.state.resourcePath.map((item, i) => ( 
            <TouchableOpacity key={i} onPress={()=>Logic.deleteItemFromLoop(this,i)}>  
            <View style={{flexDirection:'column',height:80,width:80,justifyContent:'center',}}>
            <View style={[custom_style.image_pick,{paddingHorizontal:5,opacity:0.7,backgroundColor:'#000',position:'relative'}]}> 
            <Image  source={{uri:item.uri}} style={custom_style.advert_images} />
            </View>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,position:'absolute',alignSelf:'center', color:'#fff'}}>X Cancel</Text>  
            </View>
            </TouchableOpacity>
            ))
            ):null}
           
              <TouchableOpacity onPress={Logic.chooseMultipleImage.bind(this,this)}>
                  <View style={[custom_style.image_pick,{paddingHorizontal:5,}]}>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12}}>Browse Image</Text>
                  </View>
              </TouchableOpacity>
            </View>
            

    <View style={{flexDirection:'row',width:'50%',alignSelf:'center',justifyContent:'center',marginTop:30,marginBottom:30}}> 
    <LinearGradient colors={['#266469', '#4983b5', '#388db1']}
      style={[custom_style.action_call_btn,{height:40}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={this._update_products}>
      {this.state.showSubmitLoader ?(
        <Image source={require('../../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
      <Text style={{fontSize:16,color:'#fff'}}>UPDATE ADS </Text>
      <Image source={require('../../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 40, width:30}}/> 
      </TouchableOpacity>
    </LinearGradient>


    
      </View> 

      </Form>
      ):null}
        



        </KeyboardAvoidingView>
        </ScrollView>
        

        </View>
        
    </Container>
	);
	}
}


