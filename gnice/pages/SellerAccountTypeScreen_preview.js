import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Spinner,Header, Content, Card, List, ListItem,CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as Requests from '../methods/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Nav from '../methods/Navigation';


export default class SellerAccountTypeScreen_preview extends Component <{}>{

	constructor(props){
    super(props);
    sliderWidth=325;
    itemWidth=280;
    this.init_carousel_content();
  	}
    

    // _update_user_account =()=>{
    //     Requests.update_user_account_type(this);
    // }

    generate_checkout =()=>{
        Requests.generate_paystack_checkout(this);
    }

    componentDidMount =()=> {
        this._loadInitialState().done();
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
        }else{
        AsyncStorage.clear();
        //Toast.show({text: "Invalid Token!",buttonText: "",position: "bottom"});
        alert("Invalid token!");
        var props = this.props.navigation;
        setTimeout(function(){ 
            props.navigate('UserLogin');
        }, 2000);
        
        }
      
        }

        
    init_carousel_content=()=>{
    this.state = {
    userToken:'',
    userData:[],    
    activeSlide:2, 
    selectedOption:null,  
    selectedValue:null, 
    authorization_data:[],
    content:[
        {
            title:'Advance',
            body:[
                {
                    title:'Product upload',
                    body:'Unlimited products upload'
                },
                {
                    title:'Reach',
                    body:'Unlimited product reach'
                },
                {
                    title:'Ads',
                    body:'Your ads runs freely for a certain period'
                },
                {
                    title:'Whatsapp',
                    body:'Whatsapp link activated on your product page'
                },
                {
                    title:'Product Index',
                    body:'Your products remains at the top search rank.'
                },
                {
                    price:'N10,000/mo',
                }
            ],
            value:'1000000'
        },
        {
            title:'Super',
            body:[
                {
                    title:'Product upload',
                    body:'Unlimited products upload'
                },
                {
                    title:'Reach',
                    body:'Unlimited product reach'
                },
                {
                    title:'Ads',
                    body:'Unlimited ads slot and unlimited ads reach'
                },
                {
                    title:'Whatsapp',
                    body:'Whatsapp link active on product page'
                },
                {
                    title:'Product Index',
                    body:'Your products are seen before others'
                },
                {
                    price:'N7000/mo',
                    
                }
            ],
            value:'700000'
        },
        {
            title:'Free',
            body:[
                {
                    title:'Product upload',
                    body:'Maximun of 50 products upload'
                },
                {
                    title:'Reach',
                    body:'unpredicted product reach'
                },
                {
                    title:'Ads',
                    body:'No ads slot. Your Ads will be paid by you'
                },
                {
                    title:'Whatsapp',
                    body:'No whatsapp link on your product page'
                },
                {
                    price:'Free',
                   
                }
            ],
            value:'0'
        },
        {
            title:'Basic',
            body:[
                {
                    title:'Product upload',
                    body:'Unlimited products upload'
                },
                {
                    title:'Reach',
                    body:'Product reach of about 5000 to 150000 customers'
                },
                {
                    title:'Ads',
                    body:'Your ads runs freely for a certain period'
                },
                {
                    title:'Whatsapp',
                    body:'Whatsapp link activated on your product page'
                },
                {
                    price:'N5,000/mo',
                    
                }
            ],
            value:'500000'
        },

        
    ]    
    }
    }

    _renderCarouselItem = ({item, index})=>{
        return (
            <TouchableOpacity onPress={()=>this.setState({selectedOption:index,selectedValue:item.value})}>
            <Card style={[custom_style.textInputShadow,{borderRadius:20,overflow:'hidden'}]}>
            <CardItem header bordered style={{backgroundColor:'#d7f0f9'}}>
              <Text style={{fontWeight:'bold'}}>{item.title}</Text>
            </CardItem>
            {item.body.map((body, i) => (
            <CardItem bordered  key={i}>
                <Body>
                {body.price ? (
                    <Text style={{textAlign:'center',alignSelf:'center',fontFamily:'Rajdhani',fontWeight:'bold',fontSize:20}}>
                    {body.price}
                  </Text>
                ):null}  
                {body.body ? (
                    <Text>
                    {body.body}
                  </Text>
                ):null}  
              </Body>
            </CardItem>
            ))
            }
            <CardItem style={{backgroundColor: index==this.state.selectedOption ? '#9ecbdb':'#fff'}}>
              <Body style={{alignItems:'center'}}>
                <Text>Choose</Text>
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>
        );        

    }


    get pagination () {
        const { content, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={content.length}
              activeDotIndex={activeSlide}
              
              dotStyle={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  marginHorizontal: 4,
                  backgroundColor: '#086e9a'
              }}
              inactiveDotStyle={{
                backgroundColor: '#fff'
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render(){
    return(
    <Container>
        <LinearGradient
        colors={['#226790', '#226790', '#fff']}
        start={{ x: 0.5, y: 0 }}>
        <ImageBackground source={require('../images/gnice_burble_backgroud.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10,top:0, width: '100%',height:'50%',paddingTop:5,}]}>
        </ImageBackground>    
        <ScrollView>
         <View style={[custom_style.justify_container,{paddingHorizontal:30,marginTop:100,marginBottom:40}]}> 
        <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',marginBottom:10,height: 40, width:32}}/>  
        <Text style={custom_style.preview_header}>Welcome! You are just a click away from a whole world of possiblities.</Text>
        <Text style={custom_style.preview_header_title}>CHOOSE AN ACCOUNT TYPE</Text>
        <View style={{height:400}}>
        <Carousel layout={'default'} layoutCardOffset={18}
              ref={(c) => { this._carousel = c; }}
              data={this.state.content}
              renderItem={this._renderCarouselItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.9}
              firstItem={this.state.activeSlide}
              onSnapToItem={(index)=>this.setState({activeSlide:index})}
            />
            </View>
        { this.pagination }   
         
        {this.state.selectedOption!==null ? (
         <TouchableOpacity onPress={this.generate_checkout.bind(this)} style={[custom_style.login_btn,custom_style.right_border_radius,custom_style.left_border_radius,{alignSelf:'center',marginTop:10,backgroundColor:'#ff6347'}]}>
         {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}
         <Text style={{color:'#fff'}}>Get Started</Text>
        </TouchableOpacity>
        ):null
        }
        </View>  
       </ScrollView>
      </LinearGradient>    
      
    </Container>
	);
	}
}