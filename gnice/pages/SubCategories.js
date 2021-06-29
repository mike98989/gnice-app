import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';


export default class SubCategories extends Component <{}>{


  constructor(props){
    super(props);
    
    }

    state = {
      subcategories:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
    }
  
  componentDidMount =()=> {
    
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
        //Requests.fetch_all_products(this);  
        
      });
  
  }
  
  _loadInitialState = async()=>{  
  //Requests.fetch_all_products(this);
  //Requests.fetch_all_categories_and_sub_categories(this);
  }


  _open_search_form =()=>{
    if(this.state.showSearchForm){
      this.setState({showSearchForm:false});
    }else{
      this.setState({showSearchForm:true});
    }
    
  }


    render(){
    const renderSubCategories = ({item}) => (
      <Card style={custom_style.category_box}>
      <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Products',JSON.stringify(item))}>
      <CardItem cardBody style={{alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Image source={{ uri: global.serverUrl+global.CategoryImageBaseUrl+item.image}}  style={{alignSelf:'center',width: 50,height:45}}/>
      </CardItem>
      <CardItem footer>
      <Text style={{textAlign:'center',fontWeight:'bold',marginTop:5,color:'#2d2c2c'}}>{item.title}</Text> 
      </CardItem>
      </TouchableOpacity>
    </Card>

    );

    return(
  <Container style={{backgroundColor:'#d4d6d7'}}>
  <ImageBackground source={require('../images/gnice_bg_home_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>  
  <MainHeader header_type="transparent" nav_type="complete" title="Latest" searchImageClick={this._open_search_form} openDrawer={Nav._opendrawer.bind(this,this.props)}/>


  <ScrollView>
  {this.state.showSearchForm ? (
    <View style={[custom_style.search_div,{backgroundColor:'transparent',borderWidth:1.5,marginTop:20}]}>
    <Item>
      <TextInput style={[custom_style.formcontrol,{height:40,paddingLeft:0,paddingTop:10,width:'90%',backgroundColor:'transparent',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
      <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null}
  
  <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
  <SafeAreaView>
      <FlatList
        data={JSON.parse(this.props.route.params.paramsdata)}
        renderItem={renderSubCategories}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={3}
      />
  </SafeAreaView>  
  </View>

  </ScrollView>
  </Container>
  );
  }
}
