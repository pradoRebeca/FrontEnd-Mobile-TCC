import React from "react";
import {StyleSheet, View, Text} from "react-native";

const RequiredField = () => {
    return (
        <View style={style.container} accessible={true} > 
            <Text style={style.text}>Obrigatório Informar</Text>
        </View>
    );
}

export default RequiredField;

const style = StyleSheet.create({
    container:{
        // backgroundColor: 'yellow',
        width: '100%',
    },
    text: {
        color: '#C14040',
        fontSize: 12,
    },
})