import React, { useState } from "react";
import {StyleSheet, View } from "react-native";

import { TextInput, HelperText } from "react-native-paper";


const InputRegister = ({label, massageError, icon}) => {
    const [text, setText] = useState('');
    

    const onChangeText = text => setText(text);

    const hasErrors = () => {
        return text.includes('@');
    };

    return (
        <View accessible={true} > 
            <TextInput  activeUnderlineColor="#225E77" left={<TextInput.Icon name={icon}  color='#DCEBF2' size={30}/>} value={text} mode='Flat ' label={label} activeOutlineColor="#225E77" onChangeText={onChangeText} outLineColor='#6D6D6D'  style={style.inputText} onPress={text}/>
            <HelperText type="error" visible={hasErrors()}>
            ERRO: {massageError}
            </HelperText>
        </View>
    );
}

export default InputRegister;

const style = StyleSheet.create({
    inputText: {
        backgroundColor: 'white',
        height: 50,
        width: 340,
    },
})