import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../components/global';
import * as Logic from './Logic';

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
    if(that.state.sellerAccount){ 
      formData.append('seller','1');  
    }  

    that.setState({
        showLoader:true
      });  
    fetch (global.serverUrl+'api/user_signup',{
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
      alert(JSON.stringify(res.msg));
    }
    that.setState({
        errorMsg:'',
        showLoader:false
      })
    })
  .catch((error) => {
    console.error(error);
    var message = "There was an error! Please check your connection";
      alert(JSON.stringify(message));
      that.setState({
        errorMsg:message,
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
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    body: JSON.stringify({
      resend_to_email: that.state.Email,
    }),
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //console.log(JSON.stringify(res));
    if(res.status =="1"){
      alert(res.msg);
      that.setState({
        showConfirmationView:true,showConfirmationCodeBox:true,showConfirmationViewEmailAddress:true,Email:that.state.Email,errorMsg:''
      })
    }else{
      alert(res.msg);
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
        password:'',
        showConfirmationView:false
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
              'Accept': 'application/json',
              'Content-Type': 'application/json',
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
    alert(JSON.stringify(res.msg));
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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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
      alert("You are not logged in.");
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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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


  export const fetch_all_user_saved_products = (that) =>{
    fetch (global.serverUrl+'api/fetch_all_user_saved_products',{
      method:'GET',
      headers: {
        'Accept': 'application/json',
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

    let formData = new FormData();
    formData.append('product_id', that.props.route.params.paramsdata.id);
    formData.append('user_id', that.state.userData.id);

    fetch (global.serverUrl+'api/pin_product',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'gnice-authenticate': that.state.userToken,
      },
      body: formData,
    })
    .then((response)=>response.json())
    .then((res) =>{
      // alert(JSON.stringify(res));
      // return;
      that.setState({
        showLoader:false
      })
  if(res.status =="1"){
    that.setState({
        save_button:false,
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



    //////////FETCH USER PRODUCTS
    export const fetch_all_user_products = (that) =>{
      //let paramsValue = that.props.route.params.paramsdata;
      fetch (global.serverUrl+'api/fetch_all_product_of_seller?seller_id='+that.state.userData.seller_id,{
        method:'GET',
        headers: {
          'Accept': 'application/json',
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
      //alert(JSON.stringify(that.state.categories_and_sub.category));

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

  fetch (global.serverUrl+'api/user_login',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'gnice-authenticate': 'gnice-web'
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);
    //alert(JSON.stringify(res.token));
    //console.log(res);
    if(res.status =="1"){
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      AsyncStorage.setItem('user-token',res.token);
      //alert(res.data.account_type);return;
      if((res.data.seller=='1')&&(res.data.account_type=='0')){
      that.props.navigation.navigate('SellerAccountTypeScreen_preview');
      }else if(that.props.route.params.paramsdata.revertTo){
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
  that.setState({
        showLoader:true
      })
  if((that.state.selected_account_type=='')){
    alert('Please select an accout type!');
    that.setState({
        showLoader:false
      })
  }else{
    let formData = new FormData();
    formData.append('selectedOption', that.state.selected_account_type);
    formData.append('email_to_be_activated',that.state.email_to_activated)
  fetch (global.serverUrl+'api/update_user_account_type',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'gnice-authenticate': that.state.token
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));
    //console.log(res);
    if(res.status =="1"){
      AsyncStorage.removeItem('user-data');
      AsyncStorage.removeItem('selected_account_type');
      AsyncStorage.removeItem('email_to_activated');
      AsyncStorage.removeItem('token');
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.props.navigation.navigate('UserArea',{paramsdata:null});
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
  
  if((that.state.uploadImageCount==0)){
    alert('Please select an Image!');
  }else if(!that.state.categorySelected){
    alert('Please select Category!');
  }
  // else if(!that.state.subCategorySelected){
  //   alert('Please select Sub Category!');
  // }
  else{
    if(that.state.negotiable_price){
      var negotiable = '1';
    }else{
      var negotiable='0';
    }
    that.state.resourcePath.map((item, i) => (
    that.formData.append('files['+i+']', {
      uri: item.uri,
      type: 'image/jpeg/jpg',
      name: item.fileName,
      data: item.data,
    })
    ));
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
    that.formData.append('seller_id',that.state.userData.seller_id);
    fetch (global.serverUrl+'api/add_product',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'gnice-authenticate': that.state.userToken,
            },
    body: that.formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    console.log(res);
    if(res.status =="1"){
      that.props.navigation.navigate('MyProducts',{paramsdata:null});
      alert("Advert created successfully!");
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


/////////////UPDATE USER ACCOUNT TYPE
export const generate_paystack_checkout = (that) =>{
  //alert(that.state.userToken);return;
  
  that.setState({
        showLoader:true
      })
  if((that.state.selectedOption==='')){
    alert('Please select an accout type!');
    that.setState({
        showLoader:false
      })
  }else{
    //alert(that.state.userData.email);
    let formData = new FormData();
    formData.append('email', that.state.userData.email);
    formData.append('amount', that.state.selectedValue);
    formData.append('selected_account_type', that.state.selectedOption);
    
  fetch (global.serverUrl+'api/generate_paystack_checkout',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'gnice-authenticate': that.state.userToken
            },
    body: formData,
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(JSON.stringify(res));return;
    //console.log(res);
    if(res.status =="1"){
      if(res.data.status==true){
        AsyncStorage.setItem('selected_account_type',that.state.selectedOption.toString());
        AsyncStorage.setItem('email_to_activated',that.state.userData.email);
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
      alert(res.msg);
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
  var pegedSize = 2;  
  const imageSize = Logic.calculate_megabyte_from_byte(that.state.resourcePath.fileSize); 
  var Size = imageSize*1;
  if(Size<pegedSize){
    that.setState({
        showLoader:true
      });
    formData.append('files[0]', {
      uri: that.state.resourcePath.uri,
      type: 'image/jpeg/jpg',
      name: that.state.resourcePath.fileName,
      data: that.state.resourcePath.data,
    })

  }else{    
  that.setState({showLoader:false,errorMsg:'Sorry, Image Size greater than '+pegSize+'MB'})
  return;
  }
  
    
  fetch (global.serverUrl+'api/upload_image',{
  method:'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'gnice-authenticate': that.state.userToken
  },
  body: formData 
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);return;
    //console.log(res);
    if(res.status =="1"){
      alert("Profile image updated successfully");
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
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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



