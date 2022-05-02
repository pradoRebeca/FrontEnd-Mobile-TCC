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
  const [text, setText] = useState('');

  // useEffect(() => {
  //   if (valueAPI != undefined) {
  //     setText(valueAPI);
  //   }
  // }, []);

  console.log('valor do valueDefault', valueDefault)

  useEffect(() => {
      setText(valueDefault);
  }, [valueDefault]);

  const onChangeText = (element) => {

   return  onChangeObject({ ...object, [keyObject]: element});
  
  };

  if([label].includes('*')){
    console.log('tem asterisco')
  }
 
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
            : {...style.inputText, height: 40,}
        }
       
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
    height: 55,
  },
  label:{
    color: 'red',
  }
});
