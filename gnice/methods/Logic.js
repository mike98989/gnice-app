import React from 'react';
import * as ImagePicker from "react-native-image-picker";
import {Alert} from "react-native";
import * as Requests from './Requests';


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
      that.formData.append('property_size',that.state.square_meters);
    break;

    case '7':
      //that.setState({ formGroup: 'phones'}); 
      break;

    default:
      //that.setState({ formGroup: null}); 
    }
}

  export const deleteItemFromLoop = (that,i) =>{
    var array = [...that.state.resourcePath]; // make a separate copy of the array
    if (i!== -1) {
    array.splice(i,1);
    that.setState({resourcePath: array});
    }

  }

  export const deleteUploadedImage = (index,item,that) =>{
    
    Alert.alert(
      "Delete",
      "Do your want to remove this already uploaded image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          //that.setState({item_to_delete:item})
          Requests.delete_product_image(that,index);
        }}
      ]
    );

    // var array = [...that.state.resourcePath]; // make a separate copy of the array
    // if (i!== -1) {
    // array.splice(i,1);
    // that.setState({resourcePath: array});
    // }

  }

  export const update_edit_view_and_picker_value = (that)=>{
    
    ///////////////CATEGORY AND SUB
    that.state.categories_and_sub.forEach((obj,index) => {
        if (obj.id === that.props.route.params.paramsdata.category) {
          {!that.state.categoryDropDownValue ? (
            onCategoryValueChange({value:index+'',label:obj.title},that,true)
          ):null} 
          
          //////////////UPDATE SUBCATEGORY
          obj.subcategory.forEach((subcat,index) => {
            if (subcat.sub_id === that.props.route.params.paramsdata.sub_category) {
                onSubCategoryValueChange({value:index+'',label:subcat.title},that,true)
            } 
          });

          
        }
    });

    ///////////////CAR MAKES AND MODELS
    that.state.required_tables.car_makes.forEach((obj,index) => {
      if (obj.make === that.props.route.params.paramsdata.brand) {
        {!that.state.carMakeDropDownValue ? (
          onCarMakeValueChange({value:index+'',label:obj.make},that,true)
        ):null} 
        
        //////////////UPDATE MODEL
        obj.car_models.forEach((models,index) => {
          if (models.model === that.props.route.params.paramsdata.model) {
              onCarModelValueChange({value:index+'',label:models.model},that,true)
          } 
        });
        
      }
  });
  
  ///////////////CONDITION
  that.state.required_tables.conditions.forEach((obj,index) => {
    if (obj.condition_id === that.props.route.params.paramsdata.condition_state) {
      {!that.state.conditionDropDownValue ? (
        onConditionValueChange({value:index+'',label:obj.state},that,true)
      ):null} 
    }
  });

  ///////////////PROPERTY TYPE
  that.state.required_tables.property_types.forEach((obj,index) => {
    if (obj.type_id === that.props.route.params.paramsdata.property_type) {
      {!that.state.propertyTypeSelected ? (
        onPropertyTypeValueChange({value:index+'',label:obj.type},that,true)
      ):null} 
    }
  });


     ///////////////STATE AND LGAS
     that.state.required_tables.states.forEach((obj,index) => {
      if (obj.state === that.props.route.params.paramsdata.state) {
        {!that.state.stateSelected ? (
          onStateValueChange({value:index+'',label:obj.state},that,true)
        ):null} 
        
        //////////////UPDATE LGAS
        obj.lgas.forEach((lga,index) => {
          if (lga.Lga === that.props.route.params.paramsdata.lga) {
            onlgaValueChange({value:index+'',label:lga.Lga},that,true)
          } 
        });
        
      }
  });

  image_value = split_value(that.props.route.params.paramsdata.image, ',');

  that.setState({
    color:that.props.route.params.paramsdata.color,
    land_mark:that.props.route.params.paramsdata.land_mark,
    price:that.props.route.params.paramsdata.price,
    square_meters:that.props.route.params.paramsdata.property_size,
    advert_title:that.props.route.params.paramsdata.name,
    advert_details:that.props.route.params.paramsdata.description,
    size:that.props.route.params.paramsdata.size,
    images:image_value, 
    negotiable_price:that.props.route.params.paramsdata.negotiable=='1'?true:false
  })
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
  let objectval = JSON.parse(JSON.stringify(that.state.categories_and_sub[value.value]));  
  that.setState({
  categorySelected:that.state.categories_and_sub[value.value].id,  
  categoryDropDownValue:value,
  subCategoryListSelected: objectval.subcategory,
  });
  //console.log(that.state.subCategoryListSelected);return;
  update_view ? update_new_product_category_view(that.state.categories_and_sub[value.value].id,that):null
  
 }

