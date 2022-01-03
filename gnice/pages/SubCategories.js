import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';
import SearchBox from '../snipets/SearchBox'
import MainFooter from '../components/MainFooter';


export default class SubCategories extends Component <{}>{


  constructor(props){
    super(props);
    
    }

    state = {
      subcategories:[],
      showLoader:false,
      search: '',
      showSearchForm:true,
      categoryDropDownValue:'-1',
      subCategoryListSelected:[],
      subCategorySelected:'',
      subCategorySelectedText:'',
      subCategoryDropDownValue:'-1',
      subCategorySelectedText:'',
      searchQuery:'',
    }
  
  componentDidMount =()=> {
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
        //Requests.fetch_all_products(this);  
        Requests.fetch_all_categories_and_sub_categories(this);
      });
  }
  
  _loadInitialState = async()=>{  
  //Requests.fetch_all_products(this);
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
    let paramsValue = JSON.parse(this.props.route.params.paramsdata);  
    //alert(paramsValue);
    const renderSubCategories = ({item}) => (
      <View style={[custom_style.category_box,{marginBottom:10}]}>
      <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Products',JSON.stringify(item))}>
      <View cardBody style={{alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Image source={{ uri: global.serverUrl+global.CategoryImageBaseUrl+item.image}}  style={{alignSelf:'center',width: 50,height:45}}/>
      </View>
      <View footer style={{flexDirection:'column',alignContent:'center',alignItems:'center'}}>
      <Text style={{textAlign:'center',marginTop:5,color:'#2d2c2c'}}>{item.title}</Text> 
      <Text style={{color:'#1e5877',fontSize:11}}>{item.counted_sub_category_products.counted} item(s)</Text>
      </View>
      </TouchableOpacity>
    </View>

    );

    return(
  <Container style={{backgroundColor:'#e1e5e7'}}>
  {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
  <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
  {/* {this.state.showSearchForm ? (
    <View style={[custom_style.search_div,{backgroundColor:'transparent',borderWidth:1.5,marginTop:20}]}>
    <Item>
      <TextInput style={[custom_style.formcontrol,{height:40,backgroundColor:'transparent',paddingLeft:0,paddingTop:10,width:'90%',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
      <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null} */}
  <View style={[custom_style.container]}>
  <View style={{alignItems:'center',alignContent:'center',}}>
  <Text style={[custom_style.section_header,{marginBottom:20}]}>{JSON.stringify(paramsValue.title)}</Text>  
  {this.props.route.params.paramsdata ? (
      <SearchBox state = {this}/>
    ):null
    }
  </View>
  <View style={[{paddingHorizontal:'1%',marginTop:5,marginHorizontal:10,height:'100%'}]}>
  <SafeAreaView>
      <FlatList
        data={JSON.parse(this.props.route.params.paramsdata)}
        renderItem={renderSubCategories}
        keyExtractor={item => item.sub_id}
        horizontal={false}
        numColumns={3}
      />
  </SafeAreaView>  
  </View>

  </View>
  <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"
  />
  
  </Container>
  );
  }
}
