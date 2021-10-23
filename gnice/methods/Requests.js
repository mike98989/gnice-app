import React from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../components/global';
import * as Logic from './Logic';
import * as Commons from './Commons';

  //////SIGNUP METHOD
  export const signup = (that) => {
    if((that.state.fullname=='')||(that.state.email=='')||(that.state.phone=='')||(that.state.password=='')||(that.state.confiirm_phone=='')){
    that.setState({
        errorMsg:'Please enter all fields!',
      })
    }else if(that.state.password!=that.state.confirm_password){
      that.setState({
        errorMsg:'Passwords do not match!',
      })
    }else{ 
    
    let formData = new FormData();
    formData.append('fullname', that.state.fullname);
    formData.append('email', that.state.email);
    formData.append('phone', that.state.phone);
    formData.append('password', that.state.password);
    formData.append('confirm_password', that.state.confirm_password);
    formData.append('seller','1');
    

    that.setState({
        showLoader:true
      });  
    fetch (global.serverUrl+'api/user_signup',{
    method:'POST',
    headers: {
        'gnice-authenticate': 'gnice-web'
      },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));return
    if(res.status =="1"){
      //alert(JSON.stringify(res.msg));
      that.setState({
        errorMsg:'',
        showRegisterView:false,
        showConfirmationView:true,
      })
    }else{
      that.setState({
        errorMsg:res.msg,
      })
      //alert(JSON.stringify(res.msg));
    }
    that.setState({
        showLoader:false
      })
    })
  .catch((error) => {
    console.error(error);
    //var message = "There was an error! Please check your connection";
      Commons._showToast(error,ToastAndroid.LONG);
      that.setState({
        errorMsg:error,
        showLoader:false
      })
      
    });

    }

  }



///////RESEND CONFIRMATION CODE
export const resend_confirmation_code = (that) => {
    if((that.state.Email=='')){
      that.setState({
        errorMsg:'Please enter your email address',
      })
    }
    else{

        that.setState({
        showLoader:true
      }); 

    fetch (global.serverUrl+'api/user_resend_confirmation_code',{
    method:'POST',
    // headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    body: JSON.stringify({
      resend_to_email: that.state.Email,
    }),
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //console.log(JSON.stringify(res));
    if(res.status =="1"){
      //alert(res.msg);
      that.setState({
        showConfirmationView:true,showConfirmationCodeBox:true,showConfirmationViewEmailAddress:true,Email:that.state.Email,errorMsg:''
      })
    }else{
      Commons._showToast(res.msg,ToastAndroid.LONG);
    }
    that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
    })
  .catch((error) => {
    //console.log(error);
    var message = "There was an error! Please check your connection";
      Commons._showToast(error,ToastAndroid.LONG);
      that.setState({
        errorMsg:error,
        showLoader:false
      })
      
    });

      
    }
  }


///////CONFIRM SIGNUP
export const confirm_signup = (that) => {
  
    if((that.state.code1=='')||(that.state.code2=='')||(that.state.code3=='')||(that.state.code4=='')){
      that.setState({
        errorMsg:'Please enter CONFIRMATION CODE! Check your email for confirmation code',
      })
    }else if((that.state.email=='')){
      that.setState({
        errorMsg:'Please enter your email address',
      })
    }
    else{
      var confCode = that.state.code1+that.state.code2+that.state.code3+that.state.code4;
      if(confCode.length > 4){
        that.setState({
        errorMsg:'Invalid Confirmation code',
      })
      }else{
        let formData = new FormData();
        formData.append('email', that.state.email);
        formData.append('confirm_code', confCode);
        that.setState({
          showLoader:true
        }); 
      
    fetch (global.serverUrl+'api/confirm_user_signup',{
    method:'POST',
    headers: {
                'gnice-authenticate': 'gnice-web'
            },
    body: formData,
  })  .then((response)=>response.json())
  .then((res) =>{
    //console.log(JSON.stringify(res));
    if(res.status =="1"){
      //alert(JSON.stringify(res.msg));
      
      that.setState({
        errorMsg:'',
        showRegisterView:false,
        showFinishedView:true,
        showConfirmationView:false,
        password:'',
      })
    }else{
      //alert(JSON.stringify(res.msg));
      Commons._showToast(res.msg,ToastAndroid.LONG);

    }
    that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
    })
  .catch((error) => {
    //console.log(error);
    var message = "There was an error! Please check your connection";
      //alert(JSON.stringify(message));
      Commons._showToast(error,ToastAndroid.LONG);
      that.setState({
        errorMsg:error,
        showLoader:false
      })
      
    });

      }
    }
  }


