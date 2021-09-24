import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content,Fab, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../../components/custom_style';
import MainFooter from '../../components/MainFooter';
import * as Nav from '../../methods/Navigation'
import * as AsyncMethods from '../../methods/AsyncMethods';
import * as Requests from '../../methods/Requests';
import * as Logic from '../../methods/Logic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserScreenHeader from '../../components/UserScreenHeader';



export default class MyProducts extends Component <{}>{


	constructor(props){
    super(props);
    
  	}

    state = {
      showLoader:true,
      userData:[],
      products:[],
      
    }


    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        this._loadInitialState().done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
          });
      
      }
      
      _loadInitialState = async()=>{  
      Requests.fetch_all_user_products(this);
      }

      update_state=()=>{
        Requests.fetch_all_user_products(this);
      }
      
      // componentDidMount =()=> {

      //   this._loadInitialState().done();
      //   const unsubscribe = this.props.navigation.addListener('focus', () => {
      //       Requests.fetch_all_user_products(this);   
      //     });
      
      // }
      
      // _loadInitialState = async()=>{
      //   var token = await AsyncStorage.getItem('user-token');
      //   var datavalue = await AsyncStorage.getItem('user-data');
      //   var dataObject = JSON.parse(datavalue);

      // this.setState({
      //   userID:dataObject.id,
      //   userToken:token,
      //   userData:dataObject,
      // })

      // if((token!=null)&&(token!='')){
      // Requests.fetch_all_user_products(this);
      // }
      // }



    render(){
    
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
        <CardItem footer bordered>
          <Body><Text><Icon name='edit' style={{color:'#000',fontSize:12}} />Edit</Text></Body> 
          <Right>
          <Text><Icon name='times' style={{color:'#000',fontSize:12}} />Delete</Text>
          </Right>  
        </CardItem>
        
        
        
      </Card>
  
  

      );

    return(
    <Container style={{backgroundColor:'#fff'}}>
     <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingHorizontal:10}]}>
          
    <View style={{marginTop:30}}>
    <Text style={[custom_style.section_header,{marginLeft:5,marginVertical:10}]}>My Products</Text>  
    {this.state.products.length!=0 ? (
      <SafeAreaView>
      <FlatList
          data={this.state.products}
          renderItem={renderProductItems}
          keyExtractor={(item, index) => String(index)}
          horizontal={false}
          numColumns={2}
        />
      </SafeAreaView> 
    ):(
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../../images/empty_cart.png')} style={[{width: 100,height:100}]}/>
    <Text style={{textAlign:'center',marginTop:15,color:'#414040'}}>You have not uploaded any ads yet!</Text>
    <TouchableOpacity style={[custom_style.login_btn,{alignSelf:'center'}]} onPress={Nav._openscreen.bind(this,this.props,'NewProduct',null)}>
    <Text style={{fontSize:17,color:'#fff'}}>Add product</Text>
    </TouchableOpacity>
    </View>
    )}
    
    
     
    </View>
        </View>
        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            /> 
        </Container>
	);
	}
}