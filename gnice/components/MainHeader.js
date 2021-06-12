import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity} from 'react-native';
import {custom_style} from './custom_style'; 
const MainHeader = (props) => (
  <View style={[custom_style.fullWidth]}>
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
          <Right />
        </Header>
        
      ):null
      }
      </View> 
)

export default MainHeader;

  