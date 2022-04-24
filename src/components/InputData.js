import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const InputData = ({
  label,
  multiline,
  keyObject,
  object,
  onChangeObject,
  editable,
  valueAPI,
  mode,
  nameIcon,
  valueDefault,
  error,
  required
}) => {
  //06693590
  const [text, setText] = useState("");

  useEffect(() => {
    if (valueAPI != undefined) {
      setText(valueAPI);
    }
  });

  useEffect(() => {
    setText(valueDefault);
  }, [valueDefault]);

  const onChangeText = (element) => {
    onChangeObject({ ...object, [keyObject]: element });
  };

  if([label].includes('*')){
    console.log('tem asterisco')
  }
  //alerta da input parfa verificar se tem erro ou não
  // const [errorMassage, setErrorMassage] = useState({
  //   message: "",
  //   display: false,
  //   type: "info",
  // });

  // const hasErrors = () => {
  //   console.log(error)
  //   setErrorMassage(error);
  // };

  // var styleInput;
  // var modeInput;
  // var iconInput;

  // switch(mode){
  //   case 'calendar':
  //     iconInput = <TextInput.Icon name={nameIcon} color="#DCEBF2" size={30} />;
  //     modeInput = 'outlined'
  //     styleInput = style.inputText
  //     break;

  //   case 'register':
  //       iconInput = '';
  //       modeInput = 'flat'
  //       styleInput = { ...style.inputText, backgroundColor: "white" }
  //       break;

  //   case 'initial':
  //       iconInput = <TextInput.Icon name={nameIcon} color="#DCEBF2" size={30} />;
  //       modeInput = 'flat'
  //       styleInput = style.inputText
  //       break;

  // }

  return (
    <View style={style.container} accessible={true}>
      {/* <Text>{label}</Text> */}
      {/* {isRequired(required)} */}
      <TextInput
        // maxLength={length}
        left={
          mode ? (
            <TextInput.Icon name={nameIcon} color="#DCEBF2" size={30} />
          ) : (
            ""
          )
        }
        editable={editable}
        
        onEndEditing={(e) => onChangeText(e.nativeEvent.text)}
        numberOfLines={3}
        multiline={multiline}
        activeUnderlineColor="#225E77"
        outlineColor="#F5F5F5"
        value={text}
        mode={mode ? "flat" : "outlined"}
        label={<Text style={required ? {color:'#C14040'} : {color: '#808080'} }>{required ? label+' *' : label}</Text>}
        activeOutlineColor="#225E77"
        onChangeText={(text) => setText(text)}
        outLineColor="#6D6D6D"
        style={
          mode
            ? { ...style.inputText, backgroundColor: "white" }
            : style.inputText
        }
        dense={1}
        onPress={text}
      />
      {/* {errorMassage.display && (
        <HelperText type={errorMassage.type} visible={hasErrors}>
          {errorMassage.message}
        </HelperText>
      )} */}
    </View>
  );
};

export default InputData;

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
    // backgroundColor: 'blue',
  },
  inputText: {
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  label:{
    color: 'red',
  }
});
