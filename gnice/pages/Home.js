import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation'
import * as Requests from '../methods/Requests';


export default class Home extends Component <{}>{


	constructor(props){
    super(props);
    
  	}

    state = {
      products:[],
      showLoader:true,
      
    }
  
  componentDidMount =()=> {
    
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
        Requests.fetch_all_products(this);   
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_all_products(this);
  }




    render(){

    const renderItem = ({ item }) => (
      <Card style={{width:'48%',margin:0, marginLeft:'1%',borderRadius:10,overflow:'hidden'}}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.imageBaseUrl+item.image_1}}   style={{height: 200, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text style={custom_style.product_name}>{item.name}</Text>
            <Text style={custom_style.product_sub_name}>N{item.price}</Text>
          </Body>
        </Left>
      </CardItem>
      </TouchableOpacity>
    </Card>
    );

    return(
  <Container style={{backgroundColor:'#1271bb'}}>
  <ImageBackground source={require('../images/gnice_user_layout1.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'20%',paddingTop:5,}]}></ImageBackground>  
  <MainHeader header_type="transparent" nav_type="complete" title="Latest" profileImageClick={Nav._openscreen.bind(this,this.props,'UserLogin')} cartImageClick={Nav._openscreen.bind(this,this.props,'Cart')} openDrawer={Nav._opendrawer.bind(this,this.props)}/>
  <View style={[custom_style.left_border_radius,custom_style.right_border_radius,{paddingHorizontal:'1%',marginTop:5,marginHorizontal:15,backgroundColor:'#fff'}]}>
  <ScrollView style={{marginTop:10}}>
  <Text style={custom_style.section_header}>Best Selling</Text>    
  <SafeAreaView>
      <FlatList
        data={this.state.products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
      />
  </SafeAreaView>
  
  
  <Grid>
    <Col>
    <Card>
            
            <CardItem cardBody>
              <Image source={require('../images/banner2.jpeg')}  style={{height: 150, width: '100%', flex: 1}}/>
            </CardItem>
          </Card>
          </Col>
    
  </Grid>
  </ScrollView>
        </View>
      
        
        </Container>
	);
	}
}