///////CONFIRM PASSWORD RECOOVERY CODE
export const confirm_password_recovery_code = (that) => {
  if((that.state.code1=='')||(that.state.code2=='')||(that.state.code3=='')||(that.state.code4=='')){
    that.setState({
      errorMsg:'Please enter CONFIRMATION CODE! Check your email for confirmation code',
    })
  }
  else if((that.state.password=='')||(that.state.confirm_password=='')){
    that.setState({
      errorMsg:'Please enter both password field.',
    })
  }
  else{
    var confCode = that.state.code1+that.state.code2+that.state.code3+that.state.code4;
    if(confCode.length > 4){
      that.setState({
      errorMsg:'Invalid Confirmation code',
    })
    }else if(that.state.password!==that.state.confirm_password){
      that.setState({
      errorMsg:'Sorry! Passwords do not match',
    })
    }else{
      let formData = new FormData();
      formData.append('confirm_code', confCode);
      formData.append('password', that.state.password);
      formData.append('confirm_password', that.state.confirm_password);
      that.setState({
        showLoader:true
      }); 
    
  fetch (global.serverUrl+'api/confirm_password_recovery_code',{
  method:'POST',
  headers: {
              'gnice-authenticate': that.state.user_token,
          },
  body: formData,
}).then((response)=>response.json())
.then((res) =>{
  //alert(res);
  //console.log(JSON.stringify(res));
  if(res.status =="1"){
    //alert(JSON.stringify(res.msg));
    that.setState({
      errorMsg:'',
      showConfirmationCodeView:false,
      showFinishedView:true,
      
    })
  }else{
    //alert(JSON.stringify(res.msg));
    Commons._showToast(res.msg,ToastAndroid.LONG);
  }
  that.setState({
      errorMsg:res.msg,
      showLoader:false
    })
  })
.catch((error) => {
  //console.log(error);
  var message = "There was an error! Please check your connection";
    alert(JSON.stringify(message));
    that.setState({
      errorMsg:message,
      showLoader:false
    })
    
  });

    }
  }
}




export const change_pass = (that) =>{
  if((that.state.password=='')||(that.state.confirm_password=='')){
    that.setState({
        errorMsg:'Please enter new password!',
      });
  }
  else if(that.state.password!==that.state.confirm_password){
    that.setState({
        errorMsg:'Passwords Do Not Match!',
      });
  }
  else{   

    that.setState({
        errorMsg:'',
        showLoader:true
      })

  const formdata = new FormData();
  formdata.append('password', that.state.password);
  formdata.append('confirm_password', that.state.confirm_password);
  fetch (global.serverUrl+'api/change_password',{
    method:'POST',
    headers: {
      'gnice-authenticate': that.state.userToken,
    },
    body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);return;
    //alert(res.msg);
    //console.log(res);
    if(res.status =="1"){
      that.setState({
        errorMsg:res.msg,
        showLoader:false,
        password:'',
        confirm_password:'',
      })
    }
    else if(res.status=='-1'){
      //alert("You are not logged in.");
      Commons._showToast("You are not logged in.",ToastAndroid.LONG);
      that.props.navigation.push('UserLogin',null);
    }
    else{
      that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
      //alert(res.message);
    }
  

    })
  .catch((error) => {
    var message = "There was an error! Please check your connection";
      alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
        showLoader:false
      })
      //console.error(error);
    });
}
  
}

export const send_recovery_code = (that) =>{

  that.setState({
        errorMsg:'',
        showLoader:true
      })

  if((that.state.email=='')){
    that.setState({
        errorMsg:'Please enter email address!',
        showLoader:false
      })
  }else{   

  const formdata = new FormData();
  
  formdata.append('email', that.state.email);

  fetch (global.serverUrl+'api/password_recovery',{
    method:'POST',
    headers: {
      'gnice-authenticate': 'gnice-web'
    },
    body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));
    //console.log(res);
    if(res.status =="1"){

      AsyncStorage.setItem('user-token',res.token);
      that.setState({
        showEmailView:false,
        showConfirmationCodeView:true,
        user_token:res.token,
        errorMsg:'',
        showLoader:false,
        
      })
    }else{
      that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
      //alert(res.message);
    }
  

    })
  .catch((error) => {
    var message = "There was an error! Please check your connection";
      alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
        showLoader:false
      })
      //console.error(error);
    });
}
  
}


// export const submit_password = (that) =>{

//   that.setState({
//         errorMsg:'',
//         showLoader:true
//       })

