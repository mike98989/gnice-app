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
import NumberFormat from 'react-number-format';



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
      //renderItem={({item, index}) => this._renderItemOptions(item, index)}
      const renderProductItems = ({ item, index }) => (
        image_value = Logic.split_value(item.image, ','),

        <Card style={[custom_style.item_box,{width:'46%',margin:0, marginLeft:'3%',overflow:'hidden'}]}>
          <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
        <CardItem cardBody>
          <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 130, width: null, flex: 1}}/>
        </CardItem>
        <CardItem style={{paddingLeft:10,paddingRight:10}}>
          <Body>
            <View style={{height:70,overflow:'hidden'}}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={[custom_style.product_name,{lineHeight:15,marginTop:0,}]}>{item.name}</Text>
            {item.category!='23'?(
            <NumberFormat value={item.price} displayType={'text'} renderText={formattedValue => <Text>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
          ):null} 
          {item.category=='23'?(
            <NumberFormat value={item.salary} displayType={'text'} renderText={formattedValue => <Text>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
          ):null} 
          
          {item.land_mark!=''?(
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{item.land_mark}</Text>
          ):
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{item.state}/{item.lga}</Text>
          } 
          </View>  
          </Body>
        </CardItem>
        </TouchableOpacity>
        <CardItem footer bordered>
          <Body style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'EditProduct',item)}>  
          <Text style={{fontSize:12}}>Edit</Text>
          </TouchableOpacity>
          
          {item.status=='0'?(
          <TouchableOpacity onPress={()=>Logic.disable_enable_item(index,item,this,'1')}>  
          <Text style={{marginLeft:15,fontSize:12,color:'blue'}}>Enable</Text>
          </TouchableOpacity>
          ):
          <TouchableOpacity onPress={()=>Logic.disable_enable_item(index,item,this,'0')}>  
          <Text style={{marginLeft:15,fontSize:12}}>Disable</Text>
          </TouchableOpacity>
          }
          

          </Body>
          <Right>
          <TouchableOpacity onPress={()=>Logic.delete_item(index,item,this)}>  
          <Text style={{fontSize:12,color:'#f30'}}>Delete</Text>
          </TouchableOpacity>
          </Right>  
        </CardItem>
        
        
        
      </Card>
  
  

      );

    return(
    <Container style={{backgroundColor:'#fff'}}>
     <ImageBackground source={require('../../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:170,paddingTop:5,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingHorizontal:10,paddingLeft:0,paddingBottom:100}]}>
        <Text style={[custom_style.section_header,{marginTop:30,color:'#fff'}]}>My Products</Text> 
        <Text style={[custom_style.section_header,{marginLeft:2,color:'#fff',fontSize:13,marginBottom:10}]}>List of all uploaded product or services</Text>
    <View style={{marginTop:17}}>
    
    {this.state.showLoader ? (
    <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../../images/spinner4.gif')}  style={{height: 45, width:45}}/>
    </View>
    ):
    <>
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
    </>
    } 
    
    
     
    </View>
        </View>

        <Fab
            style={{ backgroundColor: '#2c7ab2' }}
            position="bottomRight"
            onPress={Nav._openscreen.bind(this,this.props,'NewProduct',null)}>
            <Icon name="add" style={{fontWeight:'bold'}}/>
          </Fab>

        {/* <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            />  */}
        </Container>
	);
	}
}