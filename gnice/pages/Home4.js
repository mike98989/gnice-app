import React, {Component,useRef, useEffect, useState} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground,Animated, Alert } from 'react-native';
import { Container, Badge, Header, Content, Tab, Tabs,DefaultTabBar,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input,Fab} from 'native-base';
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
import NumberFormat from 'react-number-format';
import { Dropdown } from 'react-native-material-dropdown-v2'

export default class Home extends Component <{}>{


  constructor(props){
    super(props);
    //const flatListRef = React.useRef();
    this.flatListRef = React.createRef();
    
    this.state = {
      userData:[],
      products:[],
      active_request_label:'trending',
      categories_and_sub:[],
      showLoader:true,
      currentPage: 1,
      nextPage:2,
      fetch_limit:10,
      showPaginationLoader:false,
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
      if (!this.state.showPaginationLoader && this.state.currentPage < this.state.nextPage){
        //Requests.fetch_trending_product(this); 
        this.state.active_request_label =='trending' ? Requests.fetch_trending_product(this):null,
        this.state.active_request_label =='top_rated'? Requests.fetch_top_rated_product(this):null,
        this.state.active_request_label == 'latest'?Requests.fetch_latest_product(this):null,
        Requests.fetch_all_categories_and_sub_categories(this);  
      }
      });
  
  }
  
  moveToTop =()=>{
    this.flatListRef.current.scrollToIndex({ index: 0 })
  }
  //const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });

  _loadInitialState = async()=>{  
  //Requests.fetch_trending_product(this);
  this.state.active_request_label =='trending' ? Requests.fetch_trending_product(this):null,
  this.state.active_request_label =='top_rated'? Requests.fetch_top_rated_product(this):null,
  this.state.active_request_label == 'latest'?Requests.fetch_latest_product(this):null,
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
      //currency_price = Logic.currency_convert(item.price),

      <View style={[custom_style.item_box,{width:'47%',margin:0, marginLeft:'2%',marginBottom:17,overflow:'hidden'}]}>
        <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
      <CardItem cardBody>
        <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 150, width: null, flex: 1}}/>
      </CardItem>
      <CardItem cardBody style={{paddingHorizontal:10,paddingBottom:10}}>
          <Body>
          <Text numberOfLines={2} ellipsizeMode="tail" style={custom_style.product_name}>{item.name}</Text>  
          {item.category!='23'?(
            <NumberFormat value={item.price} displayType={'text'} renderText={formattedValue => <Text>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
          ):null} 
          {item.category=='23'?(
            <NumberFormat value={item.salary} displayType={'text'} renderText={formattedValue => <Text>{formattedValue}</Text>} thousandSeparator={true} prefix={'NGN'}/>
          ):null} 

          

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
          <Tab  tabStyle={{ backgroundColor: "#fff"}} textStyle={{color: '#ccc'}} activeTabStyle={{ backgroundColor: "#efefef"}} activeTextStyle={{color: '#0f619b'}} heading="Products">
    
   

    {/* <Animated.View style={{transform: [
            { translateX: this.state.setHeaderShown ? 0 : - 100 },
          ],}}> */}
            
    {/* <Animated.View style={{opacity: headerDisplay,transform: [{translateY: imageTranslate}]}}> */}
    <LinearGradient style={[{height:'auto',width:'100%',alignItems:'center',alignContent:'center',paddingTop:0,paddingBottom:0,margin:0}]}
        colors={['#efefef', '#efefef', '#fff']}
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
  
    
    
    <View style={{flexDirection:'row'}}>
      
    <View> 
    {/* <Animated.View style={[custom_style.section_header,{flexDirection:'row',marginTop:2,fontSize:headerTextOpacity,opacity: headerImageOpacity}]}>   */}
    <View style={[custom_style.section_header,{flexDirection:'row',paddingTop:0,marginTop:0}]}>
    <Dropdown
        // label='Favorite Fruit'
        data={[{value: 'Latest Ads'}, {value: 'Sponsored Ads'}, {value: 'Top Rated Ads'}]}
        value='Sponsored Ads'
        underlineColor='transparent'
        itemTextStyle={{paddingTop:0,paddingBottom:0}}
        animationDuration={555}
        style={{width:'auto',height:30,backgroundColor:'transparent',fontSize:14}}
        useNativeDriver={true}
        onChangeText={(value,index)=>{value=='Sponsored Ads' && this.setState({active_request_label:'trending',currentPage: 1,nextPage:2,showLoader:true,products:[]});Requests.fetch_trending_product(this),value=='Top Rated Ads' && this.setState({active_request_label:'top_rated',currentPage: 1,nextPage:2,showLoader:true,products:[]});Requests.fetch_top_rated_product(this),value=='Latest Ads' && this.setState({active_request_label:'latest',currentPage: 1,nextPage:2,showLoader:true,products:[]});Requests.fetch_latest_product(this)}}
      />
        {/* <Icon name='ios-arrow-down' style={{fontSize:15,marginLeft:-10,marginTop:8,color:'#000'}} /> */}
        <Image source={require('../images/arrow_down_icon.png')}  style={{marginLeft:-10,marginTop:13,height: 6, width:12}}/>
        
      </View> 
        
      </View>
      </View>
    

    {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
    ):null} 