//   if((that.state.email=='')){
//     that.setState({
//         errorMsg:'Email address not found!',
//         showLoader:false
//       })
//   }else if(that.state.confirm_id ==''){
//     that.setState({
//         errorMsg:'Please enter the confirmation code sent to your email address!',
//         showLoader:false
//       })
//   }else if(that.state.new_password ==''){
//     that.setState({
//         errorMsg:'Please enter new password!',
//         showLoader:false
//       })
//   }else if(that.state.new_password !== that.state.confirm_new_password){
//     that.setState({
//         errorMsg:'Passwords do not match!',
//         showLoader:false
//       })
//   }else{   

//   const formdata = new FormData();
  
//   formdata.append('email', that.state.email);
//   formdata.append('user_recover_id', that.state.confirm_id);
//   formdata.append('password', that.state.new_password);
//   formdata.append('confirm_password', that.state.confirm_new_password);

//   fetch (global.serverUrl+'api/forgot_password_confirm',{
//     method:'POST',
//     headers: {
//     'Content-Type': 'multipart/form-data',
//     },
//     body: formdata
    
//   })
//   .then((response)=>response.json())
//   .then((res) =>{
//     alert(res.msg);
//     //console.log(res);
//     if(res.status =="1"){
//       that.setState({
//         errorMsg:res.msg,
//         showLoader:false,
//         email:'',
//         confirm_id:'',
//         new_password:'',
//         confirm_new_password:'',
//       })
//       //that.props.navigation.push('UserScreen');
//     }else{
//       that.setState({
//         errorMsg:res.msg,
//         showLoader:false
//       })
//       //alert(res.message);
//     }
  

//     })
//   .catch((error) => {
//     var message = "There was an error! Please check your connection";
//       alert(JSON.stringify(message));
//       that.setState({
//         errorMsg:message,
//         showLoader:false
//       })
//       //console.error(error);
//     });
// }
  
// }

