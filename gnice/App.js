import React, {Component,useEffect} from 'react';
import Routes from './Routes';
//import SplashScreen from 'react-native-splash-screen';
import SplashScreen from  "react-native-splash-screen";

export default class App extends Component<{}> {

componentDidMount() {
	//SplashScreen.hide();
  setTimeout(() => SplashScreen.hide() , 4000);
}

render(){
  return (
    <Routes/>
    );
}

}