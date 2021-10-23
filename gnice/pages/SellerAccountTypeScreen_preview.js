import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../components/custom_style';
import { Container, Spinner,Header, Content, Card, List, ListItem,CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as Requests from '../methods/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Nav from '../methods/Navigation';
import * as AsyncMethods from '../methods/AsyncMethods';


export default class SellerAccountTypeScreen_preview extends Component <{}>{

	constructor(props){
    super(props);
    sliderWidth=325;
    itemWidth=280;
    this.init_carousel_content();
  	}

     _update_user_account =()=>{
         Requests.update_user_account_type(this);
     }

    generate_checkout =()=>{
        Requests.generate_paystack_checkout(this);
    }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done(); 
          
        });
    
      }
      update_state =()=>{
        Requests.get_account_packages(this); 
        /////////SET THE EMAIL TO ACTIVATE TO THE USERDATA EMAIL
        this.setState({email_to_activated:this.state.userData.email,token:this.state.userToken}); 
      }

    // _loadInitialState = async()=>{
    //     var token = await AsyncStorage.getItem('user-token');
    //     var datavalue = await AsyncStorage.getItem('user-data');
    //     var dataObject = JSON.parse(datavalue);
    //     if((token!=null)&&(token !='')){
    //     this.setState({
    //         userID:dataObject.id,
    //         userToken:token,
    //         userData:dataObject,
    //       })  
    //     }else{
    //     AsyncStorage.clear();
    //     //Toast.show({text: "Invalid Token!",buttonText: "",position: "bottom"});
    //     alert("Invalid token!");
    //     var props = this.props.navigation;
    //     setTimeout(function(){ 
    //         props.navigate('UserLogin');
    //     }, 2000);
        
    //     }
      
    //     }

        
    init_carousel_content=()=>{
    this.state = {
    userToken:'',
    userData:[],    
    activeSlide:2, 
    selectedOption:null,  
    selectedValue:null, 
    //packages:[],   
    showLoader2:true,  
    }
    }

    _renderCarouselItem = ({item, index})=>{
        return (
            <TouchableOpacity onPress={()=>this.setState({selectedOption:index,selectedValue:item.value,selected_account_type:item.package_id})}>
            <Card style={[custom_style.textInputShadow,{borderRadius:20,overflow:'hidden'}]}>
            <CardItem header bordered style={{backgroundColor:'#d7f0f9'}}>
              <Text style={{fontWeight:'bold'}}>{item.title}</Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    {item.value!=0?(
                        <Text style={{textAlign:'center',alignSelf:'center',fontFamily:'Rajdhani',fontWeight:'bold',fontSize:18}}>
                        NGN {item.value}/
                        {item.duration_in_days=='30'?(
                        <Text style={{fontSize:12,color:'#aaa'}}>month</Text>
                      ):(
                        <Text style={{fontSize:12,color:'#aaa'}}>{item.duration_in_days} days</Text>
                        )}
                        </Text>
                    ):(
                    <Text style={{textAlign:'center',alignSelf:'center',fontFamily:'Rajdhani',fontWeight:'bold',fontSize:18}}>
                        Free
                    </Text>
                    )}
                    
              </Body>
            </CardItem>

            {item.package_contents.map((body, i) => (
            <CardItem bordered  key={i}>
                <Body>
                    <Text style={{fontWeight:'bold'}}>
                    {body.content_title}: <Text style={{fontWeight:'normal'}}>{body.content_body}</Text>
                  </Text>
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
        const {activeSlide } = this.state;
        return (
                <Pagination
                dotsLength={this.state.packages.length}
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
    <Container style={custom_style.container}>
        <LinearGradient
        colors={['#226790', '#226790', '#fff']}
        start={{ x: 0.5, y: 0 }}>
        <ImageBackground source={require('../images/gnice_burble_backgroud.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:10,top:0, width: '100%',height:'50%',paddingTop:5,}]}>
        </ImageBackground>    
        <ScrollView>
         <View style={[{paddingHorizontal:30,marginTop:40,marginBottom:40}]}> 
        <Image source={require('../images/gnice_logo.png')}  style={{alignSelf:'center',marginBottom:10,height: 40, width:40}}/>  
        <Text style={custom_style.preview_header}>Welcome! You are just a click away from a whole world of possiblities.</Text>
        <Text style={custom_style.preview_header_title}>CHOOSE A SELLER ACCOUNT TYPE</Text>

        {this.state.showLoader2 ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center',height:'auto'}}>
        <Image source={require('../images/spinner.gif')}  style={{marginHorizontal:5,height: 35, width:35}}/>
        </View> 
        ):
        <>
        <View style={{height:'auto'}}>
        {this.state.packages ? (
             <Carousel layout={'default'} layoutCardOffset={18}
             ref={(c) => { this._carousel = c; }}
             data={this.state.packages}
             renderItem={this._renderCarouselItem}
             sliderWidth={sliderWidth}
             itemWidth={itemWidth}
             inactiveSlideOpacity={0.75}
             inactiveSlideScale={0.9}
             firstItem={this.state.activeSlide}
             onSnapToItem={(index)=>this.setState({activeSlide:index})}
           />
        ):null}    
        </View>
        {this.state.packages?(
            this.pagination
        ):null}   
         
        {this.state.selectedOption!==null ? (
            this.state.selectedOption=='0'?(
            <TouchableOpacity onPress={this._update_user_account.bind(this)} style={[custom_style.login_btn,custom_style.right_border_radius,custom_style.left_border_radius,{alignSelf:'center',marginTop:0,backgroundColor:'#ff6347'}]}>
            {this.state.showLoader ?(
            <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
            ):null}
            <Text style={{color:'#fff'}}>Continue</Text>
            </TouchableOpacity>
            ):(
            <>    
            <TouchableOpacity onPress={this.generate_checkout.bind(this)} style={[custom_style.login_btn,custom_style.right_border_radius,custom_style.left_border_radius,{alignSelf:'center',marginTop:0,backgroundColor:'#ff6347'}]}>
            {this.state.showLoader ?(
            <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
            ):null}
            <Text style={{color:'#fff'}}>Make Payment</Text>
            </TouchableOpacity>
            <Image source={require('../images/secure_with_paystack.png')}  style={{alignSelf:'center',marginTop:15,height: 55, width:150}}/> 
            </>
            )
         
        ):null
        }
        </>
        }

    
        </View>  
       </ScrollView>
      </LinearGradient>    
      
    </Container>
	);
	}
}