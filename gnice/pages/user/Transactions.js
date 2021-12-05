import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, List, ListItem, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../../components/custom_style';
import MainFooter from '../../components/MainFooter';
import * as Nav from '../../methods/Navigation'
import UserScreenHeader from '../../components/UserScreenHeader';
import * as AsyncMethods from '../../methods/AsyncMethods';
import LinearGradient from 'react-native-linear-gradient';
import * as Requests from '../../methods/Requests';
import MainHeader from '../../components/MainHeader'
import * as Logic from '../../methods/Logic';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'


export default class Messages extends Component <{}>{


	constructor(props){
    super(props);
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo('en-US');
  	}

    state = {
      transactions:[],
      showLoader:false,
    }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        const unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done();
          });
      
      }
  
      update_state =()=>{
        Requests.fetch_all_user_transactions(this);  
      }
      
    render(){
    return(
        <Container style={[custom_style.container,{backgroundColor:'#c9e0f4'}]}>
        <ImageBackground source={require('../../images/gnice_user_layout2.png')} style={[{resizeMode: "cover",
        position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>    
        {/* <UserScreenHeader header_type="transparent" nav_type="complete" profileImageClick={Nav._openscreen.bind(this,this.props,'MyProfile')} profileImageUrl={this.state.userData.image} logoutImageClick={Nav._logout.bind(this,this.props,'Home',null)} openDrawer={Nav._opendrawer.bind(this,this.props)}/> */}
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <Text style={[custom_style.section_header,{color:'#fff',marginTop:30}]}>Payment History</Text>  
        <Text style={[custom_style.section_header,{marginLeft:2,color:'#fff',fontSize:13}]}>Records of all payment transactions</Text>      
        <View style={{marginTop:5,marginBottom:20}}>
        </View>

        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
        ):null}

        <View style={[custom_style.curved_top_side_view,{flex:1,backgroundColor:'#fff',paddingHorizontal:10,paddingTop:0,height:'auto',overflow:'hidden'}]}>
        <ScrollView>
        {!this.state.showLoader ? (
            <List>
            {this.state.transactions.length !=0 ?(
                this.state.transactions.map((body, i) => (
                    <ListItem key={i} style={{paddingLeft:0}}>
                     <Left style={{flexDirection:'column'}}>
                     <Text style={{fontSize:13}}>{body.currency}{body.amount}</Text>
                     <View style={[custom_style.call_btn,{width:'auto'}]}>
                     <Text style={{fontSize:13}}>{body.title}</Text>
                       </View>
                     
                   </Left>
                     <Body>
                       <View style={{flexDirection:'row'}}>
                       <View style={{flexDirection:'column'}}>    
                       <Text>
                        Ref: {body.trans_reference}</Text>
                        <Text style={{fontSize:11}}>{body.trans_date}</Text>
                       </View>
                        <Text style={{fontSize:11}}>
                        </Text>
                        </View>
                       
                       {/* <Text note style={{fontSize:9,alignSelf:'flex-end',color:'#186684',marginRight:10,marginTop:5}}>
                       {body.trans_date} - ({this.timeAgo.format(new Date(Date.parse(body.trans_date.replace(/-/g, '/'))))})
                       </Text> */}
                     </Body>
                     <Right>
                     {body.trans_status=='success'?(
                       <Image source={require('../../images/ok_icon.png')}  style={{height: 15, width:15,}}/>
                        ):
                        <Image source={require('../../images/cancel_icon.png')}  style={{height: 15, width:15,}}/>
                        }
                     </Right>
                     
                   </ListItem>
                   
                   ))
            ):
            <ListItem style={{paddingLeft:0}}>
            <Body>
                <Text style={{textAlign:'center',color:'#f30'}}>No transaction Yet on this account!</Text></Body>
            </ListItem>
            }    
            

            </List>
        ):null}
          </ScrollView>
          
        </View>
        
        </Container>
	);
	}
}