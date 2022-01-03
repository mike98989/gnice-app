import React, {Component} from 'react';
import {Linking,StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, List,ListItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'
import MainHeader from '../components/MainHeader'
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import * as Logic from '../methods/Logic';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'


export default class SellerPage extends Component <{}>{

	constructor(props){
    super(props);
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  	}

    state = {
      userData:[],
      seller_products:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
    }

    componentDidMount =()=> {
        this._loadInitialState().done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
        Requests.fetch_seller_products(this);
        });
    }
    _loadInitialState = async()=>{  
        Requests.fetch_seller_products(this);
    }

    render(){
    return(
        <Container style={{backgroundColor:'#e1e5e7'}}>
          {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>       
        <View style={[custom_style.container,{paddingTop:30}]}>
        <View style={[custom_style.formcontrol,{paddingHorizontal:0,paddingTop:0,borderRadius:0,height:'auto'}]}>
        <List>
              <ListItem avatar>
                <Left style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  <Thumbnail source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.props.route.params.paramsdata.seller_image}}/>
                  <TouchableOpacity style={[custom_style.call_btn,{marginTop:-10,marginBottom:30}]} onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}>
                      <Text style={{fontSize:13,fontWeight:'bold'}}>Call Now</Text></TouchableOpacity>
                </Left>
                <Body style={{paddingTop:0}}>
                  <Text style={{fontWeight:'bold',fontSize:16}}>{this.props.route.params.paramsdata.seller_fullname}</Text>
                  <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_email}</Text>
                  <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_phone}</Text>
                  <Text note style={{fontSize:12}}>Registered: <Text style={{color:'#f30'}}>{this.timeAgo.format(new Date(Date.parse(this.props.route.params.paramsdata.registered_date.replace(/-/g, '/'))))}</Text></Text>
                  <Text note style={{fontSize:12}}>Last seen: <Text style={{color:'#f30'}}>{this.timeAgo.format(new Date(Date.parse(this.props.route.params.paramsdata.last_seen.replace(/-/g, '/'))))}</Text></Text>
                  {/* THIS FEATURE IS FOR PAID SERVICES */}
                  {(this.props.route.params.paramsdata.seller_account_type*1) >1 ?(
                    <TouchableOpacity onPress={()=>{Linking.openURL("whatsapp://send?text=Hello "+this.props.route.params.paramsdata.seller_fullname+", I got your contact from Gnice Market Place&phone=234"+this.props.route.params.paramsdata.seller_phone)}} style={{marginTop:5,flexDirection:'row'}}>
                    <Image source={require('../images/whatsapp_icon.png')}  style={{marginTop:3,marginRight:3,height: 15, width:15}}/>
                    <Text  note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_phone}</Text>
                    <Text  note style={{fontSize:8,marginTop:5,marginLeft:10,color:"#0f619b"}}>Tap to open</Text>
                </TouchableOpacity>
                  ):null}
                  

                </Body>
                <Right style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:10}}>Products</Text>
                  <Text style={{fontSize:13,color:'grey',fontWeight:'bold'}}>{this.state.seller_products.length}</Text>
                  
                </Right>
                
              </ListItem>
              
            </List>
        </View>    
        
        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
        ):null} 
        
        {!this.state.showLoader ? (
            <SafeAreaView>
            <ScrollView>
          {this.state.seller_products.length!=0?(
           this.state.seller_products.map((product, i) => (
            image_value = Logic.split_value(product.image, ','),
            <List key={i}>
            <ListItem thumbnail>
            <TouchableOpacity  style={{flexDirection:'row'}} onPress={Nav._openscreen.bind(this,this.props,'Product',product)}>
              <Left>
                <Thumbnail round source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}/>
              </Left>
              <Body>
                <Text>{product.name}</Text>
                <Text>NGN {product.price}</Text>
                {product.land_mark!=''?(
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{product.land_mark}</Text>
          ):
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{product.state}/{product.lga}</Text>
          } 
              </Body>
              <Right>
              {product.date_added ? (
                <Text style={{color:'grey',fontSize:10}}> {this.timeAgo.format(new Date(Date.parse(product.date_added.replace(/-/g, '/'))))}</Text>
              ):null}
              </Right>
              </TouchableOpacity>
            </ListItem>
          </List>
           ))

          ):
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../images/empty_cart.png')} style={[{width: 100,height:100}]}/>
          <Text style={{textAlign:'center',marginTop:15,color:'#414040'}}>Seller do not have any saved ads yet!</Text>
          <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center'}]} onPress={Nav._openscreen.bind(this,this.props,'Home',null)}>
          <Text style={{fontSize:17,color:'#fff'}}>Go to home</Text>
          </TouchableOpacity>
          </View>
    }
          </ScrollView>
          </SafeAreaView>
        ):null}
        
            
        </View>
        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)} messageButtonClick={Nav._openscreen.bind(this,this.props,'Messages',null)} pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} active=""
            /> 
          
        </Container>
	);
	}
}