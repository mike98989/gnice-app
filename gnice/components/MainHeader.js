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
    <Header transparent style={[{height:40,marginTop:Platform.OS=='ios'? 20:40,paddingLeft:0}]}>
      
        <Left>
          {/* <Button transparent style={{marginLeft:0}} onPress={props.go_back}>
          <Icon name='ios-arrow-back' style={{fontSize:30,color:'#000'}} />
          </Button> */}

        <TouchableOpacity style={[custom_style.back_curved_btn,custom_style.right_border_radius,custom_style.textInputShadow]} onPress={props.go_back}>
         <Text style={{color:'#000',fontWeight:'bold',fontSize:12}}>
         <Icon name='ios-arrow-back' style={{fontSize:13,color:'#000'}} /> Back</Text>
        </TouchableOpacity>
        </Left>
          <Body>
            <Title>{props.title}</Title>
            
        </Body>
        </Header>

    }
      </View> 
)

export default MainHeader;

  