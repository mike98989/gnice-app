import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, List,ListItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'
import MainHeader from '../components/MainHeader'
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import * as Logic from '../methods/Logic';
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line



export default class ReportAbuse extends Component <{}>{

	constructor(props){
    super(props);
    //alert(JSON.stringify(props.route.params.paramsdata));
  	}

    state = {
        userData:[],
        report_reasons:[],
        reportReasonDropDownValue:'0',
        abuseContent:'',
        alertMsg:'',
    }
  
    _report_abuse=()=>{
      Requests.reportAbuse(this);
    }

    componentDidMount =()=> {
        AsyncMethods._loadSessionState(this).done();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          AsyncMethods._loadSessionState(this).done(); 
          
        });
    
      }
      update_state =()=>{
        Requests.fetch_report_reasons(this);  
      }

      // onreportReasonChange(props,value) {
      //   let objectval = JSON.parse(JSON.stringify(this.state.report_reasons[value]));   
      //   this.setState({
      //   reportReasonSelected:this.state.report_reasons[value].reason,  
      //   reportReasonDropDownValue:value,
      //   //subCategoryListSelected: objectval.subcategory,
      //   });

      //   // let objectval = JSON.parse(JSON.stringify(this.state.carModelListSelected[value]));   
      //   //  this.setState({
      //   // carModelSelected:value,  
      //   //  });
      //  }
    

    render(){
    return(
        <Container style={{backgroundColor:'#d4d6d7'}}>
          {/* <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>   */}
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingHorizontal:20}]}>
        <KeyboardAvoidingView>
        <ScrollView>
        
        {/* <View style={[{flex:1,paddingHorizontal:20}]}> */}
        <Image source={require('../images/alert_icon.png')}  style={{alignSelf:'center',height: 45, width:45}}/> 
        <Text style={[custom_style.section_header,{textAlign:'center',marginTop:3}]}>Report Abuse For</Text> 
        <Text style={[custom_style.section_header,{textAlign:'center',fontSize:20,marginTop:5,marginBottom:50}]}>{this.props.route.params.paramsdata.name}</Text>
        
        <Text style={custom_style.errorMsg}>{this.state.alertMsg}</Text>
              
        <Picker
              title="Select Reason"
              style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Reason"
              showSearch
              value={this.state.reportReasonDropDownValue}
              onChange={item => Logic.onreportReasonChange(item,this)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {this.state.report_reasons !== [] ? (
                    Object.entries(this.state.report_reasons).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.reason} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Report</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingLeft:8,borderRadius:10,paddingTop:10,width:'100%',borderColor:'#ddd8d8',textAlignVertical: 'top',}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Report" selectionColor={'#1688EA'}
            placeholderTextColor="grey" multiline={true} numberOfLines={4} onChangeText={(abuseContent) =>this.setState({abuseContent}) }
            />

        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',alignSelf:'center'}]} onPress={this._report_abuse}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}  
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Submit</Text>
        </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>

    </View>

    <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)} sellButtonClick={Nav._openscreen.bind(this,this.props,'NewProduct',null)}
  pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} userButtonClick={Nav._openscreen.bind(this,this.props,'UserArea',null)} 
  active="home"
  />
        </Container>
	);
	}
}