export const fetch_all_products = (that) =>{
  
    fetch (global.serverUrl+'api/fetch_all_product',{
      method:'GET',
      headers: {
        'gnice-authenticate': 'gnice-web'
              },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
    console.log(res);
      //alert(JSON.stringify(res));
      //return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
        products: JSON.parse(JSON.stringify(res.data)),
      })
      return;
  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }

  
  export const fetch_all_user_messages = (that) =>{
    that.setState({
      showLoader:true
    })
    fetch (global.serverUrl+'api/fetch_all_messages_to_seller?seller_id='+that.state.userData.seller_id,{
      method:'GET',
      headers: {
        'gnice-authenticate': that.state.userToken,
      },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
      //alert(JSON.stringify(res.data));
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
        messages: JSON.parse(JSON.stringify(res.data)),
      })

  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }


  export const fetch_all_user_saved_products = (that) =>{
    fetch (global.serverUrl+'api/fetch_all_user_saved_products',{
      method:'GET',
      headers: {
        'gnice-authenticate': that.state.userToken,
      },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
    
      //alert(JSON.stringify(res));
      //return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
        saved_products: JSON.parse(JSON.stringify(res.data)),
      })

  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }



  export const save_products = (that) =>{

    that.setState({
      save_showLoader:true,
    })

    let formData = new FormData();
    formData.append('product_id', that.props.route.params.paramsdata.id);
    formData.append('user_id', that.state.userData.id);

    fetch (global.serverUrl+'api/pin_product',{
      method:'POST',
      headers: {
        'gnice-authenticate': that.state.userToken,
      },
      body: formData,
    })
    .then((response)=>response.json())
    .then((res) =>{
      // alert(JSON.stringify(res));
      // return;
      that.setState({
        save_showLoader:false,
        save_button:false,
      })
    Commons._showToast(res.message,ToastAndroid.LONG);
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }

  //////////FETCH ALL PRODUCTS FROM A SUB CATEGORY
  export const fetch_all_product_from_sub_category = (that) =>{
    let paramsValue = JSON.parse(that.props.route.params.paramsdata);
    //alert(JSON.stringify(paramsValue));
    fetch (global.serverUrl+'api/fetch_all_product_sub_category?id='+paramsValue.sub_id,{
      method:'GET',
      headers: {
                  'gnice-authenticate': 'gnice-web'
              },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
    
      //alert(JSON.stringify(res));
      //return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
        products: JSON.parse(JSON.stringify(res.data)),
      })

  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }
  

  //////////SEARCH
  export const search = (that) =>{
    //let paramsValue = that.props.route.params.paramsdata;
    if(that.state.searchQuery==''){
      alert("Please enter a key word!");
      return;
    }else{
      that.setState({
        showLoader:true
      })
    
    fetch (global.serverUrl+'api/fetch_product_by_term?query='+that.state.searchQuery+'&sub_category='+that.state.subCategorySelected,{
      method:'GET',
      headers: {
                  'gnice-authenticate': 'gnice-web'
              },
      
    })
    .then((response)=>response.json())
    .then((res) =>{
      //alert(JSON.stringify(that.state.subCategorySelected));
      //if(res.status =="1"){
        that.setState({
          showLoader:false,
        })
        that.props.navigation.navigate('SearchResults',{paramsdata:JSON.stringify(res.data),searchQuery:that.state.searchQuery});
      //}
    
      })
    .catch((error) => {
        that.setState({
          showLoader:false
        })
        console.error(error);
      });
  
  }
}

  //////////FETCH RELATED PRODUCTS
  export const fetch_related_products = (that) =>{
    //let paramsValue = that.props.route.params.paramsdata;
    
    fetch (global.serverUrl+'api/fetch_related_products?sub_cat_id='+that.props.route.params.paramsdata.sub_category+'&brand='+that.props.route.params.paramsdata.brand+'&product_code='+that.props.route.params.paramsdata.product_code,{
      method:'GET',
      headers: {
                  'gnice-authenticate': 'gnice-web'
              },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
    
      //alert(JSON.stringify(res));
      //return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
      relatedProducts: JSON.parse(JSON.stringify(res.data)),
      })

  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }


   //////////FETCH SELLER PRODUCTS
   export const fetch_seller_products = (that) =>{
    //let paramsValue = that.props.route.params.paramsdata;
    
    fetch (global.serverUrl+'api/fetch_all_product_of_seller?seller_id='+that.props.route.params.paramsdata.seller_id,{
      method:'GET',
      headers: {
                  'gnice-authenticate': 'gnice-web'
              },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
      console.log(res);
      //alert(JSON.stringify(res));
      //return;
      that.setState({
        showLoader:false
      })
  
    that.setState({
      seller_products: JSON.parse(JSON.stringify(res.data)),
      })

      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }


    //////////FETCH USER PRODUCTS
    export const fetch_all_user_products = (that) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      if(that.state.userToken){
      fetch (global.serverUrl+'api/fetch_all_product_of_seller?seller_id='+that.state.userData.seller_id,{
        method:'GET',
        headers: {
          'gnice-authenticate': that.state.userToken,
      },
      })
      .then((response)=>response.json())
      .then((res) =>{
        //alert(JSON.stringify(res));
        //return;
        that.setState({
          showLoader:false,
          products: JSON.parse(JSON.stringify(res.data)),
          products_count: res.data.length,
        })
        get_user_account_package_usage_breakdown(that);
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
       
          //console.error(error);
        });
      }
    }

    //////////DELETE ITEM
    export const delete_item = (that,i) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      //alert(that.state.userData.seller_id);return;
      
      fetch (global.serverUrl+'api/deleteProduct?product_id='+that.state.item_to_delete.id+'&seller_id='+that.state.userData.seller_id,{
        method:'GET',
        headers: {
          'gnice-authenticate': that.state.userToken,
      },
      })
      .then((response)=>response.json())
      .then((res) =>{
        
        if(res.status=='1'){
          var array = [...that.state.products]; // make a separate copy of the array
          if (i!== -1) {
          array.splice(i,1);
          that.setState({products: array});
          }  
          Commons._showToast(res.message,ToastAndroid.LONG);
        }
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
       
          //console.error(error);
        });
      
    }

    //////////FETCH USER PRODUCTS
    export const fetch_all_messages_to_user = (that) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      //alert(that.state.userData.seller_id);
      if(that.state.userToken){
      fetch (global.serverUrl+'api/fetch_all_messages_to_seller?seller_id='+that.state.userData.seller_id,{
        method:'GET',
        headers: {
          'gnice-authenticate': that.state.userToken,
      },
      })
      .then((response)=>response.json())
      .then((res) =>{
        //alert(JSON.stringify(res));
        //return;
        that.setState({
          showLoader:false,
          messages: JSON.parse(JSON.stringify(res.data)),
          messages_count: res.data.length,
        })
        
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
       
          //console.error(error);
        });
      }
    }

    const get_user_account_package_usage_breakdown = (that) =>{
      var user_remaining_product_slot =
      that.state.userData.seller_account_details.product_count * 1 -
      that.state.products_count * 1;
      //alert($scope.user_remaining_product_slot);
      var date1 = new Date(that.state.userData.account_type_activation_date);
      var date2 = new Date();
      var Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      var slot_remaining_duration = that.state.userData.seller_account_details.duration_in_days * 1 - Difference_In_Days;
      //alert(Difference_In_Days);
      //$scope.$apply();
      that.setState({
        slot_remaining_duration:slot_remaining_duration,
        user_remaining_product_slot: user_remaining_product_slot,
      })
    }
     //////////FETCH RELATED PRODUCTS
     export const fetch_report_reasons = (that) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      
      fetch (global.serverUrl+'api/fetch_report_reasons',{
        method:'GET',
        headers: {
                    'gnice-authenticate': 'gnice-web'
                },
      
      })
      .then((response)=>response.json())
      .then((res) =>{
        // return;
        that.setState({
          showLoader:false
        })
    if(res.status =="1"){

      that.setState({
        report_reasons: res.data,
        //car_makes: JSON.parse(JSON.stringify(res.car_makes)),
        })
        
        //alert(JSON.stringify(that.state.required_tables));
  
    }else{
    }
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
       
          //console.error(error);
        });
    }



    /////////////REPORT ABUSE