<View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10}]}>


<SafeAreaView>
    <FlatList
      ref={this.flatListRef}
      data={this.state.products}
      renderItem={renderProductItems}
      keyExtractor={(item, index) => String(index)}
      horizontal={false} 
      numColumns={2}
      ListFooterComponent={() => (
        <View style={{marginBottom:(150)}} />
      )}
    //   onScroll={this.handleScroll}
      onScroll={Animated.event(
      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],{useNativeDriver: false,
        listener: event => {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
        if(layoutMeasurement.height + contentOffset.y >= contentSize.height - 55){
          this.setState({showArrowUpButton:true});
        }

        if(contentOffset.y == 0){
          this.setState({showArrowUpButton:false});
        }
      }}
      )}

      onEndReachedThreshold = {1}
      onMomentumScrollBegin = {() => {this.onEndReachedCalledDuringMomentum = false;}}
      onEndReached = {() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            if (!this.state.showPaginationLoader && this.state.currentPage < this.state.nextPage){
              this.setState({showPaginationLoader:true});
              //Requests.fetch_trending_product(this);
              this.state.active_request_label =='trending' ? Requests.fetch_trending_product(this):null,
              this.state.active_request_label =='top_rated'? Requests.fetch_top_rated_product(this):null,
              this.state.active_request_label == 'latest'? Requests.fetch_latest_product(this):null,
              this.onEndReachedCalledDuringMomentum = true;
            } 
            
          }
      }}
      
      // onScroll={Animated.event(
      // [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],{useNativeDriver: false,
      //   listener: event => {
      //   const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
      //   if(layoutMeasurement.height + contentOffset.y >= contentSize.height - 55){
      //     this.setState({showArrowUpButton:true});
      //   }

      //   if(layoutMeasurement.height + contentOffset.y >= contentSize.height - 5){
      //     if (!this.state.showPaginationLoader && this.state.currentPage < this.state.nextPage){
      //         this.setState({showPaginationLoader:true});
      //         this.state.active_request_label =='trending' ? Requests.fetch_trending_product(this):null,
      //         this.state.active_request_label =='top_rated'? Requests.fetch_top_rated_product(this):null,
      //         this.state.active_request_label == 'latest'? Requests.fetch_latest_product(this):null;
              
      //       //Requests.fetch_trending_product(this);
      //     } 
          
      //   }

      //   if(contentOffset.y == 0){
      //     this.setState({showArrowUpButton:false});
      //   }

      //  }}
      // )}

      // onScroll={({nativeEvent})=>{
      //   const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
      //   if(layoutMeasurement.height + contentOffset.y >= contentSize.height - 20){
      //     alert("close to bottom");
      //   }

      //   if(contentOffset.y == 0){
      //     alert("Now on top");
      //   }
      //   }}
    

    />

       

</SafeAreaView>  


</View>
{this.state.showPaginationLoader ?(
        <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',bottom:0,position:'absolute',marginTop:15,paddingBottom:20}}>
        <Image source={require('../images/spinner4.gif')}  style={{alignSelf:'center',marginHorizontal:5,height: 45, width:45}}/>
        <Text>Loading...</Text>
        </View> 
        ):null}

{this.state.showArrowUpButton && (
          <Fab
            style={{ backgroundColor: 'black' }}
            position="bottomRight"
            onPress={()=>{this.moveToTop(this)}}>
            <Icon name="arrow-up" style={{fontSize:14}}/>
          </Fab>
)}

          </Tab>
          <Tab  tabStyle={{ backgroundColor: "white" }} textStyle={{color: '#ccc'}} activeTabStyle={{ backgroundColor: "#efefef" }}  activeTextStyle={{color: '#0f619b'}} heading="Categories">

        {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
        ):null} 
      
          <Text style={[custom_style.section_header,{marginLeft:25,marginVertical:10,fontSize:15}]}>Select Category</Text>  
          <View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
          <SafeAreaView>
              <FlatList
                
                data={this.state.categories_and_sub}
                renderItem={renderCategories}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={3}
                ListFooterComponent={() => (
                  <View style={{marginBottom:(50)}} />
                )}
              />
          </SafeAreaView>  
          
          </View>

          </Tab> 

          
  </Tabs>
  <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)} messageButtonClick={Nav._openscreen.bind(this,this.props,'Messages',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"  opacity={foooterOpacity}  height={foooterHeight}
  />

  </Container>
  );
  }
}
