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
    fontSize:20,
    color:'#303030',
    fontWeight:'bold',
    paddingLeft:15,
},
product_name:{
  fontWeight:'bold', 
  color:'#7f7e7e',
  fontSize:15
},
product_sub_name:{
  color:'#5c5b5b',
  fontSize:12
},
login_btn:{
    width:120,
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

});

export{custom_style}
