import React from 'react';
import * as ImagePicker from "react-native-image-picker";
import {Alert} from "react-native";
import * as Requests from './Requests';


export const split_value = (value,seperator) => {
 var splitted_value = value.split(seperator);
 return splitted_value;
}

      
export const update_new_product_subcategory_view = (value, that)=>{
  
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
  

      ///////////////PHONE MAKES AND MODELS
      that.state.required_tables.phone_makes.forEach((obj,index) => {
        if (obj.make === that.props.route.params.paramsdata.brand) {
          {!that.state.carMakeDropDownValue ? (
            onPhoneMakeValueChange({value:index+'',label:obj.make},that,true)
          ):null} 
          
          //////////////UPDATE MODEL
          obj.phone_models.forEach((models,index) => {
            if (models.model === that.props.route.params.paramsdata.model) {
                onPhoneModelValueChange({value:index+'',label:models.model},that,true)
            } 
          });
          
        }
    });
  ///////////////CONDITION
  that.state.required_tables.conditions.forEach((obj,index) => {
    if (obj.state === that.props.route.params.paramsdata.condition_state) {
      {!that.state.conditionDropDownValue ? (
        onConditionValueChange({value:index+'',label:obj.state},that,true)
      ):null} 
    }
  });

  ///////////////SECOND CONDITION
    that.state.required_tables.second_conditions.forEach((obj,index) => {
      if (obj.state === that.props.route.params.paramsdata.second_condition) {
        {!that.state.secondConditionDropDownValue ? (
          onSecondConditionValueChange({value:index+'',label:obj.state},that,true)
        ):null} 
      }
    });

     ///////////////CAR TRANSMISSION 
     that.state.required_tables.transmission.forEach((obj,index) => {
      if (obj.transmission === that.props.route.params.paramsdata.transmission_type_vehicle) {
        {!that.state.carTransmissionDropDownValue ? ( 
          onCarTransmissionValueChange({value:index+'',label:obj.transmission},that,true)
        ):null} 
      }
    });

       ///////////////CAR FUEL
       that.state.required_tables.fuels.forEach((obj,index) => {
        if (obj.fuel === that.props.route.params.paramsdata.fuel_vehicle) {
          {!that.state.carFuelDropDownValue ? ( 
            onCarFuelValueChange({value:index+'',label:obj.fuel},that,true)
          ):null} 
        }
      });

       ///////////////CAR DRIVETRAIN
     that.state.required_tables.drivetrains.forEach((obj,index) => {
      if (obj.drivetrain === that.props.route.params.paramsdata.drivetrain_vehicle) {
        {!that.state.carDriveTrainDropDownValue ? ( 
          onCarDriveTrainValueChange({value:index+'',label:obj.drivetrain},that,true)
        ):null} 
      }
    });


      ///////////////MARITAL STATUS
      that.state.required_tables.marital_status.forEach((obj,index) => {
        //alert(that.props.route.params.paramsdata.marital_status);
        if (obj.marital_status === that.props.route.params.paramsdata.marital_status) {
         // alert(obj.marital_status);
          {!that.state.maritalStatusDropDownValue ? ( 
            onMaritalStatusValueChange({value:index+'',label:obj.marital_status},that,true)
          ):null} 
        }
      });

      ///////////////EMPLOYMENT STATUS
      that.state.required_tables.employment_status.forEach((obj,index) => {
        if (obj.employment_status === that.props.route.params.paramsdata.employment_status) {
          {!that.state.employmentStatusDropDownValue ? ( 
            onEmploymentStatusValueChange({value:index+'',label:obj.employment_status},that,true)
          ):null} 
        }
      });

      ///////////////JOB TYPES
      that.state.required_tables.job_types.forEach((obj,index) => {
        if (obj.type === that.props.route.params.paramsdata.job_type) {
          {!that.state.jobTypeDropDownValue ? ( 
            onJobTypeValueChange({value:index+'',label:obj.type},that,true)
          ):null} 
        }
      });


      ///////////////DEGREE/EDUCATION TYPES
      that.state.required_tables.degree_types.forEach((obj,index) => {
      if (obj.title === that.props.route.params.paramsdata.education) {
        {!that.state.degreeTypeDropDownValue ? ( 
          onDegreeTypeValueChange({value:index+'',label:obj.title},that,true)
        ):null} 
      }
      });

     ///////////////CAR BODY TYPES
     that.state.required_tables.car_body_types.forEach((obj,index) => {
      if (obj.type === that.props.route.params.paramsdata.body_type_vehicle) {
        {!that.state.carBodyTypeDropDownValue ? ( 
          onCarBodyTypeValueChange({value:index+'',label:obj.type},that,true)
        ):null} 
      }
    });
    
  ///////////////PROPERTY TYPE
  that.state.required_tables.property_types.forEach((obj,index) => {
    if (obj.type === that.props.route.params.paramsdata.property_type) {
      {!that.state.propertyTypeSelected ? (
        onPropertyTypeValueChange({value:index+'',label:obj.type},that,true)
      ):null} 
    }
  });

   ///////////////PROPERTY BUILD TYPE
   that.state.required_tables.build_types.forEach((obj,index) => {
    if (obj.type === that.props.route.params.paramsdata.build_type) {
      {!that.state.propertyBuildTypeSelected ? (
        onPropertyBuildTypeValueChange({value:index+'',label:obj.type},that,true)
      ):null} 
    }
  });

  /////////////////FASHION BRAND FORM
  that.state.required_tables.fashion_brands.forEach((obj,index) => {
    if (obj.brand === that.props.route.params.paramsdata.fashion_brand) {
      {!that.state.fashionBrandSelected ? (
        onFashionBrandValueChange({value:index+'',label:obj.brand},that,true)
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
    store_address:that.props.route.params.paramsdata.store_address,
    size:that.props.route.params.paramsdata.size,
    images:image_value, 
    trim:that.props.route.params.paramsdata.trim_vehicle, 
    registeredCarDropDownValue:that.props.route.params.paramsdata.registered_vehicle, 
    seats:that.props.route.params.paramsdata.seats_vehicle, 
    cylinders:that.props.route.params.paramsdata.number_of_cylinders, 
    engine_size:that.props.route.params.paramsdata.engine_size, 
    horse_power:that.props.route.params.paramsdata.horse_power_vehicle, 
    vin:that.props.route.params.paramsdata.vin_vehicle, 
    mileage:that.props.route.params.paramsdata.mileage_vehicle, 
    year_of_manufacture:that.props.route.params.paramsdata.year_of_manufacture, 
    negotiable_price:that.props.route.params.paramsdata.negotiable=='YES'?true:false,
    delivery_available:that.props.route.params.paramsdata.delivery_available=='YES'?true:false,
    ram_size:that.props.route.params.paramsdata.ram, 
    internal_memory:that.props.route.params.paramsdata.internal_storage, 
    battery_capacity:that.props.route.params.paramsdata.battery, 
    no_of_sim:that.props.route.params.paramsdata.sim, 
    resolution:that.props.route.params.paramsdata.resolution, 
    mainCameraDropDownValue:that.props.route.params.paramsdata.main_camera,
    selfieCameraDropDownValue:that.props.route.params.paramsdata.selfie_camera,
    no_of_bathrooms:that.props.route.params.paramsdata.number_of_bathrooms,
    no_of_bedrooms:that.props.route.params.paramsdata.number_of_bedrooms,
    property_address:that.props.route.params.paramsdata.property_address,
    genderDropDownValue:that.props.route.params.paramsdata.gender,
    age:that.props.route.params.paramsdata.age,
    studyingDropDownValue:that.props.route.params.paramsdata.still_studying,
    company_name:that.props.route.params.paramsdata.company_name,
    // work_experience:that.props.route.params.paramsdata.work_experience,
    min_years_experience:that.props.route.params.paramsdata.minimum_years_experience,
    min_qualification:that.props.route.params.paramsdata.minimum_qualification,
    responsibilities:that.props.route.params.paramsdata.responsibilities,
    application_deadline:that.props.route.params.paramsdata.application_deadline,
    salary:that.props.route.params.paramsdata.salary,
    certifications:that.props.route.params.paramsdata.certifications,
    skills:that.props.route.params.paramsdata.skills,
    //maritalStatusDropDownValue:that.props.route.params.paramsdata.marital_status,
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

 const onapplicationDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  //setShow(Platform.OS === 'ios');
  //setDate(currentDate);
};

 export const onCategoryValueChange = (value,that,update_view)=> { 
  let objectval = JSON.parse(JSON.stringify(that.state.categories_and_sub[value.value]));  
  that.setState({
  categorySelected:that.state.categories_and_sub[value.value].id,  
  categorySelectedObject:objectval,  
  categoryDropDownValue:value,
  subCategoryListSelected: objectval.subcategory,
  });
  //console.log(that.state.subCategoryListSelected);return;
  update_view ? update_category_view(that.state.categories_and_sub[value.value].id,that,false,true):null
  
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
  //update_view ? update_new_product_subcategory_view(objectval.sub_id,that):null
  
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

 export  const  onRegisteredCarValueChange = (value, that) => { 
   that.setState({
  registeredCarDropDownValue: value,  
  registeredCarSelected: value.value,
   });
 }
 

 export  const  onMainCameraValueChange = (value, that) => { 
  that.setState({
 mainCameraDropDownValue: value,  
 mainCameraSelected: value.value,
  });
}

export  const  onSelfieCameraValueChange = (value, that) => { 
  that.setState({
 selfieCameraDropDownValue: value,  
 selfieCameraSelected: value.value,
  });
}

 export const onCarBodyTypeValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.car_body_types[value.value]));   
  that.setState({
  carBodyTypeDropDownValue:value,  
  carBodyTypeSelected: objectval.type
   });
 }

 export const onCarTransmissionValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.transmission[value.value]));   
  that.setState({
  carTransmissionDropDownValue:value,  
  carTransmissionSelected: objectval.transmission
   });
 }
 
 export const onCarFuelValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.fuels[value.value]));   
  that.setState({
  carFuelDropDownValue:value,  
  carFuelSelected: objectval.fuel
   });
 }
 

 export const onCarDriveTrainValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.drivetrains[value.value]));   
  that.setState({
  carDriveTrainDropDownValue:value,  
  carDriveTrainSelected: objectval.drivetrain
   });
 }

 export const onMaritalStatusValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.marital_status[value.value]));  
  that.setState({
  maritalStatusDropDownValue:value,  
  maritalStatusSelected: objectval.marital_status
   });
 }
 
 export const onEmploymentStatusValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.employment_status[value.value]));   
  that.setState({
  employmentStatusDropDownValue:value,  
  employmentStatusSelected: objectval.employment_status
   });
 }

 export const onGenderValueChange = (value, that) => {
  that.setState({
    genderDropDownValue: value,  
    genderSelected: value.value,
  });
 }

 export const onStudyingValueChange = (value, that) => {
  that.setState({
    studyingDropDownValue: value,  
    studyingSelected: value.value,
  });
 }

 export const onJobTypeValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.job_types[value.value]));   
  that.setState({
  jobTypeDropDownValue:value,  
  jobTypeSelected: objectval.type
   });
 }
 
 
 export const onDegreeTypeValueChange = (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.degree_types[value.value]));   
  that.setState({
  degreeTypeDropDownValue:value,  
  degreeTypeSelected: objectval.title
   });
 }

 export const  onSecondConditionValueChange= (value, that) => {
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.second_conditions[value.value]));   
  that.setState({
  secondConditionDropDownValue:value,  
  secondConditionSelected: objectval.state
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

 export  const onPropertyBuildTypeValueChange=(value,that)=>{
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.build_types[value.value]));   
  that.setState({
  propertyBuildTypeSelected:objectval.type,  
  propertyBuildTypeDropDownValue:value,  
   });
 }

 export  const onFashionBrandValueChange=(value,that)=>{
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.fashion_brands[value.value]));   
  that.setState({
  fashionBrandSelected:objectval.brand,  
  fashionBrandDropDownValue:value,  
   });
 }
 
 
 export  const onPhoneMakeValueChange=(value,that)=>{
  let objectval = JSON.parse(JSON.stringify(that.state.required_tables.phone_makes[value.value]));   
  that.setState({
    phoneMakeDropDownValue:value, 
  phoneMakeSelected:value.label,  
   phoneModelListSelected: objectval.phone_models
   });
   
 }
 
 export  const onPhoneModelValueChange = (value,that)=>{
  that.setState({
  phoneModelDropDownValue:value,  
  phoneModelSelected:value.label, 
  phoneModelArraySelected:value, 
   });
 }

