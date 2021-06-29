import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Container,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity} from 'react-native';
import {custom_style} from './custom_style'; 

const MainHeader = (props) => (
  <View>
    {props.nav_type == "complete" ? (
      <View>
        {props.header_type == "transparent" ? (
        <Header transparent style={[{height:40}]}>
        <Left>
          <Text>{JSON.stringify(props)}</Text>
          {/* <Button transparent style={{marginLeft:10}} onPress={props.openDrawer}>
          <Image source={require('../images/drawer5.png')} style={{width:33,height:30}}/>
            </Button> */}
        </Left>
          <Body>
          <Image source={require('../images/gnice_logo_only.png')}  style={{alignSelf:'center',height: 30, width:25}}/>
          </Body>
            <Right>
            {this.profile_image ?(
            <Button transparent style={{marginRight:10}} onPress={props.searchImageClick}>
            <Image source={require('../images/search_icon.png')} style={{width:30,height:30}}/>
            </Button>
             ):null}
            </Right>
         
          
        </Header>
        
        
      ):null
      }
      </View>
    ):
    <Header transparent style={[{height:40}]}>
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

  