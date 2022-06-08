import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
// import TextInputMask from "react-native-text-input-mask";

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
  required,
  type,
  mask,
  security
}) => {
  //06693590
  const [text, setText] = useState("");

  //const [value, setValue] = useState(valueDefault)
  // console.log('value ', keyObject, ': ', value)

  const onChangeText = (element) => {
    // console.log('texto da input => ',element)
    setText(element);
    onChangeObject({ ...object, [keyObject]: element });
    // console.log('value ', keyObject, ': ', valueDefault)
  };

  useEffect(() => {
    if (type) {
      onChangeText(valueDefault);
    } else {
      setText(valueDefault);
    }
  }, [valueDefault]);

  let inputmask;

  switch (mask) {
    case "tel":
      inputmask = "([00]) [0] [0000]-[0000]";
      break;
    case "cep":
      inputmask = "[00000]-[000]";
  }

  // useEffect(() => {
  //   console.log('value api: ', valueAPI)
  //   if (value != undefined && value != '') {
  //     setText(value);
  //     onChangeObject({ ...object, [keyObject]: value});

  //   }else{
  // console.log(keyObject, value)
  //   }
  // }, [value]);

  //console.log('valor do valueDefault', valueDefault)

  // useEffect(() => {
  //   console.log(text)
  //     setText(valueDefault);
  //     onChangeObject({ ...object, [keyObject] : text});
  // }, []);

  // if([label].includes('*')){
  //   console.log('tem asterisco')
  // }

  const viewLabel = () => {};

  const isRequired = () => {
    if (required) {
      return label + '*';
    } else {
      return label;
    }
  };

  return (
    <View style={style.container} accessible={true}>
      {/* <Text>{label}</Text> */}
      {/* {isRequired(required)} */}
      <TextInput
        // maxLength={length}
        left={
          mode ? (
            <TextInput.Icon name={nameIcon} color="#DCEBF2" size={25} />
          ) : (
            ""
          )
        }
        editable={editable}
        secureTextEntry={security ? true : false}
        // onEndEditing={(e) => onChangeText(e.nativeEvent.text)}
        numberOfLines={3}
        multiline={multiline}
        activeUnderlineColor="#225E77"
        outlineColor="#F5F5F5"
        value={text}
        mode={mode ? "flat" : "outlined"}
        label={isRequired()}
        activeOutlineColor="#225E77"
        onChangeText={(text) => onChangeText(text)}
        outLineColor="#6D6D6D"
        style={
          mode
            ? { ...style.inputText, backgroundColor: "white" }
            : { ...style.inputText, height: 40 }
        }
        // mask={typeMask}
        // onPress={text}
        // render={ mask ? (mask) => (
        //   <TextInputMask mask={inputmask} />
        // ) : ''}
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
    height: 55,
  },
  label: {
    color: "red",
  },
});
