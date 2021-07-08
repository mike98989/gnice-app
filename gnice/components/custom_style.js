import {StyleSheet,Dimensions} from 'react-native';

const custom_style = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
  },
  justify_container:{
    flex:1,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  category_box:{
    borderRadius:5,
    width:'32%',
    padding:3,
    margin:'1%',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  item_box:{
  elevation:4,
  backgroundColor: '#FFF',
  shadowColor: '#ccc',
  shadowOpacity: 1,
  shadowRadius: 5,shadowOffset: { width: 5, height: 5 },
  zIndex:999,borderColor:'#ccc',
  borderWidth:1,
  borderRadius:10,
  },
  item_box_tag:{
  backgroundColor:'#8fd0f3',
  textAlign:'center',
  alignContent:'center',
  color:'#000',
  borderRadius:10,
  width:40,
  },
  button:{
    width:300,
    paddingVertical:12,
    borderRadius:20,
    marginTop:20,
    backgroundColor:'#1c313a',
  },
  fullWidth:{
    width: Dimensions.get('window').width,
    },
fullHeight:{
    height: '100%',
    },
    
section_header:{
    fontSize:27,
    color:'#313030',
    fontFamily:'Cicle',
},
product_name:{
  color:'#15495d',
  fontSize:17,
  fontFamily:'Rajdhani',
},
product_price:{
  color:'#000',
  fontSize:14,
  fontWeight:'bold',
  marginTop:5,
},
home_link_btn:{
  width:null,
  marginRight:10,
  paddingHorizontal:10,
  paddingVertical:5,
  elevation:4,
  textAlign:'center',
  backgroundColor: '#FFF',
  fontSize:25,
  shadowColor: '#ccc',
  shadowOpacity: 1,
  shadowRadius: 5,shadowOffset: { width: 5, height: 5 },
  zIndex:999,borderColor:'#fff',
  borderWidth:1,
  borderRadius:20,
},
search_div_transparent:{
  width:'85%',
  marginLeft:20,
  paddingHorizontal:0,
  paddingVertical:0,
  borderWidth:1,
  borderRadius:20,
  marginBottom:7,
  borderColor:'#fff',
  backgroundColor: '#FFF',
},
search_div:{
  width:'85%',
  marginLeft:20,
  paddingHorizontal:0,
  paddingVertical:0,
  elevation:4,
  textAlign:'center',
  backgroundColor: '#FFF',
  fontSize:25,
  shadowColor: '#ccc',
  shadowOpacity: 1,
  shadowRadius: 5,shadowOffset: { width: 5, height: 5 },
  zIndex:999,borderColor:'#fff',
  borderWidth:1,
  borderRadius:20,
  height:null,
  marginBottom:7,
  flexDirection:'row',
},
product_details_container:{
  marginTop:4,
  paddingHorizontal:20,
},
product_details_image:{
  borderBottomRightRadius:30,
  borderBottomLeftRadius:30,
},
product_details_title:{
  fontSize:27,
  fontWeight:'bold',
  color:'#3f80a3',
  fontFamily:'Cicle',
},
product_details_price:{
  fontSize:27,
  fontWeight:'bold',
  color:'#000',
  marginTop:20,
  fontFamily:'Cicle',
},
search_div_search_icon:{
width:35,
height:35,
borderRadius:17,
backgroundColor:'#ccc',
},
product_sub_name:{
  color:'#5c5b5b',
  fontSize:12,
  
},
product_price_tag:{
  color:'#053f57',
  fontSize:21,
  textAlign:'center',
  fontWeight:'bold'
},
product_price_super_script:{
  color:'#000',
  fontSize:15,
  textAlign:'left',
  marginRight:4
  
},
login_btn:{
    width:140,
    height:40,
    borderRadius:30,
    backgroundColor:'#2c7ab2',
    textAlign:'center',
    color:'#fff',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    marginTop:5,
},
signup_btn:{
    width:130,
    height:45,
    backgroundColor:'#fff',
    textAlign:'center',
    color:'orange',
    alignItems:'center',
    letterSpacing: 20,
    fontWeight:'bold',
    alignContent:'center',
    justifyContent:'center',
    alignContent:'center',
    marginTop:20,
},
right_border_radius:{
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
},
left_border_radius:{
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
},

formcontrol:{
    width:320,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical:10,
    paddingHorizontal:35,
    height:55,
    fontSize:15,
    borderRadius:30,
    marginBottom:10,
  },

formcontrol_login_username:{
    width:320,
    paddingVertical:10,
    paddingHorizontal:35,
    height:55,
    fontSize:15,
    paddingVertical:10,
    borderTopRightRadius:30,
  },
  formcontrol_login_password:{
    width:320,
    paddingVertical:10,
    paddingHorizontal:35,
    height:55,
    marginTop:5,
    fontSize:15,
    paddingVertical:10,
    borderBottomRightRadius:30,
  }, 
  formcontrol_product_screen:{
    width:350,
    paddingVertical:10,
    paddingLeft:10,
    height:45,
    fontSize:15,
    borderRadius:10,
    marginBottom:10,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
  }, 
  textInputShadow:{
    elevation: 1,
    borderWidth: .2,
    shadowOpacity: .1,
    shadowRadius: 0,shadowColor:'black',shadowOffset: { width: 1, height: 1.5 },
    zIndex:999,borderColor:'#84d5f1',
  },
  errorMsg:{
    width:'100%',
    color:'#b97a3e',
    fontWeight:'bold',
    paddingHorizontal:20,
    textAlign:'center',
    fontSize:15,
    marginVertical:17,
  },
  preview_header:{
    fontSize:16,
    color:'#fff',
    fontWeight:'normal',
    width:'70%',
    alignSelf:'center',
    textAlign:'center',
    marginBottom:10
  },
  preview_header:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold',
    width:'70%',
    alignSelf:'center',
    textAlign:'center',
    marginBottom:10
  },
  preview_header_title:{
    fontSize:16,
    color:'#b1e0ee',
    fontWeight:'bold',
    alignSelf:'center',
    textAlign:'center',
    marginBottom:10,
    marginTop:15
  },
  confirmation_code_box:{
  width:50,
  height:50,
  elevation:4,
  textAlign:'center',
  backgroundColor: '#FFF',
  fontSize:25,
  shadowOffset: { width: 5, height: 5 },
  shadowColor: '#ccc',
  shadowOpacity: 1,
  shadowRadius: 0,shadowOffset: { width: 1, height: 1 },
  zIndex:999,borderColor:'#ccc',
  borderWidth:1,
  borderRadius:10,
  },
  signup_checkbox:{
    height:20,
    width:20,
    color:'#000',
    marginRight:10,
  },
  footer_container:{
  backgroundColor:'#fff',  
  elevation:4,
  shadowOpacity: 0.2,
  zIndex:999,
  },
  styled_blue:{
    color:'#0f619b',
  },
  action_call_btn: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:5,
    width:'50%',
    paddingVertical:15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  blurView:{
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
    }

});

export{custom_style}
