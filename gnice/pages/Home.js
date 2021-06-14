import React, {Component} from 'react';
import { StyleSheet,AsyncStorage, ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'

export default class Home extends Component <{}>{


	constructor(props){
    super(props);
  	}



    render(){
    return(
  <Container style={custom_style.container}>
  <MainHeader header_type="transparent" nav_type="complete" title="Latest" profileImageClick={Nav._openscreen.bind(this,this.props,'UserLogin')} cartImageClick={Nav._openscreen.bind(this,this.props,'Cart')} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
 
  <ScrollView>
  <Content style={{paddingHorizontal:10}}>
  <Text style={custom_style.section_header}>Best Selling</Text>    
  <Grid>
    <Col>
    <Card>
            
            <CardItem cardBody>
              <Image source={require('../images/image1.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            
          </Card>
          </Col>
    <Col>
    <Card>
            <CardItem cardBody>
              <Image source={require('../images/image2.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            
          </Card>
          </Col>
  </Grid>

  <Grid>
    <Col>
    <Card>
            
            <CardItem cardBody>
              <Image source={require('../images/image3.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            
          </Card>
          </Col>
    <Col>
    <Card>
            <CardItem cardBody>
              <Image source={require('../images/image4.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            
          </Card>
          </Col>
  </Grid>

  <Grid>
    <Col>
    <Card>
            
            <CardItem cardBody>
              <Image source={require('../images/image5.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            
          </Card>
          </Col>
    <Col>
    <Card>
          <CardItem cardBody>
            <Image source={require('../images/image6.jpeg')}  style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
            
          </Card>
          </Col>
  </Grid>
   
  <Grid>
    <Col>
    <Card>
            
            <CardItem cardBody>
              <Image source={require('../images/banner2.jpeg')}  style={{height: 150, width: '100%', flex: 1}}/>
            </CardItem>
          </Card>
          </Col>
    
  </Grid>
          
        </Content>
      
        </ScrollView>
        </Container>
	);
	}
}