export const reportAbuse = (that) =>{
  //alert(that.state.userToken);return;
  that.setState({
        showLoader:true
      })
    let formData = new FormData();
    formData.append('product_id', that.props.route.params.paramsdata.id);
    formData.append('user_id',that.state.userData.id)
    formData.append('report_title',that.state.reportReasonSelected)
    formData.append('report_content',that.state.abuseContent)
  fetch (global.serverUrl+'api/report_abuse',{
    method:'POST',
    headers: {
                'gnice-authenticate': that.state.userToken
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));
    console.log(res.message);
    that.setState({
      alertMsg:res.message,
      showLoader:false
    })

    if(res.status =="1"){
      that.setState({
        abuseContent:'',
        reportReasonDropDownValue:'0',
      })
    }
  
    })
  .catch((error) => {
      that.setState({
        showLoader:false
      })
      console.error(error);
    });

  
}


    //////////FETCH RELATED PRODUCTS
    export const fetch_required_table = (that) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      
      fetch (global.serverUrl+'api/fetch_required_table',{
        method:'GET',
        headers: {
                    'gnice-authenticate': 'gnice-web'
                },
      
      })
      .then((response)=>response.json())
      .then((res) =>{
      
        //alert(res);
        // return;
        that.setState({
          showLoader:false
        })
    if(res.status =="1"){
      //alert(JSON.stringify(res.data))
      that.setState({
        required_tables: res.data,
        //car_makes: JSON.parse(JSON.stringify(res.car_makes)),
        })
        
        //alert(JSON.stringify(that.state.required_tables));
  
    }else{
    }
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
       
          //console.error(error);
        });
    }



    //////////FETCH RELATED PRODUCTS
    export const get_account_packages = (that) =>{
      fetch (global.serverUrl+'api/get_account_packages',{
        method:'GET',
        headers: {
                    'gnice-authenticate': 'gnice-web'
                },
      
      })
      .then((response)=>response.json())
      .then((res) =>{
        that.setState({
          showLoader2:false
        })
      if(res.status =="1"){
      console.log(res.data);
        that.setState({
        packages: res.data,
        })
  
    }else{
    }
        })
      .catch((error) => {
          console.error(error);
        var message = "There was an error! Please check your connection";
          alert(JSON.stringify(message));
        });
    }

  
  export const fetch_all_categories_and_sub_categories = (that) =>{
    fetch (global.serverUrl+'api/fetch_all_categories_and_sub_categories',{
      method:'GET',
      headers: {
                  'gnice-authenticate': 'gnice-web'
              },
    
    })
    .then((response)=>response.json())
    .then((res) =>{
    
      //alert(JSON.stringify(res.data[1].subcategory[0].counted_sub_category_products.counted));
      //return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
      categories_and_sub: JSON.parse(JSON.stringify(res.data)),
      })
      //alert(JSON.stringify(that.state.categories_and_sub));

  }else{
  }
      })
    .catch((error) => {
        console.error(error);
      var message = "There was an error! Please check your connection";
        alert(JSON.stringify(message));
     
        //console.error(error);
      });
  }

