import React, { useState } from "react";
import { Image, StyleSheet, View, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputData from "../components/InputData";
import ButtonHome from "../components/ButtonHome";
import TitleScreen from "../components/TitleSreen";
import ButtonCancel from "../components/ButtonCancel";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RedefinePassword = () => {
  const navigation = useNavigation();
  const [personalData, setPersonalData] = useState({
    senha: "",
    senhaConfirmacao: "",
  });

  const next = () => {
    navigation.navigate({ name: "CandidateHome" });
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.content}>
      <Image style={style.image} source={require("../img/logoLogin.png")} />

      <TitleScreen
        title="Redefinção de Senha"
        descreption="Após fazer a verificação do seu e-mail
       Insira uma nova senha para efetuar a renovação "
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <InputData
          object={personalData}
          onChangeObject={setPersonalData}
          keyObject="senha"
          label="Digite a nova senha"
          nameIcon="lock"
          mode={true}
        />
        <InputData
          object={personalData}
          onChangeObject={setPersonalData}
          keyObject="senhaConfimarcao"
          label="Digite a senha novamente"
          nameIcon="reload"
          mode={true}
        />
      </View>

      <ButtonHome text="Proximo" functionClicked={next} />

      <ButtonCancel title="Cancelar" functionClicked={back} />

      <Image
        style={style.imageWaveInferior}
        source={require("../img/waveInferior.png")}
      />
    </SafeAreaView>
  );
};

export default RedefinePassword;

const style = StyleSheet.create({
  image: {
    height: 130,
    width: "100%",
  },
  content: {
    width: "100%",

    //   paddingLeft: 50,
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // alignItens: "center",
  },

  imageWaveInferior: {
    height: 60,
    width: "100%",
  },
});
