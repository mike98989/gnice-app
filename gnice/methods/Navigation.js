import React from 'react';


export const _opendrawer = (props) => {
    props.navigation.openDrawer();
 }  

export const _goback = (props) => {
    props.navigation.goBack();
 } 

export const _openscreen = (props,Screen) => {
  props.navigation.navigate(Screen);
}