export const login = (that) =>{
  
  that.setState({
        errorMsg:'',
        showLoader:true
      })
  if((that.state.username=='')||(that.state.password=='')){
    that.setState({
        errorMsg:'Email or password cannot be empty!',
        showLoader:false
      })
  }else{
    
    let formData = new FormData();
    formData.append('username', that.state.username);
    formData.append('password', that.state.password);
    //alert(global.serverUrl);return;
    //console.log(formData);return;
  fetch (global.serverUrl+'api/user_login',{
    method:'POST',
    headers: {
                'gnice-authenticate': 'gnice-web'
            },
    body: formData,
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));return
    //alert(JSON.stringify(res.token));
    //console.log(res);
    if(res.status =="1"){
      //alert('here is the problem333');return;
      //alert(res.token);return;
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      AsyncStorage.setItem('user-token',res.token);
      //alert(JSON.stringify(that.props.route.params));return;
      if((res.data.seller=='1')&&(res.data.account_type=='0')){
      that.props.navigation.navigate('SellerAccountTypeScreen_preview');
      }else if(that.props.route.params.paramsdata){
      that.props.navigation.navigate(that.props.route.params.paramsdata.revertTo,{paramsdata:that.props.route.params.paramsdata}); 
      }
      else{
      that.props.navigation.navigate('UserArea',{paramsdata:null});
      }
      that.setState({
        errorMsg:'',
        showLoader:false,
        username:'',
        password:'',
      })
    }else{
      that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
      //alert(res.message);
    }
  

    })
  .catch((error) => {
    var message = "There was an error! Please check your connection";
      //alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
        showLoader:false
      })
      //console.error(error);
    });
}
  
}
/////////////UPDATE USER ACCOUNT TYPE
export const update_user_account_type = (that) =>{
  //alert(that.state.token);return;
  // if(that.state.account_type!='new'){
  //   that.setState({email_to_activate:that.state.userData.email}) 
  // }

  that.setState({
        showLoader:true
      })
  if((that.state.selected_account_type=='')){
    alert('Please select an accout type!');
    that.setState({
        showLoader:false
      })
      return;
  }else{
    //alert(that.state.selected_account_type);return;
    let formData = new FormData();
    formData.append('selectedOption', that.state.selected_account_type);
    formData.append('email_to_be_activated',that.state.email_to_activated)
  fetch (global.serverUrl+'api/update_user_account_type',{
    method:'POST',
    headers: {
                'gnice-authenticate': that.state.token
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    
    console.log(res);
    if(res.status =="1"){
      alert(JSON.stringify(res.data));
      AsyncStorage.removeItem('user-data');
      AsyncStorage.removeItem('selected_account_type');
      AsyncStorage.removeItem('email_to_activated');
      AsyncStorage.removeItem('token');
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.props.navigation.navigate('TransactionStatus',{paramsdata:JSON.stringify(res.data),transRef:that.state.transRef,transStatus:'success'});
    }else{
      that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
      //alert(res.message);
    }
  

    })
  .catch((error) => {
      that.setState({
        showLoader:false
      })
      console.error(error);
    });
}
  
}


/////////////ADD PRODUCTS
export const addProducts = (that) =>{
  //alert(that.state.userToken);return;
  if(that.state.categorySelected=='0'){
    Commons._showToast('Please select Category!',ToastAndroid.LONG);
  }
  if(that.state.subCategorySelected=='0'){
    Commons._showToast('Please select Sub Category!',ToastAndroid.LONG);
  }
  else if((that.state.uploadImageCount==0)){
    Commons._showToast('Please select an Image!',ToastAndroid.LONG);
  }
  else if(!that.state.advert_title){
    Commons._showToast("Please Enter Title!",ToastAndroid.LONG);
  }
  else if(!that.state.land_mark){
    Commons._showToast("Please Enter a Landmark!",ToastAndroid.LONG);
  }
  else if(!that.state.price){
    Commons._showToast("Please Enter Ads Price!",ToastAndroid.LONG);
  }
  else{
    that.setState({
      showLoader:true
    })

    if(that.state.negotiable_price){
      var negotiable = '1';
    }else{
      var negotiable='0';
    }
    var pegedSize = 5;  
    that.state.resourcePath.map((item, i) => {
    const imageSize = Logic.calculate_megabyte_from_byte(item.fileSize); 
    var Size = imageSize*1;
    if(Size<pegedSize){
    that.formData.append('files['+i+']', {
      uri: item.uri,
      type: 'image/jpeg',
      name: item.fileName,
      //data: item.data,
    })
    }else{
      Commons._showToast(item.fileName+'exceeds the maximum limit of '+pegedSize+'mb. Please try again!');
      return;
    }
  });
    
    that.formData.append('category', that.state.categorySelected);
    that.formData.append('sub_category',that.state.subCategorySelected);

    Logic.update_new_product_subcategory_view(that.state.subCategorySelected,that);
    
    that.formData.append('state',that.state.stateSelected);
    that.formData.append('lga',that.state.lgaSelected);
    that.formData.append('condition_state',that.state.conditionSelected);
    that.formData.append('name',that.state.advert_title);
    that.formData.append('price',that.state.price);
    that.formData.append('land_mark',that.state.land_mark);
    that.formData.append('negotiable',negotiable);
    that.formData.append('description',that.state.userData.advert_details);
    that.formData.append('seller_id',that.state.userData.seller_id);

    console.log(that.formData);
    fetch (global.serverUrl+'api/add_product',{
    method:'POST',
    headers: {'Accept': 'application/x-www-form-urlencoded','gnice-authenticate': that.state.userToken,'Content-Type': 'multipart/form-data'},
    body: that.formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));
    //return;
    if(res.status =="1"){
      Commons._showToast("Advert created successfully!",ToastAndroid.LONG);
       setTimeout(()=>{ 
          that.props.navigation.navigate('MyProducts',{paramsdata:null});
        }, 500);
      
    }else{
      that.setState({
        errorMsg:res.message,
        showLoader:false
      })
      //alert(res.message);
    }
  

  })
  .catch((error) => {
      that.setState({
        showLoader:false
      })
      console.error(error);
    });
}
  
}


