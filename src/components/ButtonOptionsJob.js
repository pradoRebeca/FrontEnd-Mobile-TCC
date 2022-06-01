import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";

const ButtonOptionsJob = ({ label, type, icon, stateButton,  id}) => {
  const [buttonsOptions, setButtonsOptions] = useState(0);
  const navigation = useNavigation();


  const onClick = () => {
    stateButton(id)
  
  };

  return (
    <>
      <TouchableOpacity
        onPress={onClick}
        accessible={true}
        accessibilityHint="Salvar informações"
        accessibilityLabel="Salvar"
        style={type === 'blue' ? style.button : {...style.button, backgroundColor: '#6D6D6D' }}
      >
        <Icon color="white" name={icon} size={17} />
        <Text style={ style.text}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonOptionsJob;

const style = StyleSheet.create({
  //   container: {r
  //     width: 100,
  //     height: 40,
  //     display: "flex",
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     marginBottom: 10,
  //   },
  button: {
    borderRadius: 5,
    height: 30,
    minWidth: 10,
    backgroundColor: "#1E7596",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 7,
  },
  text: {
    marginLeft: 3,
    color: "white",
    fontSize: 15,
  },
});
