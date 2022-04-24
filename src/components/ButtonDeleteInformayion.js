import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ButtonDeleteInformation = ({ functionClicked }) => {
    const navigation = useNavigation();
    const showAlert = () => {
        Alert.alert("", "Deseja deletar essas informações?", [
            {
                text: "Cancelar",
                onPress: () => {
                    console.log("cancelou");
                },
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: () => {
                    functionClicked();
                },
                style: "cancel",
            },
        ]);
    };

    return (
        <TouchableOpacity
            accessible={true}
            accessibilityHint="Deletar as informações"
            accessibilityLabel="Deletar"
            style={style.container}
            onPress={() => showAlert()}
        >
            <Icon name="delete" size={17} color="#C14040" />
            <Text style={style.text}>Excluir Informação</Text>
        </TouchableOpacity>
    );
};

export default ButtonDeleteInformation;

const style = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "black",
        marginLeft: 10,
        fontSize: 15,
    },
});
