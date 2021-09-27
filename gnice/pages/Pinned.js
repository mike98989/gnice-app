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
        <Container style={{backgroundColor:'#fff'}}>
          {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
        <MainHeader profile_image = {this.state.userData.image} header_type="transparent" nav_type="complete" title="Latest" searchImageClick={this._open_search_form} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
       
        <View style={[custom_style.container]}>
        <Text style={[custom_style.section_header,{marginLeft:25,marginTop:20}]}>Saved</Text> 

          {this.state.saved_products.length!=0?(
           this.state.saved_products.map((product, i) => (
            image_value = Logic.split_value(product.image, ','),
            <List>
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
          }
            
            
        </View>
        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            /> 
        </Container>
	);
	}
}