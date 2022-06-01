import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const Button = (props) => {
    return (
        <TouchableOpacity
            accessible={true}
            accessibilityHint="Ir para a tela de Cadastro"
            accessibilityLabel="Entrar"
            style={{ ...style.view, backgroundColor: props.backgroundColor }}
            onPress={() => props.navigation.navigate({ name: props.screen })}
        >
            <View>
                <Text style={{ ...style.text, color: props.color }}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
//teesste
const style = StyleSheet.create({
    view: {
        height: 45,
        width: 300,
        backgroundColor: "#225E77",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 16,
    },
    text: {
        color: "white",
        fontSize: 20,
        // letterSpacing: 2,
        fontWeight: "500",
    },
});

export default Button;
