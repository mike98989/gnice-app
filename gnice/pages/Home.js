import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
//import MainFooter from '../components/MainFooter'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation';
import * as Logic from '../methods/Logic';
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';
import MainFooter from '../components/MainFooter';


export default class Home extends Component <{}>{


  constructor(props){
    super(props);
    
    }

    state = {
      userData:[],
      products:[],
      categories_and_sub:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
    }
  
  componentDidMount =()=> {
    AsyncMethods._loadSessionState(this).done();

    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
      AsyncMethods._loadSessionState(this).done();
        Requests.fetch_all_products(this); 
        Requests.fetch_all_categories_and_sub_categories(this);  
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_all_products(this);
  Requests.fetch_all_categories_and_sub_categories(this);
  }


  _open_search_form =()=>{
    if(this.state.showSearchForm){
      this.setState({showSearchForm:false});
    }else{
      this.setState({showSearchForm:true});
    }
    
  }


    render(){

    const renderProductItems = ({ item }) => (
      image_value = Logic.split_value(item.image, ','),
      //alert(JSON.stringify(image_value)),
      // <View style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',marginBottom:4,borderRadius:10,overflow:'hidden'}]}>
      //   <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+item.image}}  style={{height: 150, width: '100%', flex: 1}}/>
      // </View>
      <Card style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',borderRadius:10,overflow:'hidden'}]}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 150, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        
          <Body>
          <Text numberOfLines={2} ellipsizeMode="tail" style={custom_style.product_name}>{item.name}</Text>   
          <Text style={custom_style.product_price}>NGN {item.price}</Text>  
          
          </Body>
        
      </CardItem>
      {/* <CardItem style={{padding:0}}>
      
      </CardItem> */}
      </TouchableOpacity>
    </Card>
    );


    const renderCategories = ({item}) => (
      <Card style={custom_style.category_box}>
      <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'SubCategories',JSON.stringify(item.subcategory))}>
      <CardItem cardBody style={{alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Image source={{ uri: global.serverUrl+global.CategoryImageBaseUrl+item.image}}  style={{alignSelf:'center',width: 50,height:45}}/>
      </CardItem>
      <CardItem footer>
      <Text style={{textAlign:'center',fontFamily:'Rajdhani',color:'#2d2c2c'}}>{item.title}</Text> 
      </CardItem>
      </TouchableOpacity>
    </Card>
    );

    return(
  <Container style={{backgroundColor:'#d4d6d7'}}>
  <ImageBackground source={require('../images/gnice_bg_home_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>  
  <MainHeader profile_image = {this.state.userData.image} header_type="transparent" nav_type="complete" title="Latest" searchImageClick={this._open_search_form} openDrawer={Nav._opendrawer.bind(this,this.props)}/>

  <ScrollView nestedScrollEnabled={true}>
  {/* <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',height: 30, width:25,marginBottom:15}}/>
           */}
  {this.state.showSearchForm ? (
    <View style={[custom_style.search_div_transparent,{backgroundColor:'transparent'}]}>
    <Item>
      <TextInput style={[custom_style.formcontrol,{height:40,paddingLeft:0,paddingTop:10,width:'90%',backgroundColor:'transparent',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
      <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null}

  <Text style={[custom_style.section_header,{marginLeft:25,marginVertical:10}]}>Categories</Text>  
  <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
  <SafeAreaView>
      <FlatList
        data={this.state.categories_and_sub}
        renderItem={renderCategories}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={3}
      />
  </SafeAreaView>  
  </View>


  
    <Text style={[custom_style.section_header,{marginLeft:25,marginTop:20}]}>Latest</Text>  

  {/* <View style={{flexDirection:'row',paddingLeft:20}}>
    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Best Selling</Text>
    </TouchableOpacity>

    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Most Viewed</Text>
    </TouchableOpacity>

    <TouchableOpacity style={custom_style.home_link_btn}>
      <Text>Top Rated</Text>
    </TouchableOpacity>

  </View> */}
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
  </ScrollView>

  <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"
  />

  </Container>
  );
  }
}