//////////////////VERIFY TRANSACTION
export const verify_transaction = (that) =>{
  //alert(that.state.userToken);return;
  
  that.setState({
        showLoader:true
      })
  //alert(JSON.stringify(that.state.selectedOption));return;    
  if(that.state.transRef){
    fetch (global.serverUrl+'api/verify_transaction?reference='+that.state.transRef,{
      method:'GET',    
    })
    .then((response)=>response.json())
    .then((res) =>{
      //alert(JSON.stringify(res));
      //console.log(res.data);
      if(res.data.status=='success'){
      //if(res.status =="1"){
        //if(res.data.status==true){
          update_user_account_type(that);
        //   AsyncStorage.setItem('selected_account_type',that.state.selectedOption.toString());
        //   AsyncStorage.setItem('email_to_activated',that.state.userData.email);
        //   AsyncStorage.setItem('token',that.state.userToken);  
        // that.setState({
        //   authorization_data:JSON.parse(JSON.stringify(res.data.data)),
        //   showLoader:false
        // })
        //that.props.navigation.navigate('TransactionSTatus',{paramsdata:that.state});
        //}
  
      }else{
        that.setState({
          errorMsg:res.data.status,
          showLoader:false
        })
        AsyncStorage.removeItem('user-data');
        AsyncStorage.removeItem('selected_account_type');
        AsyncStorage.removeItem('email_to_activated');
        AsyncStorage.removeItem('token');
        that.props.navigation.navigate('TransactionStatus',{paramsdata:null,transRef:that.state.transRef,transStatus:res.data.status});
        Commons._showToast(res.data.status,ToastAndroid.LONG);
      }
      })
    .catch((error) => {
        that.setState({
          showLoader:false
        })
        alert(error);
        console.error(error);
      });
  }
  
}

export const message_product_seller =(that)=>{
 
if((that.state.visitor_email=='')||(that.state.visitor_phone=='')||(that.state.visitor_name=='')||(that.state.visitor_message=='')){
  alert('All Fields are required');
  return;
}else{
  that.setState({
    showLoader:true
  })  
//alert(that.state.email_to_activated);
let formData = new FormData();
formData.append('sender_email', that.state.visitor_email);
formData.append('sender_phone', that.state.visitor_phone);
formData.append('sender_name', that.state.visitor_name);
formData.append('message', that.state.visitor_message);
formData.append('seller_id', that.props.route.params.paramsdata.seller_id);
formData.append('product_code', that.props.route.params.paramsdata.product_code);
fetch (global.serverUrl+'api/message_product_seller',{
method:'POST',
headers: {
            'gnice-authenticate': that.state.userToken
        },
body: formData,

})
.then((response)=>response.json())
.then((res) =>{
//alert(JSON.stringify(res));
//console.log(res);return;
that.setState({
  showLoader:false
})
if(res.status =="1"){
  that.setState({
    errorMsg:res.message,
    modalVisible:false,
  })
  Commons._showToast(res.message,ToastAndroid.LONG);
}else{
  that.setState({
    errorMsg:res.message,
  })
}

})
.catch((error) => {
  that.setState({
    showLoader:false
  })
  alert(error);
  console.error(error);
});
}

}
/////////////UPDATE USER ACCOUNT TYPE
export const generate_paystack_checkout = (that) =>{
  //alert(that.state.userToken);return;
  
  that.setState({
        showLoader:true
      })
  //alert(JSON.stringify(that.state.selectedOption));return;    
  if((that.state.selected_account_type=='')){
    alert('Please select an accout type!');
    that.setState({
        showLoader:false
      })
      return;
  }else{
    //alert(that.state.email_to_activated);
    let formData = new FormData();
    formData.append('email', that.state.email_to_activated);
    formData.append('amount', that.state.selectedValue+'00');
    formData.append('selected_account_type', that.state.selected_account_type);
    
  fetch (global.serverUrl+'api/generate_paystack_checkout',{
    method:'POST',
    headers: {
                'gnice-authenticate': that.state.userToken
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));return;
    //console.log(res);return;
    if(res.status =="1"){
      if(res.data.status==true){
        AsyncStorage.setItem('selected_account_type',that.state.selected_account_type);
        AsyncStorage.setItem('email_to_activated',that.state.email_to_activated);
        AsyncStorage.setItem('token',that.state.userToken);  
      that.setState({
        authorization_data:JSON.parse(JSON.stringify(res.data.data)),
        showLoader:false
      })
      that.props.navigation.navigate('CardPaymentUi',{paramsdata:that.state});
      }

    }else{
      that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
      //alert(res.msg);
    }
    })
  .catch((error) => {
      that.setState({
        showLoader:false
      })
      alert(error);
      console.error(error);
    });
}
  
}

