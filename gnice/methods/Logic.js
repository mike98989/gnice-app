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

  export const onreportReasonChange = (value,that)=> { 
  let objectval = JSON.parse(JSON.stringify(that.state.report_reasons[value.value])); 
  var reason = objectval.reason;
  //alert(objectval.reason);return;
  that.setState({
  reportReasonSelected:reason,  
  reportReasonDropDownValue:value,
  //subCategoryListSelected: objectval.subcategory,
  });
  //alert(that.state.reportReasonSelected);
 }

 export const onCategoryValueChange = (value,that,update_view)=> { 
   //alert(JSON.stringify(update_view));return;
  let objectval = JSON.parse(JSON.stringify(that.state.categories_and_sub[value.value]));   
  that.setState({
  categorySelected:that.state.categories_and_sub[value.value].id,  
  categoryDropDownValue:value,
  subCategoryListSelected: objectval.subcategory,
  });
  update_view ? update_new_product_category_view(that.state.categories_and_sub[value.value].id,that):null
 }

// }

export const onSubCategoryValueChange = (value,that,update_view) => {
  let objectval = JSON.parse(JSON.stringify(that.state.subCategoryListSelected[value.value]));  
  that.setState({ 
      subCategorySelected: objectval.sub_id,
      subCategoryDropDownValue:value,
      showProductForm:true,
  }); 
  update_view ? update_new_product_subcategory_view(value.value,that):null
  
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
  

