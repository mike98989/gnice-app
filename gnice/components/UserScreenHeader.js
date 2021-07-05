import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity, Touchable} from 'react-native';
import {custom_style} from './custom_style'; 

const MainHeader = (props) => (
  <View style={[custom_style.fullWidth]}>
    {props.nav_type == "complete" ? (
      <View>
        {props.header_type == "transparent" ? (
        <Header transparent style={[{height:40,marginTop:15}]}>
        <Left>
          <TouchableOpacity transparent style={{marginLeft:10}} onPress={props.openDrawer}>
          <Image source={require('../images/drawer4.png')} style={{width:35,height:35}}/>
            </TouchableOpacity>
        </Left>
          <Body>
            <Title>{props.title}</Title>
            
          </Body>
          <Right>
          <Button transparent style={{marginLeft:2}} onPress={props.profileImageClick}>
          <Image source={{ uri: global.serverUrl+global.ProfileImageBaseUrl+props.profileImageUrl}} style={{width:35,height:35}}/>
          </Button>
          <Button transparent style={{marginLeft:12}} onPress={props.logoutImageClick}>
          <Image source={require('../images/logout_icon.png')} style={{width:25,height:27}}/>
          </Button>
          </Right>
        </Header>
        
        
      ):null
      }
      </View>
    ):
    <Header transparent style={[{height:40,marginTop:5}]}>
        <Left>
          <Button transparent style={{marginLeft:10}} onPress={props.go_back}>
          <Icon name='ios-arrow-back' style={{color:'#fff'}} />
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

  