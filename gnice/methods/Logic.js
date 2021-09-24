import React from 'react';
import * as ImagePicker from "react-native-image-picker";

export const split_value = (value,seperator) => {
 var splitted_value = value.split(seperator);
 return splitted_value;
}

      
export const update_new_product_subcategory_view = (value, that)=>{

  if(that.state.subCategorySelected!=value){
    that.formData=new FormData();
  }

  switch(value) {
    case '27':
      //that.setState({ formGroup: 'cars'}); 
      that.formData.append('brand',that.state.carMakeSelected);
      that.formData.append('model',that.state.carModelSelected);
      that.formData.append('color',that.state.color);
      break;
    
    case '42':
      //that.setState({ formGroup: 'properties'}); 
      that.formData.append('property_type',that.state.propertyTypeSelected);
      that.formData.append('property_size',that.state.sqare_meters);
    break;

    case '7':
      //that.setState({ formGroup: 'phones'}); 
      break;

    default:
      //that.setState({ formGroup: null}); 
    }
}

export const update_new_product_category_view = (value,that)=>{

  if(that.state.categorySelected!=value){
    //that.formData=null;
    that.setState({ formGroup: null}); 
  }
  switch(value) {
    case '1':
      // if(!that.state.formGroup){
      that.setState({ formGroup: 'cars'}); 
      // }else{
      that.formData.append('brand',that.state.carMakeSelected);
      that.formData.append('model',that.state.carModelSelected);
      that.formData.append('color',that.state.color);
      break;
    
    case '2':
      
      that.setState({ formGroup: 'properties'}); 
      
      that.formData.append('property_type',that.state.propertyTypeSelected);
      that.formData.append('property_size',that.state.sqare_meters);
      
    break;

    case '3':
      
      that.setState({ formGroup: 'phones'}); 
      that.formData.append('brand',that.state.phoneMakeSelected);
      that.formData.append('model',that.state.phoneModelSelected);
      that.formData.append('color',that.state.color);
      break;

    case '5':
        
        that.setState({ formGroup: 'fashion'}); 
        that.formData.append('color',that.state.color);
        
        break;  

    default:
      that.setState({ formGroup: null}); 
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
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        let responseValue = JSON.parse(JSON.stringify(response['assets']));
        that.state.uploadImageCount++;
        //that.setState({resourcePath: responseValue[0]});
        that.setState({ resourcePath: [...that.state.resourcePath, responseValue[0]] }) //another array

      },
    )
}


export const chooseImage = (that) => {  
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
      maxHeight: 200,
      maxWidth: 200,
    },
    (response) => {
      console.log(response);
      let responseValue = JSON.parse(JSON.stringify(response['assets']));
      that.state.uploadImageCount++;
      that.setState({resourcePath: responseValue[0]});
    },
  )
}


export const calculate_megabyte_from_byte = (byte) =>{
  let imagesize = byte/1000000;
  return imagesize;
}
  

