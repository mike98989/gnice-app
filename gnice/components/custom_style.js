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
    fontSize:30,
    color:'#ccc',
}

});

export{custom_style}
