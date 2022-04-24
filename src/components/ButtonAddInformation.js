import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from '@expo/vector-icons/Ionicons';

const ButtonAddInformation = () => {

    return (
        <TouchableOpacity onPress={() => console.log('adicionando informação')}
            accessible={true}
            accessibilityHint="Adicionar Informação"
            accessibilityLabel="Adicionar Informação"
            style={style.container}
        >
            <Icon name="add-circle" size={17} />
            <Text style={style.text}>Adicionar Informação</Text>
        </TouchableOpacity>
    );
};

export default ButtonAddInformation;

const style = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        width: '100%',
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: 'black',
        marginLeft: 10,
        fontSize: 15,
    },
});
