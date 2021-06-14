import {StyleSheet,Dimensions} from 'react-native';

const custom_style = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
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
    fontSize:25,
    color:'#303030',
    fontWeight:'bold'
},
login_btn:{
    width:120,
    height:40,
    borderRadius:30,
    backgroundColor:'#5e9db8',
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
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
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

});

export{custom_style}
