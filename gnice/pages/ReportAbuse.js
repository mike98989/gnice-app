import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Picker, Content, Card, CardItem, List,ListItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'
import MainHeader from '../components/MainHeader'
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';
import * as Logic from '../methods/Logic';



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

      onreportReasonChange(props,value) {
        let objectval = JSON.parse(JSON.stringify(this.state.report_reasons[value]));   
        this.setState({
        reportReasonSelected:this.state.report_reasons[value].reason,  
        reportReasonDropDownValue:value,
        //subCategoryListSelected: objectval.subcategory,
        });

        // let objectval = JSON.parse(JSON.stringify(this.state.carModelListSelected[value]));   
        //  this.setState({
        // carModelSelected:value,  
        //  });
       }
    

    render(){
    return(
        <Container style={{backgroundColor:'#d4d6d7'}}>
          <ImageBackground source={require('../images/gnice_bg_product_area.png')} style={[{resizeMode: "cover",
    position:'absolute',zIndex:0,top:-5, width: '100%',height:'70%',paddingTop:5,}]}></ImageBackground>  
        <MainHeader header_type="transparent" nav_type="backOnly" go_back={Nav._goback.bind(this,this.props)}/>
        <View style={[custom_style.container,{paddingHorizontal:20}]}>
        <Text style={[custom_style.section_header,{textAlign:'center',marginLeft:25,marginTop:20}]}>Report Abuse For</Text> 
        <Text style={[custom_style.section_header,{textAlign:'center',fontSize:20,marginLeft:25,marginTop:5,marginBottom:50}]}>{this.props.route.params.paramsdata.name}</Text>
        
        <Text style={custom_style.errorMsg}>{this.state.alertMsg}</Text>
      
        <Text style={[{marginBottom:5,paddingLeft:10}]}>Select Report Reasons</Text>  
        <Picker style={[custom_style.formcontrol,{width:'100%',paddingLeft:0,color:'#000'}]}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" style={{color:'#7a7878'}} />}
              headerStyle={{ backgroundColor: "#5da7d3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.reportReasonDropDownValue}
              onValueChange={this.onreportReasonChange.bind(this)}
            >
             {this.state.report_reasons !== [] ? (
                    Object.entries(this.state.report_reasons).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.reason} value={i} />;
                    })
                    ) : (
                        <Picker.Item label="Loading..." value="0" />
                    )}       

            </Picker>

            <Text style={[{marginBottom:5,paddingLeft:10}]}>Report</Text> 
            <TextInput style={[custom_style.formcontrol,{paddingHorizontal:15,paddingTop:15,width:'100%',height: 200,borderColor:'#ddd8d8'}]} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Report" selectionColor="#fff"
            placeholderTextColor="grey" multiline={true} onChangeText={(abuseContent) =>this.setState({abuseContent}) }
            />

        <TouchableOpacity style={[custom_style.login_btn,{flexDirection:'row',alignSelf:'center'}]} onPress={this._report_abuse}>
        {this.state.showLoader ?(
        <Image source={require('../images/spinner2.gif')}  style={{marginHorizontal:5,height: 25, width:25}}/> 
        ):null}  
        <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Submit</Text>
        </TouchableOpacity>

    </View>

        <MainFooter homeButtonClick={Nav._openscreen.bind(this,this.props,'Home',null)}
            pinnedButtonClick={Nav._openscreen.bind(this,this.props,'Pinned',null)} active="pinned"
            /> 
        </Container>
	);
	}
}