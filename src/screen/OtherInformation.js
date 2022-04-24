import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { Dimensions } from "react-native";

import ModifyTitle from "../components/ModifyTitle";
import ButtonDeleteInformation from "../components/ButtonDeleteInformayion";
import InputData from "../components/InputData";
import Style from "../Style";
import ButtonSave from "../components/ButtonSave";
import { emptyField } from "../Functions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const windowHeightPorcent = Dimensions.get("window").height - 130;

const OtherInformation = () => {
  const [personalData, setPersonalData] = useState({
    information: "",
  });
  
  //EXECUTADA AO CLICAR NO BOTÃO 'SALVAR'
  const saveData = () => {
    if (emptyField(personalData.information)) {
      //METHOD PUT
      if (router.params.edit) {
        axios
          .put("", { personalData })
          .then((response) => {
            console.log("dados atualizados com sucesso");
            return true;
          })
          .catch((error) => {
            console.log("erro ao atualizar dados");
            return false;
          });
      } else {
        //METHOD POST
        axios
          .post("", { personalData })
          .then((response) => {
            console.log("dados cadastrados com sucesso");
            return true;
          })
          .catch((error) => {
            console.log("erro ao cadastrar dados");
            return false;
          });
      }
    } else {
      console.log("preencha o(s) campos");
      return false;
    }
  };


  //METHOD DELETE
  const deleteData = () => {
    console.log('otherInformations: ', 'dados deletados' )
  }

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Informações Adicionais" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <View style={style.candidateData}>
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="information"
              label="Trabalho com..."
              multiline={true}
            />
            <ButtonDeleteInformation functionClicked={deleteData}/>
          </View>
          <ButtonSave functionClicked={saveData} />
        </View>
      </ScrollView>
    </>
  );
};

export default OtherInformation;

const style = StyleSheet.create({
  container: {
    height: windowHeightPorcent,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  candidateData: {
    // backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
  },
});
