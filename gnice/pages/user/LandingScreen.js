import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import {custom_style} from '../../components/custom_style';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import UserScreenHeader from '../../components/UserScreenHeader';
import * as Nav from '../../methods/Navigation';
import * as AsyncMethods from '../../methods/AsyncMethods';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import * as Requests from '../../methods/Requests';
import { Fab } from 'native-base';


export default class LandingScreen extends Component <{}>{

	constructor(props){
    super(props);
  	}

    state = {
      userData:[],
      messages_count:'',
      products_count:'',
      transactions:'',
    }

    componentDidMount =()=> {
      AsyncMethods._loadSessionState(this).done();
      //this._loadInitialState().done();
      const unsubscribe = this.props.navigation.addListener('focus', () => {
        AsyncMethods._loadSessionState(this).done();
        });
    }
    
      update_state=()=>{
        Requests.fetch_all_user_products(this);
        Requests.fetch_all_messages_to_user(this);
        Requests.fetch_all_user_transactions(this);
      }

    

    render(){
    return(
    <Container style={{backgroundColor:'#fff'}}>
      {this.state.userToken?(
      <>
      <ImageBackground source={require('../../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'17%',paddingTop:5,}]}></ImageBackground>
        <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingTop:20}]}>
        <Image source={require('../../images/gnice_logo.png')}  style={{height: 45, width:45,marginBottom:5,marginTop:30,marginLeft:25}}/>
        <Text style={[custom_style.section_header,{marginLeft:25,marginTop:10}]}>My Dashboard</Text>
        <Text style={[custom_style.section_header,{marginLeft:25,fontSize:13,fontWeight:'bold',color:'#aaa'}]}>{new Date().toLocaleString()}</Text>
        {this.state.userData.seller_account_details ?(
        <View style={{flexDirection:'column',paddingHorizontal:20}}>
        <ScrollView>
        <LinearGradient
          style={[custom_style.dashboard_box2,{marginRight:30}]}
        colors={['#528ccf', '#6ba7ec', '#fff']}
        start={{ x: 0.5, y: 0 }}>
        <Text style={[custom_style.dashboard_box1_header,{fontSize:20}]}>{this.state.userData.seller_account_details.title} account package</Text>
        {this.state.user_remaining_product_slot !=0 && this.state.slot_remaining_duration >0?(
          <Text style={[custom_style.dashboard_box1_sub_header]}>You have <Text style={{fontWeight:'bold',fontSize:18}}>{this.state.user_remaining_product_slot}</Text> ads slot(s) and {this.state.slot_remaining_duration} days left</Text>
        ):
        <Text style={[custom_style.dashboard_box1_sub_header]}>You have <Text style={{fontWeight:'bold',fontSize:18}}>{this.state.user_remaining_product_slot}</Text> ads slot left</Text>}
    
        <TouchableOpacity style={[custom_style.login_btn,{width:'30%'}]} onPress={Nav._openscreen.bind(this,this.props,'SellerAccountTypeScreen_preview',null)}>
        <Text style={{fontSize:14,color:'#fff'}}>Upgrade</Text>
        </TouchableOpacity>
        </LinearGradient>

          <View style={{flexDirection:'row'}}>
          <LinearGradient
          style={[custom_style.dashboard_box1,{marginRight:10}]}
        colors={['#528ccf', '#6ba7ec', '#fff']}
        start={{ x: 0, y: 0 }}>
        <Text style={[custom_style.dashboard_box1_header]}>{this.state.products_count}</Text>
        <Text style={[custom_style.dashboard_box1_sub_header]}>Total uploaded ads</Text>
          </LinearGradient>

          <LinearGradient
          style={[custom_style.dashboard_box1]}
        colors={['#f5610a', '#f09058', '#fff']}
        start={{ x: 0.5, y: 0 }}>

        <Text style={[custom_style.dashboard_box1_header]}>{this.state.messages_count}</Text>
        <Text style={[custom_style.dashboard_box1_sub_header]}>Total client's response</Text>

          </LinearGradient>
          </View>

          <View style={{flexDirection:'column'}}>
          <LinearGradient
          style={[custom_style.dashboard_box2,{marginRight:30}]}
        colors={['#528ccf', '#6ba7ec', '#fff']}
        start={{ x: 0.5, y: 0 }}>
        <Text style={[custom_style.dashboard_box1_header,{fontSize:16}]}>Payments History</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={[custom_style.dashboard_box1_sub_header]}>Total payment count <Text style={{fontWeight:'bold',fontSize:18}}>{this.state.transactions.length}</Text></Text>
        <TouchableOpacity style={[custom_style.login_btn,{width:'30%',marginTop:-10,marginLeft:20}]} onPress={Nav._openscreen.bind(this,this.props,'Transactions',null)}>
        <Text style={{fontSize:14,color:'#fff'}}>Details</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
          </View>
        </ScrollView> 
        </View>
        
        
        ):null}
        </View>
        
        <Fab
            style={{ backgroundColor: '#f5610a' }}
            position="bottomRight"
            onPress={Nav._openscreen.bind(this,this.props,'NewProduct',null)}>
            <Icon name="add" style={{fontWeight:'bold'}}/>
          </Fab>

      </>
      ):
      <View style={{flex:1,alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
      </View> 
      }
      
    </Container>
	);
	}
}