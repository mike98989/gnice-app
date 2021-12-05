import React, {Component} from 'react';
import {Linking,Dimensions, ActivityIndicator,Modal,Pressable,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
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
import NumberFormat from 'react-number-format';
import Car_details from './details_screens/car_details';
import Property_details from './details_screens/property_details';
import Phone_details from './details_screens/phone_details';
import Fashion_details from './details_screens/fashion_details';
import Seeking_work_details from './details_screens/seeking_work_details';
import Services_details from './details_screens/services_details';
import Jobs_details from './details_screens/jobs_details';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from 'react-native-image-view';
////REMEMBER TO UNINSTALL THE IMAGEVIEWER 'react-native-image-zoom-viewer'';


export default class Home extends Component <{}>{

	constructor(props){
    super(props);
    sliderWidth=Dimensions.get('window').width;
    itemWidth=Dimensions.get('window').width;
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  }



  state = {
    relatedProducts:[],
    showLoader:false,
    save_showLoader:false,
    showSearchForm:true,
    showRateLoader:true,
    activeSlide:0,
    save_button:true,
    messageModalVisible:false,
    ratingModalVisible:false,
    imageModalVisible:false,
    isShowNumber:false,
    errorMsg:'',
    visitor_name:'',
    visitor_phone:'',
    visitor_email:'',
    visitor_message:'',
    starCount: 0,
    userData:[],
    product_reviews:[],
    average_review_rate:0,
    imageViewIndex:0,
  }
  
  componentDidMount =()=> {
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
        this._loadInitialState().done();
    });
  }

  
  _loadInitialState = async()=>{  
    var token = await AsyncStorage.getItem('user-token');
    var datavalue = await AsyncStorage.getItem('user-data');
    var dataObject = JSON.parse(datavalue);
  
  if((token!=null)&&(token !='')){
    this.setState({
      userID:dataObject.id,
      userToken:token,
      userData:dataObject,
    }) 
    
  }
  Requests.fetch_related_products(this);
  Logic.update_category_view(this.props.route.params.paramsdata.category,this,false,true);
  Requests.get_product_reviews(this);
  }

  _renderCarouselItem = ({item, index})=>{
      return (
        <TouchableOpacity onPress={()=>this.setState({imageViewIndex:index,imageModalVisible:true})}> 
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+item}}  style={[{width: '100%',height:250}]}/>  
        </TouchableOpacity> 
      );        
     
  }

  _save_for_later = () =>{
    if(!this.state.userToken){
      AsyncMethods._loadSessionState(this).done();
    }else{
      Requests.save_products(this);  
    }
  }

  _open_rating_modal = () =>{
    if(!this.state.userToken){
      AsyncMethods._loadSessionState(this).done();
    }else{
     this.setState({ratingModalVisible:true,errorMsg:'',starCount:0})
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  _openscreen = (product)=>{
    this.props.route.params.paramsdata = product;
    Requests.fetch_related_products(this);
    this.setState({showRateLoader:true});
    Requests.get_product_reviews(this);
    this.props.navigation.navigate('Product',{paramsdata:product});
  }

  update_state =()=>{
      //return null;
    //Requests.save_products(this);  
  }
  
  get pagination () {
    const { content, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={image_value.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ paddingVertical: 10}}
          dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 7.5,
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


    createImageThumbnailElement(index,object1){
        var elements = [];
        for (const [key, value] of Object.entries(object1)) {
            elements.push(
            <TouchableOpacity key={key} onPress={()=>{this.setState({imageViewIndex:(key*1)}),index=value}}>
                <Image source={{ uri: value.source.uri}}  style={[{width: 60,height:60,marginRight:1}]}/>
            </TouchableOpacity>);
          }
        const scr_view = <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',marginBottom:5,flexDirection:'row',}}><>{elements}</></ScrollView>;

        return <View><Text style={{color:'#fff',textAlign:'center',fontSize:11,marginBottom:7}}>Image {(this.state.imageViewIndex)+1} of {Object.keys(object1).length}</Text>{scr_view}</View>;
        
    }

    createStarElement(n){
        var elements = [];
        for(i =0; i < n; i++){
            elements.push(<Image source={require('../images/rating_icon.png')}  style={{alignSelf:'flex-end',height: 15, width:15}}/>);
        }
        return elements;
    }

    render(){
        image_value = Logic.split_value(this.props.route.params.paramsdata.image,','); 
        let imageloop={};
        let json_array=[];
        for(let i = 0; i < image_value.length; i++) {
            json_array.push({'source': {'uri':global.serverUrl+global.UploadImageBaseUrl+image_value[i]}});
            //json_array.push({'url':global.serverUrl+global.UploadImageBaseUrl+image_value[i],'width':400});
            
        }
        
        imageloop = JSON.parse(JSON.stringify(json_array));
        
 
    return(
    <>
    {/* <Modal visible={this.state.imageModalVisible} transparent={true}>
                <ImageViewer imageUrls={imageloop} 
                swipeDownThreshold={10}
                enableSwipeDown={true} 
                imageIndex={0}
                onCancel={()=>{this.setState({imageModalVisible:false})}}
                renderFooter={(currentImage) => (<View><Text style={{color:'#fff'}}>My footer</Text></View>)}
                />
            </Modal> */}
    <ImageView
    images={imageloop}
    imageIndex={this.state.imageViewIndex}
    isVisible={this.state.imageModalVisible}
    onClose={()=>{this.setState({imageModalVisible:false})}}
    controls={{next: true, prev: true}}
    //renderFooter={(currentImage) => (this.createImageThumbnailElement(currentImage,imageloop))}
/>

    <Container style={{backgroundColor:'#efefefe'}}>
        
      {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0, width: '100%',height:'50%',}]}></ImageBackground>  */}
    <ImageBackground source={require('../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'15%',paddingTop:3,}]}></ImageBackground>

        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <View style={{alignItems:'flex-end',paddingRight:20,flexDirection:'row',justifyContent:'flex-end'}}>

        {this.state.showRateLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 15, width:15}}/> 
        ):null}

          {/* this.createStarElement(this.state.average_review_rate) */}
          <StarRating
          disabled={true}
          maxStars={5}
          rating={this.state.average_review_rate}
          fullStarColor={'white'}
          starSize={16}
          reversed={true}
          halfStarEnabled={false}
          
        />
       
        </View>
        {/* <View style={custom_style.container}>
        
        </View> */}
        
        <View style={[custom_style.item_box,{margin:0,height:null,marginBottom:7,marginTop:5,borderRadius:0,borderBottomWidth:1,borderColor:'#fff',borderTopWidth:1,overflow:'hidden'}]}>
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
          
          {/* <View style={{bottom:0,height:40,width:'100%',position:'absolute'}}>
          {this.pagination }
          </View> */}
            {/* <View style={{width:'100%',alignItems:'center',justifyContent:'center',alignContent:'center',backgroundColor: 'rgba(52, 52, 52, 0.8)',height:70,paddingTop:20,position:'absolute',bottom:0}}>
            {this.pagination }
            </View> */}
           

           <LinearGradient colors={['rgba(52, 52, 52, 0)', 'rgba(52, 52, 52, 0.3)', 'rgba(52, 52, 52, 0.8)']} 
            style={[{width:'100%',paddingVertical:10,position:'absolute',bottom:0}]} 
            start={{ x: 0.5, y: 0 }}>
            {this.pagination }
            <View style={custom_style.hr}></View>
            <View style={{flexDirection:'row'}}>
            <View style={{paddingHorizontal:15,alignSelf:'flex-start',width:'60%'}}>
            <Text style={[{fontSize:16,fontWeight:'bold',color:'#fff'}]}>{this.props.route.params.paramsdata.name}</Text>
            {this.props.route.params.paramsdata.land_mark!=''?(
            <Text style={{color:'#fff',fontSize:12}}><Icon name="location" style={{color:'#fff',fontSize:12}} />{this.props.route.params.paramsdata.land_mark}</Text>
            ):
            <Text style={{color:'#fff',fontSize:12}}><Icon name="location" style={{color:'#fff',fontSize:12}} />{this.props.route.params.paramsdata.state}/{this.props.route.params.paramsdata.lga}</Text>
            } 
            </View>
            

            <View style={{paddingHorizontal:15,alignSelf:'flex-end',width:'40%',alignContent:'flex-end',alignItems:'flex-end',justifyContent:'flex-end'}}>
            {this.props.route.params.paramsdata.hierarchy=='0'?(    
            <Text style={[{fontSize:9,fontWeight:'normal',color:'#fff',textAlign:'right'}]}>Limited</Text>
            ):
            <Text style={[{fontSize:9,fontWeight:'normal',color:'#fff',textAlign:'right'}]}>Promoted</Text>
            } 
            {this.props.route.params.paramsdata.category!='23'?(
            <NumberFormat value={this.props.route.params.paramsdata.price} displayType={'text'} renderText={formattedValue => <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
            ):null} 
            {this.props.route.params.paramsdata.category=='23'?(
                <NumberFormat value={this.props.route.params.paramsdata.salary} displayType={'text'} renderText={formattedValue => <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
            ):null} 
            </View>

            </View>
          </LinearGradient>
          {/* <View style={{marginTop:220,height:80,width:'100%',position:'absolute'}}> */}
            {/* <BlurView style={[custom_style.blurView,{width:'100%',height:80,borderTopColor:'#fff',borderTopWidth:2}]}
            reducedTransparencyFallbackColor="black"
            blurType="light"
            blurAmount={5}>
              <View style={{flexDirection:'column',paddingLeft:30,paddingTop:5}}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[custom_style.product_details_title,{color:'#000'}]}>{this.props.route.params.paramsdata.name}</Text>
              <Text>NGN {this.props.route.params.paramsdata.price}</Text>
              </View>
              <View>
              {this.pagination }
              </View>
            </BlurView> */}
          {/* </View> */}
          
          </View>

          <ScrollView>

          <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,paddingHorizontal:6}}> 
    <LinearGradient colors={['#6fb4d9', '#186684', '#15b3ef']} 
      style={[custom_style.action_call_btn,{marginRight:15,flexDirection:'row',height:40}]} 
      start={{ y: 1.5, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
        
        <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={() => {this.setState({messageModalVisible:true,errorMsg:''})}}>
        <Image source={require('../images/chat.png')}  style={{alignSelf:'center',height: 20, width:30}}/> 
          <Text style={{fontSize:13,color:'#fff'}}>Send Message</Text>
          </TouchableOpacity>
    </LinearGradient>
    <LinearGradient colors={['#6fb4d9', '#186684', '#15b3ef']} 
    // onPress={()=>{Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone);}}
      style={[custom_style.action_call_btn,{height:40,}]} 
      start={{ y: 2, x: 0.5 }} end={{ y: 0.0, x: 1.0 }}>
      <TouchableOpacity style={{flexDirection:'row',height:20}} onPress={() => !this.state.isShowNumber? this.setState({isShowNumber:true}) :Linking.openURL('tel:'+this.props.route.params.paramsdata.seller_phone)}>
      {/* <Text style={{fontSize:13,color:'#fff'}}> Place a call </Text> */}
      {this.state.isShowNumber ? (
        <View style={{flexDirection:'column'}}>  
        <Text style={{fontSize:13,color:'#fff',marginTop:-5}}> {this.props.route.params.paramsdata.seller_phone} </Text>
        <Text style={{fontSize:8,color:'#fff'}}> Tap to call </Text>
        </View>
      ): <Text style={{fontSize:13,color:'#fff',fontWeight:'bold'}}> Show Number </Text>
      }
      <Image source={require('../images/hand_holding_phone.png')}  style={{alignSelf:'center',height: 40, width:25}}/> 
      </TouchableOpacity>
    </LinearGradient>

      </View>
        <View>
        <View style={[custom_style.product_details_container]}>
        <Text style={[custom_style.product_details_title,{color:'#3f80a3',fontSize:14}]}>Details</Text>
        <Text style={{fontSize:14,marginTop:5}}>{this.props.route.params.paramsdata.description}</Text>
        <View style={{marginTop:10,flexDirection:'row'}}>
        {this.state.save_button?(    
        <TouchableOpacity style={[custom_style.call_btn,{backgroundColor:'#fff',width:'auto',marginRight:7,flexDirection:'row',paddingLeft:0}]} onPress={this._save_for_later}>
        {this.state.save_showLoader ?(
          <Image source={require('../images/spinner.gif')}  style={{marginLeft:5,height: 20, width:20}}/> 
          ):null}     
        <Image source={require('../images/bookmark_icon.png')}  style={{height: 13, width:12,marginRight:5}}/>    
        <Text style={{fontSize:10}}>Save For Later</Text>
        </TouchableOpacity>
        ):
        <TouchableOpacity style={[custom_style.call_btn,{backgroundColor:'#fff ',width:'auto',marginRight:7,flexDirection:'row'}]}>
        <Image source={require('../images/ok_icon.png')}  style={{height: 13, width:12,marginRight:5}}/>   
        <Text style={{fontSize:10}}>Saved</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity style={[custom_style.call_btn,{backgroundColor:'#fff',width:'auto',marginRight:7,flexDirection:'row'}]}  onPress={this._open_rating_modal}>
        <Image source={require('../images/rating_icon.png')}  style={{height: 20, width:20,marginRight:5}}/>
        <Text style={{fontSize:10}}>Feedback/Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[custom_style.call_btn,{backgroundColor:'orange',width:'auto',flexDirection:'row'}]}  onPress={Nav._openscreen.bind(this,this.props,'ReportAbuse',this.props.route.params.paramsdata)}>
        <Image source={require('../images/alert_icon.png')}  style={{height: 20, width:20,marginRight:5}}/>
        <Text style={{fontSize:10}}>Report Abuse</Text>
        </TouchableOpacity>

    
        </View>

        </View>

        {/* ////////SHOW DETAILS BASED ON CATEGORIES */}
        <View>
        {this.state.formGroup == 'cars' ? (
            <View>       
            <Car_details that={this} />
            </View>
            ):null
        }
        {this.state.formGroup == 'properties' ? (
        <View>  
        <Property_details that={this} />
        </View>
        ):null
        }
        {this.state.formGroup == 'phones' ? (
        <View>  
        <Phone_details that={this}/>
        </View>
        ):null
        }
        {this.state.formGroup == 'fashion' ? (
        <View>  
        <Fashion_details that={this}/>
        </View>
        ):null
        }
         
        {this.state.formGroup == 'seeking_work_form' ? (
        <View>  
        <Seeking_work_details that={this}/>
        </View>
        ):null
        }
        
        {this.state.formGroup == 'services_form' ? (
        <View>  
        <Services_details that={this}/>
        </View>
        ):null
        }

        {this.state.formGroup == 'jobs_form' ? (
        <View>  
        <Jobs_details that={this}/>
        </View>
        ):null
        }
        </View>

        <View style={[custom_style.product_details_container]}>
        <Text style={[custom_style.product_details_title,{color:'#3f80a3',fontSize:14}]}>Store/Office Address</Text>
        <Text style={{fontSize:14,marginTop:5}}>{this.props.route.params.paramsdata.store_address}</Text>
        </View>

        <TouchableOpacity style={[custom_style.call_btn,{backgroundColor:'#fff',width:'95%',flexDirection:'row',borderWidth:0.5,borderColor:'#ccc',marginTop:10,paddingVertical:12,alignSelf:'center'}]}  onPress={Nav._openscreen.bind(this,this.props,'NewProduct',this.props.route.params.paramsdata)}>
        <Text style={{fontSize:12}}>Post Ads like this</Text>
        </TouchableOpacity>

      {this.props.route.params.paramsdata.seller_fullname &&(
        <View style={[custom_style.product_details_container]}>
        <List>
              <ListItem avatar>
              <TouchableOpacity  style={{flexDirection:'row'}} onPress={Nav._openscreen.bind(this,this.props,'SellerPage',this.props.route.params.paramsdata)}>

                <Left>
                  <Thumbnail source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+this.props.route.params.paramsdata.seller_image}}/>
                </Left>
                <Body>
                  <Text style={{fontWeight:'bold',fontSize:16}}>{this.props.route.params.paramsdata.seller_fullname}</Text>
                  <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_email}</Text>
                  {/* <Text note style={{fontSize:13}}>{this.props.route.params.paramsdata.seller_phone}</Text> */}
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
                
                </TouchableOpacity>
              </ListItem>
              
            </List>
            
        </View>
      )}

