import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';


const OptionsJobButton = ({navigation, screen, isChecked, title}) => {
  
  const [stateTitle, setStateTitle] = useState([])
  console.log('optionsJobButtons', stateTitle, 'pausa')
  let styleButtonChecke ;


  const changeButton = () => {
    if(stateTitle){
      styleButtonChecke = {color: 'white', borderBottomColor: 'white', borderBottomWidth: 1,}
    } else {
      styleButtonChecke = {color: 'white',}
    }

    return styleButtonChecke;
  }
 
    const changeScreen = () =>{
      setStateTitle(!stateTitle)
      navigation.navigate({name: screen})
    }


  return (
     <TouchableOpacity onPress={changeScreen}>
        <Text style={changeButton()}>{title}</Text>
    </TouchableOpacity>
  );
}

export default OptionsJobButton;

const style = StyleSheet.create({
  content: {
    width: '100%',
    height: 40,
    backgroundColor: '#4392B8', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleButton:{
    color: 'white',
  },
  titleButtonChecked:{
    color: 'white',
    
  },

})