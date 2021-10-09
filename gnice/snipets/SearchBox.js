
import React, {Component} from 'react';
import {Text,View, Image, TextInput, TouchableOpacity} from 'react-native';
import {custom_style} from '../components/custom_style';
import * as Logic from '../methods/Logic';
import * as Requests from '../methods/Requests';
import {Picker} from 'react-native-ui-lib'; //eslint-disable-line


const RenderSearchBox = (props) =>{
    return (
    <View style={{alignContent:'center',alignItems:'center'}}>
    <View style={[custom_style.formcontrol,custom_style.textInputShadow,{height:50,width:'80%',flexDirection:'row',alignContent:'flex-start',paddingVertical:0}]}>
    <TextInput style={{width:'80%',fontSize:18,color:'#000',height:50,margin:0}} selectionColor={'#1688EA'} onChangeText={(searchQuery) =>props.state.setState({searchQuery})}></TextInput>
    {props.state.state.showLoader ? (
    <Image source={require('../images/spinner.gif')}  style={{marginLeft:10,marginTop:15,height: 20, width:20}}/>
    ):null}
    
    {!props.state.state.showLoader && !props.state.state.showCatAndSub ? (
    <TouchableOpacity onPress={()=>{Requests.search(props.state)}}> 
    <Image source={require('../images/search_icon2.png')}  style={{marginHorizontal:5,marginTop:10,height: 30, width:30,alignSelf:'flex-start'}}/>
    </TouchableOpacity>
    ):null}
    <TouchableOpacity onPress={()=>{props.state.state.showCatAndSub ? props.state.setState({showCatAndSub:false}):props.state.setState({showCatAndSub:true})}}>
    <Image source={require('../images/filter.png')}  style={{marginLeft:10,marginTop:15,height: 18, width:18}}/>
    </TouchableOpacity>
    </View>
    {props.state.state.showCatAndSub ? (
    <View>    
    
    <View style={{flexDirection:'row',paddingHorizontal:10}}>
    <Picker
              title="Select Category"
              style={[custom_style.formcontrol,{paddingLeft:8,width:'50%',borderRadius:10,marginBottom:0,marginTop:0}]}
              placeholder="Select Category"
              showSearch
              value={props.state.state.categoryDropDownValue}
              onChange={item => Logic.onCategoryValueChange(item,props.state,false)}
              //onValueChange={Logic.onCategoryValueChange.bind(this,props.state)}
              searchStyle={{color: 'black', placeholderTextColor:'#000'}}
            >
            {props.state.state.categories_and_sub !== [] ? (
                    Object.entries(props.state.state.categories_and_sub).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                ) : (
                    null
                )}    
             
            </Picker>

    
            <Picker style={[custom_style.formcontrol,{paddingLeft:8,width:'50%',borderRadius:10,marginBottom:0,marginTop:0}]}
              title="Select Sub Category"
              showSearch
              placeholder="Select Sub Category"
              value={props.state.state.subCategoryDropDownValue}
              onChange={item => Logic.onSubCategoryValueChange(item,props.state,false)}
            >
              {
                    Object.entries(props.state.state.subCategoryListSelected).map(([i, value]) => {
                        return <Picker.Item key={i} label={value.title} value={i} />;
                    })
                }    
            </Picker>
    </View>
    <View>
    <TouchableOpacity onPress={()=>{Requests.search(props.state)}} style={[custom_style.login_btn,{alignSelf:'center',width:'30%'}]}>
    <Text style={{fontSize:17,color:'#fff'}}>Search</Text>
    </TouchableOpacity>
    </View>
    </View> 
    ):null}
    </View>

    );
}

export default RenderSearchBox;