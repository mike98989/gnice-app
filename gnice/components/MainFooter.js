import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity,Animated} from 'react-native';
import {custom_style} from './custom_style'; 
import {Footer, FooterTab} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const MainFooter = (props) => ( 
  <Animated.View style={{opacity:props.opacity,height:props.height}}>
    <Footer style={[custom_style.footer_container]} >
          <FooterTab style={{paddingVertical:0}}>
          <LinearGradient style={[{width:'100%',flexDirection:'row'}]}
        colors={['#fff', '#c9e0f4', '#c9e0f4']}
        start={{ x: 0.5, y: 0 }}>
            <Button>
            <TouchableOpacity onPress={props.homeButtonClick} style={{alignItems:'center'}}>
            <Image source={require('../images/drawer5.png')}  style={{height: 13, width:12}}/>
              <Text style={[props.active=='home' ? custom_style.color_blue : custom_style.color_black, {textTransform:'capitalize',fontSize:10}]} >Homes</Text>
            </TouchableOpacity>
            </Button>
            <Button vertical style={{marginRight:20}}>
            <TouchableOpacity onPress={props.pinnedButtonClick} style={{alignItems:'center'}}>
            <Image source={require('../images/bookmark_icon.png')}  style={{height: 13, width:12}}/>
              <Text style={[props.active=='pinned' ? custom_style.color_blue : custom_style.color_black,{textTransform:'capitalize',fontSize:10}]}>Saved</Text>
              </TouchableOpacity>
              </Button>
            
            <TouchableOpacity onPress={props.sellButtonClick} style={{height:50,width:50,backgroundColor: '#0f619b',borderBottomRightRadius:25,borderBottomLeftRadius:25,borderTopRightRadius:25,borderTopLeftRadius:25,alignItems:'center',justifyContent:'center',marginTop:Platform.OS === 'ios' ? 0 : -7 ,alignContent:'center'}}>
              <Icon name="add" style={{fontWeight:'bold',fontSize:30,color:'#fff',alignContent:'center',alignItems:'center'}}/>
            </TouchableOpacity>
            
            <Button vertical style={{marginLeft:20}}>
            <TouchableOpacity onPress={props.messageButtonClick} style={{alignItems:'center',width:100}}>  
            <Image source={require('../images/chat_black.png')}  style={{height: 17, width:16}}/>
              <Text style={{color:'#000',textAlign:'center',fontSize:10}}>Messages</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
            <TouchableOpacity onPress={props.userButtonClick} style={{alignItems:'center'}}>  
            <Image source={require('../images/user_icon.png')}  style={{height: 17, width:16}}/>
              <Text style={{textTransform:'capitalize',color:'#000',fontSize:10}}>User</Text>
              </TouchableOpacity>
            </Button>
            </LinearGradient>
          </FooterTab>
          
        </Footer>
        </Animated.View>
)

export default MainFooter;

  