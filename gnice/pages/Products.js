import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';


export default class Home extends Component <{}>{


  constructor(props){
    super(props);
    
    }

    state = {
        products:[],
    //paramsValue:JSON.parse(this.props.route.params.paramsdata),   
      showLoader:true,
      showSearchForm:true,
    }
  
  componentDidMount =()=> {
    
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
    Requests.fetch_all_product_from_sub_category(this);   
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_all_product_from_sub_category(this);
  }


  _open_search_form =()=>{
    if(this.state.showSearchForm){
      this.setState({showSearchForm:false});
    }else{
      this.setState({showSearchForm:true});
    }
    
  }


    render(){
    let paramsValue = JSON.parse(this.props.route.params.paramsdata);
    const renderProductItems = ({ item }) => (
      <Card style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%'}]}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 150, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        
          <Body>
          <Text numberOfLines={2} ellipsizeMode="tail" style={custom_style.product_name}>{item.name}</Text>   
          <Text style={custom_style.product_price}>NGN {item.price}</Text>  
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{item.location}</Text>
          </Body>
        
      </CardItem>
      
      </TouchableOpacity>
    </Card>
    );
    return(
  <Container style={{backgroundColor:'#e1e5e7'}}>
  {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
  <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>

  <Text style={[custom_style.section_header,{marginLeft:25,marginVertical:10}]}>Cetegories</Text>  
  
  {this.state.showSearchForm ? (
    <View style={[custom_style.search_div,{backgroundColor:'transparent',borderWidth:1.5}]}>
    <Item>
      <TextInput style={[custom_style.formcontrol,{height:40,paddingLeft:0,paddingTop:10,width:'90%',backgroundColor:'transparent',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
      <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null}

<Text style={[custom_style.section_header,{marginLeft:25,marginTop:20}]}>{paramsValue.title}</Text>  

{this.state.products.length!=0 ? (
  <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
  <SafeAreaView>
      <FlatList
        data={this.state.products}
        renderItem={renderProductItems}
        keyExtractor={(item, index) => String(index)}
        horizontal={false}
        numColumns={2}
      />
  </SafeAreaView>  
  </View>
  ):(
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../images/empty_cart.png')} style={[{width: 100,height:100}]}/>
    <Text style={{textAlign:'center',marginTop:15,color:'#414040'}}>No product/service uploaded yet!</Text>
    <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center',width:'60%'}]} onPress={Nav._openscreen.bind(this,this.props,'NewProduct',null)}>
    <Text style={{fontSize:17,color:'#fff'}}>You can place your add</Text>
    </TouchableOpacity>
    </View>
    )}


  </Container>
  );
  }
}