<View style={[custom_style.formcontrol,{marginTop:10,paddingLeft:0,paddingRight:0,borderRadius:0,paddingBottom:0,marginLeft:7,marginRight:7,width:'auto'}]}>
      
      <List style={{paddingLeft:0,marginLeft:0}}>
          <ListItem style={{paddingLeft:10,marginLeft:0}}>
              <Body style={{flexDirection:'row'}}>
              <Image source={require('../images/safety_icon.png')}  style={{height: 20, width:20,marginRight:5,marginTop:4}}/>
              <Text style={[custom_style.section_header,{marginTop:0,marginLeft:0}]}>Safety Tips</Text>
              </Body>
            </ListItem>
            <ListItem style={{paddingLeft:10,marginLeft:0}}>
              <Body>
                <Text>Do not Pay in advance even for the delivery</Text>
              </Body>
            </ListItem>
            <ListItem style={{paddingLeft:10,marginLeft:0}}>
              <Body>
                <Text>Try to meet at a safe, public location</Text>
              </Body>
            </ListItem>
            <ListItem style={{paddingLeft:10,marginLeft:0}}>
              <Body>
                <Text>Check the item Before you buy it</Text>
              </Body>
            </ListItem>
            <ListItem style={{paddingLeft:10,marginLeft:0}}>
              <Body>
                <Text>Check the item Before you buy it</Text>
              </Body>
            </ListItem>
            
          </List>
        </View>



      <Text style={[custom_style.section_header,{marginTop:10,marginLeft:10}]}>Related Products</Text>  
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
  <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)} messageButtonClick={Nav._openscreen.bind(this,this.props,'Messages',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"
  />

{/* ////////////////STAR RATING MODAL VISIBILITY */}
< Modal
        animationType="slide"
        transparent={false}
        visible={this.state.ratingModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          //setModalVisible(!modalVisible);
          {this.setState({messageModalVisible:false})}
        }}
      >
        <View style={custom_style.modal_centeredView}>
          <View style={custom_style.modalView}>
            <Text>Leave Feedback/Rating:</Text>
            <Text style={custom_style.product_details_title}>{this.props.route.params.paramsdata.name}</Text>
            <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>

            <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#3f80a3'}
        starSize={20}
        halfStarEnabled={false}
        
      />
        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{backgroundColor:'#eee',fontSize:12,marginTop:5}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Title" keyboardType="default" selectionColor="#fff"
                value={this.state.userData.fullname} editable={false}
                />

        <Text style={[{marginBottom:5,paddingLeft:10}]}>Your Review</Text> 
        <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,paddingTop:10,width:'100%',borderColor:'#ddd8d8',textAlignVertical: 'top',}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Review" selectionColor={'#1688EA'}
        placeholderTextColor="grey" multiline={true} numberOfLines={4} onChangeText={(review) =>this.setState({review}) }
        />
        <View style={{flexDirection:'column'}}>
        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',alignSelf:'center'}]} onPress={()=>{Requests.send_feedback(this)}}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}  
        <Text style={{fontSize:14,fontWeight:'bold',color:'#fff'}}>Submit</Text>
        
        </TouchableOpacity>
        </View>
            <Pressable
              style={[custom_style.modal_buttonClose,{marginTop:20,alignSelf:'flex-end'}]}
              onPress={() => {this.setState({ratingModalVisible:false,starCount:0})}}
            >
              <Text style={{alignSelf:'flex-end'}}>Close</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>


