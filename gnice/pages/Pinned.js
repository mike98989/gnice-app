import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, List,ListItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'
import MainHeader from '../components/MainHeader'
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import * as Logic from '../methods/Logic';



export default class Pinned extends Component <{}>{

	constructor(props){
    super(props);
    
  	}

    state = {
      userData:[],
      saved_products:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
    }
  

    componentDidMount =()=> {
      AsyncMethods._loadSessionState(this).done();
      const unsubscribe = this.props.navigation.addListener('focus', () => {
        AsyncMethods._loadSessionState(this).done();
        });
    
    }

    update_state =()=>{
      Requests.fetch_all_user_saved_products(this);  
    }
    

    render(){
    return(
        <Container style={{backgroundColor:'#e1e5e7'}}>
          {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
    {/* <ImageBackground source={require('../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:15, width: '100%',height:'15%',paddingTop:3,}]}></ImageBackground> */}
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>       
        <View style={[custom_style.container]}>
        <Image source={require('../images/bookmark_icon.png')}  style={{alignSelf:'center',height: 30, width:25}}/>
        <Text style={[custom_style.section_header,{textAlign:'center',marginTop:20}]}>Saved Ads</Text> 

        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
        ):null}
        
        <ScrollView>
        {!this.state.showLoader ? (
          this.state.saved_products.length!=0?(
           this.state.saved_products.map((product, i) => (
            image_value = Logic.split_value(product.image, ','),
            <List key={i}>
            <ListItem thumbnail>
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
              <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',product)}>
                  <Text>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
           ))

          ):
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../images/empty_cart.png')} style={[{width: 100,height:100}]}/>
          <Text style={{textAlign:'center',marginTop:15,color:'#414040'}}>You do not have any saved ads yet!</Text>
          <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center'}]} onPress={Nav._openscreen.bind(this,this.props,'Home',null)}>
          <Text style={{fontSize:17,color:'#fff'}}>Go to home</Text>
          </TouchableOpacity>
          </View>
          
        ):null}
        </ScrollView>
            
        </View>
        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            /> 
        </Container>
	);
	}
}