import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity} from 'react-native';
import {custom_style} from './custom_style'; 

const MainHeader = (props) => (
  <View style={[custom_style.fullWidth]}>
    {props.nav_type == "complete" ? (
      <View>
        {props.header_type == "transparent" ? (
        <Header transparent style={[{height:40}]}>
        <Left>
          <Button transparent style={{marginLeft:10}} onPress={props.openDrawer}>
          <Image source={require('../images/drawer1.png')} style={{width:25,height:25}}/>
            </Button>
        </Left>
          <Body>
            <Title>{props.title}</Title>
            
          </Body>
          <Right>
          <Button transparent style={{marginLeft:2}} onPress={props.cartImageClick}>
          <Image source={require('../images/cart_icon.png')} style={{width:25,height:25}}/>
          </Button>  
          <Button transparent style={{marginLeft:2}} onPress={props.profileImageClick}>
          <Image source={require('../images/user_icon.png')} style={{width:25,height:25}}/>
          </Button>
          </Right>
        </Header>
        
        
      ):null
      }
      </View>
    ):
    <Header transparent style={[{height:40}]}>
        <Left>
          <Button transparent style={{marginLeft:10}} onPress={props.go_back}>
          <Icon name='ios-arrow-back' style={{color:'#000'}} />
          </Button>
        </Left>
          <Body>
            <Title>{props.title}</Title>
            
        </Body>
        </Header>

    }
      </View> 
)

export default MainHeader;

  