{/* ////////////////MESSAGE MODAL VISIBILITY */}

< Modal
        animationType="slide"
        transparent={false}
        visible={this.state.messageModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          //setModalVisible(!modalVisible);
          {this.setState({messageModalVisible:false})}
        }}
      >
        <View style={custom_style.modal_centeredView}>
          <View style={custom_style.modalView}>
            <Text>Send a Message to Seller Regarding:</Text>
            <Text style={custom_style.product_details_title}>{this.props.route.params.paramsdata.name}</Text>
            <Text style={custom_style.errorMsg}>{this.state.errorMsg}</Text>
            <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{marginTop:15}]} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(visitor_name) =>this.setState({visitor_name}) } placeholder="Your Name" placeholderTextColor="grey" selectionColor={'#1688EA'}
        />
         <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{marginTop:15}]} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(visitor_email) =>this.setState({visitor_email}) } placeholder="Your Email" placeholderTextColor="grey" selectionColor={'#1688EA'} keyboardType="email-address"
        />

        <TextInput style={[custom_style.formcontrol,custom_style.textInputShadow,{marginTop:15}]} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(visitor_phone) =>this.setState({visitor_phone}) } placeholder="Phone Number" placeholderTextColor="grey" selectionColor={'#1688EA'} keyboardType="phone-pad"
        />

          <Text style={[{marginBottom:5,paddingLeft:10}]}>Details</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,paddingTop:10,width:'100%',borderColor:'#ddd8d8',textAlignVertical: 'top',}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Message" selectionColor={'#1688EA'}
            placeholderTextColor="grey" multiline={true} numberOfLines={4} onChangeText={(visitor_message) =>this.setState({visitor_message}) }
            />
          <View style={{flexDirection:'column'}}>
        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',alignSelf:'center'}]} onPress={()=>{Requests.message_product_seller(this)}}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}  
        <Text style={{fontSize:14,fontWeight:'bold',color:'#fff'}}>Submit</Text>
        </TouchableOpacity>
        </View>
            <Pressable
              style={[custom_style.modal_buttonClose,{marginTop:20,alignSelf:'flex-end'}]}
              onPress={() => {this.setState({messageModalVisible:false})}}
            >
              <Text style={{alignSelf:'flex-end'}}>Close</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>
  </Container>
  </>
	);
	}
}