export const update_category_view = (value,that,setFormData,formGroupOnly)=>{

  if(setFormData){
  that.formData=new FormData();
  }

  if(that.state.categorySelected!=value){
    //that.formData=null;
    that.setState({ formGroup: null}); 
  }
  switch(value) {
    case '1':
      // if(!that.state.formGroup){
      that.setState({ formGroup: 'cars'}); 
      // }else{
      if(!formGroupOnly){  
      that.formData.append('brand',that.state.carMakeSelected);
      that.formData.append('model',that.state.carModelSelected);
      that.formData.append('color',that.state.color);
      that.formData.append('trim_vehicle',that.state.trim);
      that.formData.append('registered_vehicle',that.state.registeredCarSelected);
      that.formData.append('seats_vehicle',that.state.seats);
      that.formData.append('number_of_cylinders',that.state.cylinders);
      that.formData.append('engine_size',that.state.engine_size);
      that.formData.append('horse_power_vehicle',that.state.horse_power);
      that.formData.append('body_type_vehicle',that.state.carBodyTypeSelected);
      that.formData.append('year_of_manufacture',that.state.year_of_manufacture);
      that.formData.append('fuel_vehicle',that.state.carFuelSelected);
      that.formData.append('mileage_vehicle',that.state.mileage);
      that.formData.append('transmission_type_vehicle',that.state.carTransmissionSelected);
      that.formData.append('vin_vehicle',that.state.vin);
      that.formData.append('drivetrain_vehicle',that.state.carDriveTrainSelected);
      }
      break;
    
    case '2':
      that.setState({ formGroup: 'properties'}); 
      if(!formGroupOnly){ 
      that.formData.append('property_type',that.state.propertyTypeSelected);
      that.formData.append('build_type',that.state.propertyBuildTypeSelected);
      that.formData.append('property_size',that.state.square_meters);
      that.formData.append('property_address',that.state.property_address);
      that.formData.append('number_of_bedrooms',that.state.no_of_bedrooms);
      that.formData.append('number_of_bathrooms',that.state.no_of_bathrooms);
      }
    break;

    case '3':
      that.setState({ formGroup: 'phones'}); 
      if(!formGroupOnly){  
      that.formData.append('brand',that.state.phoneMakeSelected);
      that.formData.append('model',that.state.phoneModelSelected);
      that.formData.append('color',that.state.color);
      that.formData.append('ram',that.state.ram_size);
      that.formData.append('internal_storage',that.state.internal_memory);
      that.formData.append('resolution',that.state.resolution);
      that.formData.append('battery',that.state.battery_capacity);
      that.formData.append('sim',that.state.no_of_sim);
      that.formData.append('main_camera',that.state.main_camera);
      that.formData.append('selfie_camera',that.state.selfie_camera);
      }
      break;

    case '5':
        that.setState({ formGroup: 'fashion'}); 
        if(!formGroupOnly){ 
        that.formData.append('color',that.state.color);
        that.formData.append('size',that.state.size);
        that.formData.append('gender',that.state.genderSelected);
        that.formData.append('fashion_type',that.state.subCategoryDropDownValue.label);
        that.formData.append('fashion_brand',that.state.fashionBrandSelected);
        }
        break;  
    
    case '21':
      that.setState({ formGroup: 'seeking_work_form'}); 
      if(!formGroupOnly){   
      that.formData.append('gender',that.state.genderSelected);
      that.formData.append('marital_status',that.state.maritalStatusSelected);
      that.formData.append('employment_status',that.state.employmentStatusSelected);
      that.formData.append('job_type',that.state.jobTypeSelected);
      that.formData.append('age',that.state.age);
      that.formData.append('still_studying',that.state.studyingSelected);
      that.formData.append('certifications',that.state.certifications);
      that.formData.append('education',that.state.degreeTypeSelected);
      that.formData.append('skills',that.state.skills);
      }

      break; 

    case '22':
      that.setState({ formGroup: 'services_form'});
      if(!formGroupOnly){    
      that.formData.append('company_name',that.state.company_name);
      //that.formData.append('work_experience',that.state.work_experience);
      }
      break;
    case '23':
      that.setState({ formGroup: 'jobs_form'}); 
      if(!formGroupOnly){    
      that.formData.append('company_name',that.state.company_name);  
      that.formData.append('application_deadline',that.state.application_deadline);
      that.formData.append('minimum_years_experience',that.state.min_years_experience);
      that.formData.append('minimum_qualification',that.state.min_qualification);
      that.formData.append('skills',that.state.skills);
      that.formData.append('responsibilities',that.state.responsibilities);
      that.formData.append('job_type',that.state.jobTypeSelected);
      that.formData.append('salary',that.state.salary);
      }
      //that.formData.append('company_name',that.state.company_name);
      break; 

    default:
      that.setState({ formGroup: null}); 
    }

}

export const currency_convert = (price)=>{
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  alert(dollarUS.format(price));
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
  