export const updateProfileImage = (that) => { 
  const formData = new FormData();
  if(that.state.uploadImageCount>0){
  var pegedSize = 4;  
  const imageSize = Logic.calculate_megabyte_from_byte(that.state.resourcePath.fileSize); 
  var Size = imageSize*1;
  if(Size<pegedSize){
    that.setState({
        showLoader:true
      });
    formData.append('files[0]', {
      uri: that.state.resourcePath.uri,
      type: 'image/jpeg',
      name: that.state.resourcePath.fileName,
      //data: that.state.resourcePath.data,
    })

  }else{    
  that.setState({showLoader:false,errorMsg:'Sorry, Image Size greater than '+pegSize+'MB'})
  return;
  }
  //console.log(that.state.resourcePath.fileName);  
  fetch (global.serverUrl+'api/upload_image',{
  method:'POST',
  headers: {'Accept': 'application/x-www-form-urlencoded','gnice-authenticate': that.state.userToken,'Content-Type': 'multipart/form-data'},
  body: formData 
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);return;
    console.log(res);
    if(res.data.status =="1"){
      Commons._showToast("Profile image updated successfully", ToastAndroid.LONG);
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.setState({
        userData:res.data,
        showLoader:false,
        uploadImageCount:0
      })
      //that.props.navigation.push('UserScreen',{default_screen:"Profile"});

    }else{
      alert(JSON.stringify(res.msg));
    }
    that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
    })
  .catch((error) => {
    var message = error;
    //console.log(error);
      alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
        showLoader:false
      })
      
    });

    }

  }

export const updateProfile = (that) => { 

    if((that.state.fullname=='')){
    that.setState({
        errorMsg:'Please enter full name!',
      })
    }else if((that.state.Phone=='')){
      that.setState({
        errorMsg:'Please enter phone number!',
      })
    }else{
      that.setState({
        showLoader:true
      });
  const formdata = new FormData();
  formdata.append('fullname', that.state.fullname);
  formdata.append('phone',that.state.phone);
  formdata.append('whatsapp',that.state.whatsapp);
  
  fetch (global.serverUrl+'api/update_user_profile',{
  method:'POST',
  headers: {
    'gnice-authenticate': that.state.userToken
},
  body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);
    if(res.status =="1"){
      //alert(JSON.stringify(res.data));
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.setState({
        userData:JSON.parse(JSON.stringify(res.data)),
        errorMsg:res.msg,
        showLoader:false
      })
    }else{
      alert(JSON.stringify(res.msg));
    }
    that.setState({
        errorMsg:res.msg,
        showLoader:false
      })
    })
  .catch((error) => {
    var message = "There was an error! Please check your connection";
    //console.log(error);
      alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
        showLoader:false
      })
      
    });




    }

  }



  export const chooseMultipleImage = (that) => {  
    ImagePicker.launchImageLibrary(
      {
        noData: true,  
        mediaType: 'photo',
        storageOptions: {
            cameraRoll: true,
            waitUntilSaved: true,
            privateDirectory: true,
            path:'images',
            skipBackup: true
        },
        includeBase64: false,
        quality: 1,
        selectionLimit:1
        
      },
      (response) => {
        console.log(response);
        if(!response['didCancel']){
        let responseValue = JSON.parse(JSON.stringify(response['assets']));
        that.state.uploadImageCount++;
        //that.setState({resourcePath: responseValue[0]});
        that.setState({ resourcePath: [...that.state.resourcePath, responseValue[0]] }) //another array
        }
        

      },
    )
}


