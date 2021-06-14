import React from 'react';
import { AsyncStorage, View, Text, ScrollView} from 'react-native';
import '../components/global';
//import * as Logic from './Logic';

  //////SIGNUP METHOD
  export const signup = (that) => {

    if((that.state.FName=='')||(that.state.LName=='')||(that.state.Email=='')||(that.state.Phone=='')||(that.state.Pass=='')){
    that.setState({
        errorMsg:'Please enter all fields!',
      })
    var email = that.state.Email;
    var split_email = email.split(".").pop
    }else if(that.state.Pass!=that.state.ConfPass){
      that.setState({
        errorMsg:'Passwords do not match!',
      })
    }else if((that.state.latitude =='')||(that.state.longitude =='')){
      that.setState({
        errorMsg:'Please enable location permission on this app in your settings.',
      })
    }else{ 
    that.setState({
        showLoader:true
      });  
    fetch (global.serverUrl+'api/user_signup_from_react_native',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    body: JSON.stringify({
      FName:that.state.FName,
      LName:that.state.LName,
      Email: that.state.Email,
      Phone: that.state.Phone,
      Pass: that.state.Pass,
      ConfPass: that.state.ConfPass,
      signup_latitude:that.state.latitude,
      signup_longitude:that.state.longitude,
    }),
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //console.log(JSON.stringify(res));
    if(res.status =="1"){
      alert(JSON.stringify(res.msg));
      that.setState({
        showConfirmationView:true,
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
    //console.error(error);
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
    if((that.state.confirmationCode=='')){
      that.setState({
        errorMsg:'Please enter CONFIRMATION CODE! Check your email for confirmation code',
      })
    }else if((that.state.Email=='')){
      that.setState({
        errorMsg:'Please enter your email address',
      })
    }
    else{
      var confCode = that.state.confirmationCode;
      if(confCode.length > 5){
        that.setState({
        errorMsg:'Invalid Confirmation code',
      })
      }else{

        that.setState({
        showLoader:true
      }); 

    fetch (global.serverUrl+'api/user_confirm_signup_from_react_native',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    body: JSON.stringify({
      confirm_email: that.state.Email,
      confirm_code: that.state.confirmationCode,
    }),
    
  })  .then((response)=>response.json())
  .then((res) =>{
    //console.log(JSON.stringify(res));
    if(res.status =="1"){
      alert(JSON.stringify(res.msg));
      that.setState({
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

  //do_login = () => {
  if((that.state.email=='')){
    alert("You are not logged in"); 
    that.setState({
        errorMsg:'You are not logged in!',
      });
    that.props.navigation.push('Login'); 
  }
  else if((that.state.new_password=='')||(that.state.confirm_new_password=='')){
    that.setState({
        errorMsg:'Please enter new password!',
      });
  }
  else if(that.state.new_password!==that.state.confirm_new_password){
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
  formdata.append('old_password', that.state.old_password);
  formdata.append('new_password', that.state.new_password);
  formdata.append('confirm_password', that.state.confirm_new_password);
  formdata.append('user_token', that.state.user_token);

  fetch (global.serverUrl+'api/change_password',{
    method:'POST',
    headers: {
    'Content-Type': 'multipart/form-data',
    },
    body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);
    alert(res.msg);
    //console.log(res);
    if(res.status =="1"){
      that.setState({
        errorMsg:res.msg,
        showLoader:false,
        new_password:'',
        old_password:'',
        confirm_new_password:'',
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

export const recover_pass = (that) =>{

  //do_login = () => {
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

  fetch (global.serverUrl+'api/forgot_password',{
    method:'POST',
    headers: {
    'Content-Type': 'multipart/form-data',
    },
    body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    alert(res.msg);
    //console.log(res);
    if(res.status =="1"){
      
      that.setState({
        showConfirmationView:true,
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


export const submit_password = (that) =>{

  //do_login = () => {
  that.setState({
        errorMsg:'',
        showLoader:true
      })

  if((that.state.email=='')){
    that.setState({
        errorMsg:'Email address not found!',
        showLoader:false
      })
  }else if(that.state.confirm_id ==''){
    that.setState({
        errorMsg:'Please enter the confirmation code sent to your email address!',
        showLoader:false
      })
  }else if(that.state.new_password ==''){
    that.setState({
        errorMsg:'Please enter new password!',
        showLoader:false
      })
  }else if(that.state.new_password !== that.state.confirm_new_password){
    that.setState({
        errorMsg:'Passwords do not match!',
        showLoader:false
      })
  }else{   

  const formdata = new FormData();
  
  formdata.append('email', that.state.email);
  formdata.append('user_recover_id', that.state.confirm_id);
  formdata.append('password', that.state.new_password);
  formdata.append('confirm_password', that.state.confirm_new_password);

  fetch (global.serverUrl+'api/forgot_password_confirm',{
    method:'POST',
    headers: {
    'Content-Type': 'multipart/form-data',
    },
    body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    alert(res.msg);
    //console.log(res);
    if(res.status =="1"){
      that.setState({
        errorMsg:res.msg,
        showLoader:false,
        email:'',
        confirm_id:'',
        new_password:'',
        confirm_new_password:'',
      })
      //that.props.navigation.push('UserScreen');
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

export const login = (that) =>{
  //do_login = () => {
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
  fetch (global.serverUrl+'api/user_login_from_react_native',{
    method:'POST',
    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    body: JSON.stringify({
      username:that.state.username,
      password: that.state.password,
    }),
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //alert(res);
    //console.log(res);
    if(res.status =="2"){
      //alert(JSON.stringify(res.channels));
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      AsyncStorage.setItem('user-token',res.token);
      AsyncStorage.setItem('user-channels',JSON.stringify(res.channels));
     

      that.props.navigation.push('UserScreen');
      that.setState({
        errorMsg:'',
        showLoader:false,
        username:'',
        password:'',
        
      })
    }else{
      that.setState({
        errorMsg:res.message,
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


export const updateProfileImage = (that) => { 
  const formdata = new FormData();
  if(that.state.isGroupImageSelected){
  var pegSize = 5;  
  const imageSize = Logic.calculate_megabyte_from_byte(that.state.filePath.fileSize); 
  var Size = imageSize*1;
  if(Size<pegSize){
    
    that.setState({
        showLoader:true
      });
        
  formdata.append('DeviceToken',that.state.user_token);  
  formdata.append('base64',that.state.filePath.data);
  formdata.append('folder_to_save','profile_images');
  formdata.append('type','profile');
  }else{    
  that.setState({showLoader:false,errorMsg:'Sorry, Image Size greater than '+pegSize+'MB'})
  return;
  }
  
    
  fetch (global.serverUrl+'api/user_update_profile_image',{
  method:'POST',
  headers: {
  'Content-Type': 'multipart/form-data',
  },
  body: formdata 
  })
  .then((response)=>response.json())
  .then((res) =>{
    
    //console.log(res);
    if(res.status =="1"){
      alert(JSON.stringify(res.msg));
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.setState({
        data:JSON.parse(JSON.stringify(res.data)),
        editView:false,
        showLoader:false
      })
      that.props.navigation.push('UserScreen',{default_screen:"Profile"});

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

    if((that.state.FName=='')){
    that.setState({
        errorMsg:'Please enter first name!',
      })
    }else if((that.state.Phone=='')){
      that.setState({
        errorMsg:'Please enter phone number!',
      })
    }else if((that.state.inst_latitude =='')||(that.state.inst_longitude =='')){
      that.setState({
        errorMsg:'Please select institution from drop down!',
      })
    }else if(that.state.gender ==''){
      that.setState({
        errorMsg:'Please select gender!',
      })
    }else if((that.state.edu_role_selected =='')){
      that.setState({
        errorMsg:'Please select educational role',
      })
    }else{
      that.setState({
        showLoader:true
      });



  const formdata = new FormData();
  
  formdata.append('first_name', that.state.FName);
  formdata.append('last_name', that.state.LName);
  formdata.append('phone',that.state.Phone);
  formdata.append('address',that.state.Address);
  formdata.append('state',that.state.State);
  formdata.append('DeviceToken',that.state.user_token);
  formdata.append('institution',that.state.Institution);
  formdata.append('institution_lat',that.state.inst_latitude);
  formdata.append('institution_long',that.state.inst_longitude);
  formdata.append('faculty',that.state.Faculty);
  formdata.append('department',that.state.Department);
  formdata.append('gender',that.state.gender);
  formdata.append('educational_role',that.state.edu_role_selected);

  fetch (global.serverUrl+'api/user_update_details_from_react_native',{
  method:'POST',
  headers: {
  'Content-Type': 'multipart/form-data',
  },
  body: formdata
    
  })
  .then((response)=>response.json())
  .then((res) =>{
    //console.log(res);
    if(res.status =="1"){
      alert(JSON.stringify(res.msg));
      AsyncStorage.setItem('user-data',JSON.stringify(res.data));
      that.setState({
        data:JSON.parse(JSON.stringify(res.data)),
        editView:false,
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



