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
      showLoader:true,
      search: '',
      showSearchForm:false,
    }
  
  componentDidMount =()=> {
    
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
        Requests.fetch_all_products(this);   
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_all_products(this);
  }

  _open_search_form =()=>{
    if(this.state.showSearchForm){
      this.setState({showSearchForm:false});
    }else{
      this.setState({showSearchForm:true});
    }
    
  }


    render(){

    const renderItem = ({ item }) => (
      // <View style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',marginBottom:7,borderRadius:10}]}>
      //   <View>
      //   <Image source={{ uri: global.serverUrl+global.imageBaseUrl+item.image}}   style={{height: 150, width: null, flex: 1}}/>
      //   </View>
      // </View>
      <Card style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',borderRadius:10,overflow:'hidden'}]}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.imageBaseUrl+item.image}}  style={{height: 150, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        <Left>
          <Body>  
          </Body>
        </Left>
      </CardItem>
      <CardItem footer>
      <Text style={custom_style.product_name}>{item.name}</Text> 
            {/* <View style={{flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
            <Text style={custom_style.product_price_super_script}>N</Text><Text style={custom_style.product_price_tag}>{item.price}</Text>
            </View> */}
      </CardItem>
      </TouchableOpacity>
    </Card>
    );

    return(
  <Container style={{backgroundColor:'#d4d6d7'}}>
  <ImageBackground source={require('../images/gnice_bg_home_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>  
  <MainHeader header_type="transparent" nav_type="complete" title="Latest" searchImageClick={this._open_search_form} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
  <Text style={[custom_style.section_header,{marginLeft:25,marginVertical:10}]}>Products</Text> 
  {/* <View style={custom_style.search_div}>
  <TextInput style={[custom_style.formcontrol,{height:20,marginTop:5,paddingTop:10,width:'90%'}]} underlineColorAndroid='rgba(0,0,0,0)' autoFocus = {true} placeholder="Email" keyboardType="email-address" selectionColor="#fff"
        onSubmitEditing = {()=>this.password.focus()} onChangeText={(username) =>this.setState({username}) }
        placeholderTextColor="grey"
        />
   <View style={custom_style.search_div_search_icon}></View>     
  </View> */}
  {this.state.showSearchForm ? (
    <View style={[custom_style.search_div,{backgroundColor:'transparent',borderWidth:1.5}]}>
    <Item>
              <TextInput style={[custom_style.formcontrol,{height:40,paddingLeft:0,paddingTop:10,width:'90%',backgroundColor:'transparent',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
              <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null}
  
  
  <View style={{flexDirection:'row',paddingLeft:20}}>
    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Best Selling</Text>
    </TouchableOpacity>

    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Most Viewed</Text>
    </TouchableOpacity>

    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Top Rated</Text>
    </TouchableOpacity>

  </View>
  <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
  <SafeAreaView>
      <FlatList
        data={this.state.products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
      />
  </SafeAreaView>  
  </View>
      
  </Container>
	);
	}
}