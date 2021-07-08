import React, {Component} from 'react';
import {ListItem, Segment,Text,Thumbnail, List, Left,Right, Button, Icon, Body,Header, Title, Subtitle} from 'native-base';
import {View,Image,TouchableOpacity} from 'react-native';
import {custom_style} from './custom_style'; 
import {Footer, FooterTab} from 'native-base';

const MainFooter = (props) => (
    <Footer style={custom_style.footer_container}>
          <FooterTab>
            <Button vertical onPress={props.homeButtonClick}>
              <Icon style={props.active=='home' ? custom_style.styled_blue : null} name="apps" />
              <Text style={props.active=='home' ? custom_style.styled_blue : null} >Home</Text>
            </Button>
            <Button vertical onPress={props.pinnedButtonClick}>
              <Icon style={props.active=='pinned' ? custom_style.styled_blue : null} name="pin" />
              <Text style={props.active=='pinned' ? custom_style.styled_blue : null}>Pinned</Text>
            </Button>
            <Button vertical onPress={props.sellButtonClick}>
              <Icon style={props.active=='sell' ? custom_style.styled_blue : null} name="navigate" />
              <Text style={props.active=='sell' ? custom_style.styled_blue : null}>Sell</Text>
            </Button>
            <Button vertical onPress={props.userButtonClick}>
              <Icon name="person"/>
              <Text>User</Text>
            </Button>
          </FooterTab>
        </Footer>
)

export default MainFooter;

  