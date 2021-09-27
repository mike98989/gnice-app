import React, {Component,useRef} from 'react';
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Modal,Text,ScrollView,View, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body,Icon, Right } from 'native-base';
import {custom_style} from '../components/custom_style';
import MainFooter from '../components/MainFooter';
import * as Nav from '../methods/Navigation'
import LinearGradient from 'react-native-linear-gradient';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { WebView } from 'react-native-webview';
import * as AsyncMethods from '../methods/AsyncMethods';
import * as Requests from '../methods/Requests';



export default class CardPaymentUi extends Component <{}>{
	constructor(props){
    super(props);
    //this.webViewRef = React.createRef();
  	}

    state = {
      showLoader:false,
      
    }

    init =() =>{
    const webViewRef = useRef(null);
    }

    componentDidMount =()=> {
      AsyncMethods._loadSellerActivationData(this).done();
    }


    render(){
      const webViewRef = React.createRef();
      const trans_status_url = 'https://gnice.com.ng/transactionstatus';
      const url = 'https://localhost/gnice';
      // onNavigationStateChange = state => {
        
      //   const { url } = state;
      //   if (!url) return;
      //   if (url === callback_url) {
      //     Nav._openscreen.bind(this,this.props,'TransactionStatus',{paramsdata:this.props.route.params.paramsdata});
      //     // get transaction reference from url and verify transaction, then redirect
      //     //const  redirectTo = 'window.location = "' + callback_url + '"';
      //     //this.webview.injectJavaScript(redirectTo);
      //   }
      // };

      return(
      <WebView 
      ref={webViewRef}
      source={{ uri: this.props.route.params.paramsdata.authorization_data.authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={(event) => {
        var go_to_url = event.url.split('?')[0];
        //alert(go_to_url);
        if (go_to_url == trans_status_url) {
          webViewRef.current.stopLoading();
          Requests.update_user_account_type(this);
        }
      }}
      
    />
	);
	}
}