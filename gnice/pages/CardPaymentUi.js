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
      transRef:null,
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
      ///const url = 'https://localhost/gnice';
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
        
        console.log(event);
        //return;
        let url = event.url;
        //let url = "https://gnice.com.ng/transactionstatus?trxref=dqylih826x&reference=dqylih826x";
        if(url.indexOf('reference=') != -1){
          webViewRef.current.stopLoading();
          var split_url = url.split('?');
          var go_to_url = split_url[0]; 
          var split_further = split_url[1].split('=');
          var reference = split_further[2]; 
          if(reference!='' && go_to_url==trans_status_url){
            this.setState({transRef:reference});
            Requests.verify_transaction(this); 
            }
          //alert(reference);
          return;
        }
        return;
        // if (go_to_url == trans_status_url) {
        //   webViewRef.current.stopLoading();
        //   Requests.update_user_account_type(this);
        // }
      }}
      
    />
	);
	}
}