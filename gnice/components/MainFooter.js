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
        colors={['#fff', '#fff', '#c9e0f4']}
        start={{ x: 0.5, y: 0 }}>
            <Button>
            <TouchableOpacity onPress={props.homeButtonClick} style={{alignItems:'center'}}>
            <Image source={require('../images/drawer5.png')}  style={{height: 13, width:12}}/>
              <Text style={[props.active=='home' ? custom_style.color_blue : custom_style.color_black, {textTransform:'capitalize'}]} >Home</Text>
            </TouchableOpacity>
            </Button>
            <Button vertical>
            <TouchableOpacity onPress={props.pinnedButtonClick} style={{alignItems:'center'}}>
            <Image source={require('../images/bookmark_icon.png')}  style={{height: 13, width:12}}/>
              <Text style={[props.active=='pinned' ? custom_style.color_blue : custom_style.color_black,{textTransform:'capitalize'}]}>Saved</Text>
              </TouchableOpacity>
              </Button>
            <Button vertical>
            <TouchableOpacity onPress={props.sellButtonClick} style={{alignItems:'center'}}>
            <Image source={require('../images/sellicon_png.png')}  style={{height: 17, width:16}}/>
              <Text style={{textTransform:'capitalize',color:'#000'}}>Sell</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
            <TouchableOpacity onPress={props.userButtonClick} style={{alignItems:'center'}}>  
            <Image source={require('../images/user_icon.png')}  style={{height: 17, width:16}}/>
              <Text style={{textTransform:'capitalize',color:'#000'}}>User</Text>
              </TouchableOpacity>
            </Button>
            </LinearGradient>
          </FooterTab>
          
        </Footer>
        </Animated.View>
)

export default MainFooter;

  