import React, {Component,useRef, useEffect, useState} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground,Animated } from 'react-native';
import { Container, Badge, Header, Content, Tab, Tabs,DefaultTabBar,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
import SearchBox from '../snipets/SearchBox'
//import MainFooter from '../components/MainFooter'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation';
import * as Logic from '../methods/Logic';
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
// import { SearchBar } from 'react-native-elements';
import MainFooter from '../components/MainFooter';
import LinearGradient from 'react-native-linear-gradient';


export default class Home extends Component <{}>{


  constructor(props){
    super(props);

    this.state = {
      userData:[],
      products:[],
      categories_and_sub:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
      categoryDropDownValue:'-1',
      subCategoryListSelected:[],
      subCategorySelected:'',
      subCategorySelectedText:'',
      subCategoryDropDownValue:'-1',
      subCategorySelectedText:'',
      searchQuery:'',
      scrollY: new Animated.Value(0),
      animatedOpacityValue: new Animated.Value(1),
      showSearchView:true,
      headerShown:true,
      setHeaderShown:false,
      
    }

    }
    
    
  
    
  componentDidMount =()=> {
    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
        Requests.fetch_trending_product(this); 
        Requests.fetch_all_categories_and_sub_categories(this);  
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_trending_product(this);
  Requests.fetch_all_categories_and_sub_categories(this);
  }

  _getHeaderImageOpacity = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
};

_getHeaderImageSize = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [50, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
};

_getHeaderTextOpacity = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [15, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
};
_getFooterOpacity = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
};
_getFooterHeight = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [50, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
};

  render(){
    const headerImageOpacity = this._getHeaderImageOpacity();
    const headerTextOpacity = this._getHeaderTextOpacity();
    const headerImageSize = this._getHeaderImageSize();
    const foooterOpacity = this._getFooterOpacity();
    const foooterHeight = this._getFooterHeight();

//   useEffect(() => {
//     Animated.timing(translation, {
//       toValue: headerShown ? 0 : -100,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//   }, [headerShown]);

    const renderProductItems = ({ item }) => (
      image_value = Logic.split_value(item.image, ','),
      <View style={[custom_style.item_box,{width:'47%',margin:0, marginLeft:'2%',marginBottom:17,overflow:'hidden'}]}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 150, width: null, flex: 1}}/>
      </CardItem>
      <CardItem cardBody style={{paddingHorizontal:10,paddingBottom:10}}>
          <Body>
          <Text numberOfLines={2} ellipsizeMode="tail" style={custom_style.product_name}>{item.name}</Text>   
          <Text style={custom_style.product_price}>NGN {item.price}</Text> 
          {item.land_mark!=''?(
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{item.land_mark}</Text>
          ):
          <Text style={{color:'#7a7878',fontSize:12}}><Icon name="location" style={{color:'#7a7878',fontSize:12}} />{item.state}/{item.lga}</Text>
          } 
          </Body>
        
      </CardItem>
      
      </TouchableOpacity>
    </View>

    );
        
  

    const renderCategories = ({item}) => (
      <View style={custom_style.category_box} >
      <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'SubCategories',JSON.stringify(item.subcategory))}>
      <CardItem cardBody style={{alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Image source={{ uri: global.serverUrl+global.CategoryImageBaseUrl+item.image}}  style={{alignSelf:'center',width: 50,height:45}}/>
      </CardItem>
      <CardItem footer style={{flexDirection:'column'}}>
      <Text style={{textAlign:'center',fontFamily:'Rajdhani',color:'#2d2c2c'}}>{item.title}</Text> 
      {/* <Text style={{textAlign:'center',fontFamily:'Rajdhani',color:'#2d2c2c'}}>{item.counted_category_products.counted}</Text>  */}
      </CardItem>
      </TouchableOpacity>
    </View>
    );

const renderTabBar = (props: any) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar />;
};


  
return(
  <Container style={{backgroundColor:'#fff'}}>

        <Tabs renderTabBar={renderTabBar}>
          <Tab  tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#c9e0f4"}} heading="Products">
    

    {/* <Animated.View style={{transform: [
            { translateX: this.state.setHeaderShown ? 0 : - 100 },
          ],}}> */}
            
    {/* <Animated.View style={{opacity: headerDisplay,transform: [{translateY: imageTranslate}]}}> */}
    <LinearGradient style={[{height:'auto',width:'100%',alignItems:'center',alignContent:'center',paddingTop:0,paddingBottom:0,margin:0}]}
        colors={['#c9e0f4', '#c9e0f4', '#fff']}
        start={{ x: 0.5, y: 0 }}>
     <Animated.Image style={[custom_style.searchImageStyle, {opacity: headerImageOpacity,height:headerImageSize,width:headerImageSize}]}
        source={require('../images/gnice_logo.png')} />
                           
     {/* <Image source={require('../images/gnice_logo.png')}  style={{marginTop:5,height: 50, width:50,alignSelf:'center'}}/>      */}
    <Animated.Text style={[custom_style.heading2,{fontSize:headerTextOpacity,opacity: headerImageOpacity}]}>What Are You Looking For?</Animated.Text>
    {/* <Text>{JSON.stringify(this.state.categories_and_sub)}</Text> */}
    {this.state.categories_and_sub ? (
      //this.state.showSearchView ? (
        <SearchBox state = {this}/>
      //):null
      
    ):null
    }
    </LinearGradient>
  
    <Animated.Text style={[custom_style.section_header,{marginLeft:25,marginTop:2,fontSize:headerTextOpacity,opacity: headerImageOpacity}]}>Latest Ads</Animated.Text>  
    {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
    ):null} 

<View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
<SafeAreaView>
    <FlatList
      data={this.state.products}
      renderItem={renderProductItems}
      keyExtractor={(item, index) => String(index)}
      horizontal={false} 
      numColumns={2}
    //   onScroll={this.handleScroll}
      onScroll={Animated.event(
      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],{useNativeDriver: false}
      )}
    

    />
</SafeAreaView>  
</View>

          </Tab>
          <Tab  tabStyle={{ backgroundColor: "white" }} activeTabStyle={{ backgroundColor: "#c9e0f4" }}  heading="Categories">

          {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
      ):null} 
      
          <Text style={[custom_style.section_header,{marginLeft:25,marginVertical:10}]}>Categories</Text>  
          <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
          <SafeAreaView>
              <FlatList
                data={this.state.categories_and_sub}
                renderItem={renderCategories}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={3}
              />
          </SafeAreaView>  
          
          </View>

          </Tab> 
  </Tabs>
  <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"  opacity={foooterOpacity}  height={foooterHeight}
  />

  </Container>
  );
  }
}
