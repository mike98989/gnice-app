import React, {Component} from 'react';
import {Linking,Dimensions,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container,ListItem,List, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Row } from 'native-base';
import MainHeader from '../components/MainHeader';
import * as Nav from '../methods/Navigation'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import * as Logic from '../methods/Logic';
import * as Requests from '../methods/Requests';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import MainFooter from '../components/MainFooter';
import {BlurView} from "@react-native-community/blur";
import * as AsyncMethods from '../methods/AsyncMethods';

export default class Home extends Component <{}>{

	constructor(props){
    super(props);
    sliderWidth=Dimensions.get('window').width - 20;
    itemWidth=Dimensions.get('window').width -20;
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  }



  state = {
    relatedProducts:[],
    showLoader:true,
    showSearchForm:true,
    activeSlide:0,
    save_button:true,
  }
  
  componentDidMount =()=> {
    this._loadInitialState().done();
    //this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
      //alert('call this one');
        //Requests.fetch_related_products(this);   
      //});
  
  }

  
  _loadInitialState = async()=>{  
  Requests.fetch_related_products(this);
  }

  _renderCarouselItem = ({item, index})=>{
      return (
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+item}}  style={[custom_style.product_details_image,{width: '100%',height:300}]}/>  
      );        
     
  }

  _save_for_later = () =>{
    if(!this.state.userData){
      AsyncMethods._loadSessionState(this).done();
    }else{
      Requests.save_products(this);  
    }
  }

  _openscreen = (product)=>{
    this.props.route.params.paramsdata = product;
    Requests.fetch_related_products(this);
    this.props.navigation.navigate('Product',{paramsdata:product});
  }
  update_state =()=>{
    Requests.save_products(this);  
  }
  
  get pagination () {
    const { content, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={image_value.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ paddingVertical: 10 }}
          dotStyle={{
              width: 45,
              height: 3,
              borderRadius: 0,
              backgroundColor: '#054874',
              borderColor:'#054874',
              borderWidth:2,
              marginTop:0,
          }}
          inactiveDotStyle={{
            backgroundColor: '#fff',
            borderColor:'#fff',
            borderWidth:2,
            padding:0,
            margin:0,
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
       
    );
}
    

    render(){
      
    image_value = Logic.split_value(this.props.route.params.paramsdata.image,',');  
    return(
    <Container style={{backgroundColor:'#ebeced'}}>
      <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0, width: '100%',height:'50%',}]}></ImageBackground> 
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        {/* <View style={custom_style.container}>
        
        </View> */}

        <View style={[custom_style.item_box,{margin:10,height:null,marginBottom:7,borderRadius:20,borderWidth:1,borderColor:'#fff',overflow:'hidden'}]}>
        <Carousel layout={'default'} layoutCardOffset={18}
              ref={(c) => { this._carousel = c; }}
              data={image_value}
              renderItem={this._renderCarouselItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.9}
              firstItem={this.state.activeSlide}
              onSnapToItem={(index)=>this.setState({activeSlide:index})}
          />
          
           <View style={{marginTop:220,height:80,width:'100%',position:'absolute'}}>
            <BlurView style={[custom_style.blurView,{borderTopColor:'#fff',borderTopWidth:2}]}
            reducedTransparencyFallbackColor="white"
            blurType="light"
            blurAmount={5}>
              <View style={{flexDirection:'column',paddingLeft:30,paddingTop:5}}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[custom_style.product_details_title,{color:'#000'}]}>{this.props.route.params.paramsdata.name}</Text>
              <Text>NGN {this.props.route.params.paramsdata.price}</Text>
              </View>
              <View>
              {this.pagination }
              </View>
            </BlurView>
          </View> 
          
          </View>
          <ScrollView>
        <View style={custom_style.product_details_container}>
        {/* <Text style={custom_style.product_details_title}>{this.props.route.params.paramsdata.name}</Text> */}
        <View style={{paddingHorizontal:20}}>
        {/* <Text numberOfLines={1} ellipsizeMode="tail" style={[custom_style.product_details_title]}>{this.props.route.params.paramsdata.name}</Text>
        <Text>NGN {this.props.route.params.paramsdata.price}</Text>   */}
        <Text style={custom_style.product_details_title}>Details</Text>
        <Text style={{color:'#625e5e',fontSize:16,lineHeight:30,marginTop:10}}>{this.props.route.params.paramsdata.description}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',}}>
        {this.state.save_button?(
          <TouchableOpacity style={[custom_style.signup_btn,custom_style.right_border_radius,custom_style.textInputShadow,{alignSelf:'flex-start',flexDirection:'row',width:'50%',marginTop:15,marginRight:'15%'}]} onPress={this._save_for_later}>
          <Icon style={{fontSize:18}} name="pin" />
          <Text style={{color:'#0e3f5f',fontSize:14,fontWeight:'bold'}}>Save for later</Text>
          </TouchableOpacity>
        ):null}

        <TouchableOpacity style={[custom_style.signup_btn,custom_style.left_border_radius,custom_style.textInputShadow,{alignSelf:'flex-end',flexDirection:'row',width:'50%',marginTop:15}]} onPress={Nav._openscreen.bind(this,this.props,'ReportAbuse',this.props.route.params.paramsdata)}>
          <Icon style={{fontSize:18}} name="pin" />
          <Text style={{color:'#0e3f5f',fontSize:14,fontWeight:'bold'}}>Report Abuse</Text>
          </TouchableOpacity>
        </View>

      <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}> 
    <LinearGradient colors={['#6fb4d9', '#186684', '#15b3ef']} 
      style={[custom_style.action_call_btn,{marginRight:15,flexDirection:'row',height:50}]} 
      start={{ y: 1.5, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
        <Image source={require('../images/chat.png')}  style={{alignSelf:'center',height: 20, width:30}}/> 
          <Text style={{fontSize:16,color:'#fff'}}>Make an offer</Text>
    </LinearGradient>
    <LinearGradient colors={['#94e8f0', '#4983b5', '#388db1']} onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}
      style={[custom_style.action_call_btn,{height:50}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={() => Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone)}>
      <Text style={{fontSize:16,color:'#fff'}}> Place a call </Text>
      <Image source={require('../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 50, width:30}}/> 
      </TouchableOpacity>
    </LinearGradient>


    {/* <LinearGradient colors={['#94e8f0', '#4983b5', '#388db1']} onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}
      style={[custom_style.action_call_btn,{height:50}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={() => Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone)}>
      <Text style={{fontSize:16,color:'#fff'}}> Whatsapp </Text>
      <Image source={require('../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 50, width:30}}/> 
      </TouchableOpacity>
    </LinearGradient> */}

    
      </View> 
      {this.props.route.params.paramsdata.seller_fullname ?(
        <View style={{marginTop:20,borderTopWidth:.5,borderTopColor:'#ccc'}}>
        <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.props.route.params.paramsdata.seller_image}}/>
                </Left>
                <Body>
                  <Text style={{fontWeight:'bold',fontSize:16}}>{this.props.route.params.paramsdata.seller_fullname}</Text>
                  <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_email}</Text>
                  <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_phone}</Text>
                  <Text note style={{fontSize:12}}>Last seen: <Text style={{color:'#f30'}}>{this.timeAgo.format(new Date(Date.parse(this.props.route.params.paramsdata.last_seen.replace(/-/g, '/'))))}</Text></Text>
                </Body>
                <Right>
                  <Text>Products</Text>
                  <Text>0</Text>
                </Right>
                
              </ListItem>
            </List>
        </View>
      ):null}
      
      <Text style={[custom_style.section_header,{marginTop:10}]}>Related Products</Text>  
      <View>
      {this.state.relatedProducts.map((product, i) => (
        image_value = Logic.split_value(product.image, ','),
       
        <List key={i}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail round style={{width:80,height:80}} source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}} />
              </Left>
              <Body>
              <TouchableOpacity onPress={this._openscreen.bind(this,product)}>
                <Text style={[custom_style.product_name,{fontWeight:'bold'}]}>{product.name}</Text>
                <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{product.land_mark}</Text>
                <Text style={custom_style.product_price}>NGN {product.price}</Text>
                </TouchableOpacity>
              </Body>
              
            </ListItem>
          </List>
          
      ))}
      </View>
  
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