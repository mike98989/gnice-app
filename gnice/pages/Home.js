import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Badge, Header, Content, Tab, Tabs,DefaultTabBar,Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right, Footer, FooterTab, Item,Input} from 'native-base';
import {custom_style} from '../components/custom_style';
import MainHeader from '../components/MainHeader'
//import MainFooter from '../components/MainFooter'
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Nav from '../methods/Navigation';
import * as Logic from '../methods/Logic';
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import { SearchBar } from 'react-native-elements';
import MainFooter from '../components/MainFooter';
import LinearGradient from 'react-native-linear-gradient';


export default class Home extends Component <{}>{


  constructor(props){
    super(props);
    }

    state = {
      userData:[],
      products:[],
      categories_and_sub:[],
      showLoader:true,
      search: '',
      showSearchForm:true,
    }
  
  componentDidMount =()=> {
    //AsyncMethods._loadSessionState(this).done();

    this._loadInitialState().done();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //this.setState({showLoader:true})
      //AsyncMethods._loadSessionState(this).done();
        Requests.fetch_all_products(this); 
        Requests.fetch_all_categories_and_sub_categories(this);  
      });
  
  }
  
  _loadInitialState = async()=>{  
  Requests.fetch_all_products(this);
  Requests.fetch_all_categories_and_sub_categories(this);
  }


  _open_search_form =()=>{
    if(this.state.showSearchForm){
      this.setState({showSearchForm:false});
    }else{
      this.setState({showSearchForm:true});
    }
    
  }


  render(){

    const renderProductItems = ({ item }) => (
      image_value = Logic.split_value(item.image, ','),
      //alert(JSON.stringify(image_value)),
      // <View style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',marginBottom:4,borderRadius:10,overflow:'hidden'}]}>
      //   <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+item.image}}  style={{height: 150, width: '100%', flex: 1}}/>
      // </View>
      <Card style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',overflow:'hidden'}]}>
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
    </Card>


  // <Card style={[custom_style.item_box,{width:'48%',margin:0, marginLeft:'1%',borderRadius:10,overflow:'hidden'}]}>
  //       <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'Product',item)}>
  //     <CardItem cardBody>
  //       <Image source={{ uri: global.serverUrl+global.UploadImageBaseUrl+image_value[0]}}  style={{height: 150, width: null, flex: 1}}/>
  //     </CardItem>
  //     <CardItem>
        
  //         <Body>
  //         <Text numberOfLines={2} ellipsizeMode="tail" style={custom_style.product_name}>{item.name}</Text>   
  //         <Text style={custom_style.product_price}>NGN {item.price}</Text>  
          
  //         </Body>
        
  //     </CardItem>
      
  //     </TouchableOpacity>
  //   </Card>
    );


    const renderCategories = ({item}) => (
      <Card style={custom_style.category_box}>
      <TouchableOpacity onPress={Nav._openscreen.bind(this,this.props,'SubCategories',JSON.stringify(item.subcategory))}>
      <CardItem cardBody style={{alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Image source={{ uri: global.serverUrl+global.CategoryImageBaseUrl+item.image}}  style={{alignSelf:'center',width: 50,height:45}}/>
      </CardItem>
      <CardItem footer style={{flexDirection:'column'}}>
      <Text style={{textAlign:'center',fontFamily:'Rajdhani',color:'#2d2c2c'}}>{item.title}</Text> 
      {/* <Text style={{textAlign:'center',fontFamily:'Rajdhani',color:'#2d2c2c'}}>{item.counted_category_products.counted}</Text>  */}
      </CardItem>
      </TouchableOpacity>
    </Card>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTabBar = (props: any) => {
  props.tabStyle = Object.create(props.tabStyle);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <DefaultTabBar {...props} />;
};

    return(
  <Container style={{backgroundColor:'#fff'}}>
  {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
  {/* <MainHeader profile_image = {this.state.userData.image} header_type="transparent" nav_type="complete" title="Latest" searchImageClick={this._open_search_form} openDrawer={Nav._opendrawer.bind(this,this.props)}/> */}
   
        
        <Tabs renderTabBar={renderTabBar} style={{backgroundColor:'#fff'}}>
          <Tab  tabStyle={{ backgroundColor: "white" }} activeTabStyle={{ backgroundColor: "#c9e0f4"}} heading="Products">
    {/* {this.state.showSearchForm ? (
    <View style={[custom_style.search_div_transparent,custom_style.textInputShadow,{backgroundColor:'transparent'}]}>
    <Item style={{borderWidth:0}}>
      <TextInput style={[custom_style.formcontrol,{height:40,paddingLeft:0,paddingTop:10,width:'90%',backgroundColor:'transparent',paddingLeft:10,fontSize:18,marginBottom:0}]} placeholder="Search" />
      <TouchableOpacity><Icon name="ios-search" /></TouchableOpacity>
    </Item>
    </View>
  ):null} */}

<View>
<LinearGradient style={[{height:200,width:'100%',alignItems:'center',alignContent:'center',paddingTop:50,margin:0}]}
        colors={['#c9e0f4', '#c9e0f4', '#fff']}
        start={{ x: 0.5, y: 0 }}>
    <Text style={custom_style.heading1}>What Are You Looking For?</Text>
    <View style={[custom_style.formcontrol,{height:50,width:'90%',flexDirection:'row',alignContent:'flex-start',paddingVertical:0}]}>
    <TextInput style={{width:'80%',fontSize:18,color:'#000',height:50,margin:0}} autoFocus={true}></TextInput>
    <TouchableOpacity>
    <Image source={require('../images/search_icon2.png')}  style={{marginHorizontal:5,marginTop:10,height: 30, width:30,alignSelf:'flex-start'}}/>
    </TouchableOpacity>
    <TouchableOpacity>
    <Image source={require('../images/filter.png')}  style={{marginLeft:10,marginTop:15,height: 18, width:18}}/>
    </TouchableOpacity>
    </View>
    </LinearGradient>
  </View>  

    <Text style={[custom_style.section_header,{marginLeft:25,marginTop:2}]}>Latest</Text>  
    {this.state.showLoader ?(
        <View style={{alignSelft:'center',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../images/spinner4.gif')}  style={{marginHorizontal:5,height: 65, width:65}}/>
        </View> 
    ):null} 

{/* <View style={{flexDirection:'row',paddingLeft:20}}>
  <TouchableOpacity style={custom_style.home_link_btn}>
    <Text>Best Selling</Text>
  </TouchableOpacity>

  <TouchableOpacity style={custom_style.home_link_btn}>
    <Text>Most Viewed</Text>
  </TouchableOpacity>

  <TouchableOpacity style={custom_style.home_link_btn}>
    <Text>Top Rated</Text>
  </TouchableOpacity>

</View> */}
<View style={[{paddingHorizontal:'.1%',marginTop:5,marginHorizontal:10,}]}>
<SafeAreaView>
    <FlatList
      data={this.state.products}
      renderItem={renderProductItems}
      keyExtractor={(item, index) => String(index)}
      horizontal={false}
      numColumns={2}
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
  active="home"
  />

  </Container>
  );
  }
}
