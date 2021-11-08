import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';
import * as Logic from '../methods/Logic';
import SearchBox from '../snipets/SearchBox'
import MainFooter from '../components/MainFooter';


export default class Search extends Component <{}>{
  constructor(props){
    super(props);
    
    }

    state = {
      showLoader:true,
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
      Requests.fetch_all_categories_and_sub_categories(this);
      });
  
  }

  _loadInitialState = async()=>{  
    //Requests.fetch_all_products(this);
    Requests.fetch_all_categories_and_sub_categories(this);
}
  

    render(){
    let paramsValue = JSON.parse(this.props.route.params.paramsdata);
    const renderProductItems = ({ item }) => (
      image_value = Logic.split_value(item.image, ','),
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
  <View style={[custom_style.container]}>
  <View style={{alignItems:'center',alignContent:'center',}}>
  <Text style={[custom_style.section_header,{fontSize:17,marginTop:20,marginBottom:0}]}>Seach Result For</Text>
  <Text style={[custom_style.section_header,{marginTop:0,marginBottom:10}]}>{this.props.route.params.searchQuery}</Text>    
  {/* <SearchBox/> */}

  {this.props.route.params.paramsdata ? (
      <SearchBox state = {this}/>
    ):null
    }

  </View>


{paramsValue.length!=0 ? (
  <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
  <SafeAreaView>
      <FlatList
        data={paramsValue}
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
    <Text style={{textAlign:'center',marginTop:15,color:'#414040'}}>No Search result found matching your request!</Text>
    <Text style={{textAlign:'center',marginTop:5,color:'#414040'}}>Please try again later</Text>
    <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center',width:'60%'}]} onPress={Nav._openscreen.bind(this,this.props,'NewProduct',null)}>
    <Text style={{fontSize:17,color:'#fff'}}>You can place your add</Text>
    </TouchableOpacity>
    </View>
    )}
</View>
<MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} messageButtonClick={Nav._openscreen.bind(this,this.props,'Messages',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"
  />

  
  </Container>
  );
  }
}