// }

export const onSubCategoryValueChange = (value,that,update_view) => {
  let objectval = JSON.parse(JSON.stringify(that.state.subCategoryListSelected[value.value]));  
  //alert(JSON.stringify(that.state.formGroup));return;
  that.state.showProductForm = true;
  that.setState({ 
      subCategorySelected: objectval.sub_id,
      subCategoryDropDownValue:value,
      showProductForm:true,
  }); 
  update_view ? update_new_product_subcategory_view(objectval.sub_id,that):null
  
}

export const onConditionValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.conditions[value.value]));   
  that.setState({
  conditionDropDownValue:value,  
  conditionSelected: objectval.state
   });
   
 }

 export const onlgaValueChange = (value,that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.lgalListSelected[value.value]));
  //alert(objectval.Lga);return;
   that.setState({  
  lgaSelected:objectval.Lga,  
  //lgaArraySelected:value,
  lgaDropDownValue:value,
   });
 }

 export  const  onStateValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.states[value.value])); 
   that.setState({
  lgalListSelected: objectval.lgas,  
  stateSelected:objectval.state,  
  stateDropDownValue:value,
   });
 }

 export  const onCarMakeValueChange = (value,that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.car_makes[value.value])); 
  //console.log(objectval);  
  that.setState({
  carMakeSelected:objectval.make,  
  carMakeDropDownValue:value,
  carModelListSelected: objectval.car_models
   });
   
 }

 export  const onCarModelValueChange = (value,that) => {
  //alert(JSON.stringify(value.value));
  let objectval = JSON.parse(JSON.stringify(that.state.carModelListSelected[value.value]));   

  that.setState({
  carModelDropDownValue:value, 
  carModelSelected:objectval.model, 
  //carModelSelected:value.value,  
   });
 }

 export  const onPropertyTypeValueChange=(value,that)=>{
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.property_types[value.value]));   
  that.setState({
  propertyTypeSelected:objectval.type,  
  propertyTypeDropDownValue:value,  
   });
 }

 export  const onPhoneMakeValueChange=(value,that)=>{
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.phone_makes[value.value]));   
  that.setState({
  phoneMakeSelected:value.value,  
   phoneModelListSelected: objectval.phone_models
   });
   
 }
 
 export  const onPhoneModelValueChange = (value,that)=>{
  that.setState({
  phoneModelSelected:value.value, 
  phoneModelArraySelected:value, 
   });
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
      that.formData.append('property_size',that.state.square_meters);
      
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
        that.formData.append('size',that.state.size);
        break;  

    default:
      that.setState({ formGroup: null}); 
    }

}


export const disable_enable_item = (index,item,that,value)=>{
  {value=='1'? title="Enabled":title="Disable"}
  Alert.alert(
    title,
    "Do your want to "+title+" this ads "+item.name+" ?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        that.setState({item_to_disable:item})
        Requests.disable_enable_item(that,index,value);
      }}
    ]
  );
  
}

export const delete_item = (index,item,that)=>{
  Alert.alert(
    "Delete",
    "Do your want to remove this ads "+item.name+" ?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        that.setState({item_to_delete:item})
        Requests.delete_item(that,index);
      }}
    ]
  );
  
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
        selectionLimit:0
        
      },
      (response) => {
        console.log(response);
        if(!response['didCancel']){
        let responseValue = JSON.parse(JSON.stringify(response['assets']));
        that.state.uploadImageCount++;
        //that.setState({resourcePath: responseValue[0]});
        that.setState({ resourcePath: [...that.state.resourcePath, ...responseValue] }) //another array
        }
        

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
      quality: 1,
      selectionLimit:1
    },
    (response) => {
      console.log(response);
      if(!response['didCancel']){
      let responseValue = JSON.parse(JSON.stringify(response['assets']));
      that.state.uploadImageCount++;
      that.setState({resourcePath: responseValue[0]});
      }
    },
  )
}


export const calculate_megabyte_from_byte = (byte) =>{
  let imagesize = byte/1000000;
  return imagesize;
}
  

