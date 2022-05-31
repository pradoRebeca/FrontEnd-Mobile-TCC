import React, { useState } from "react";
import { Image, StyleSheet, View, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputData from "../components/InputData";
import ButtonHome from "../components/ButtonHome";
import TitleScreen from "../components/TitleSreen";
import ButtonCancel from "../components/ButtonCancel";
import { showMessage, showToast } from "../Functions";
import axiosURL from "../API";

const EmailValidation = ({route}) => {
  const navigation = useNavigation();
  const [personalData, setPersonalData] = useState({
    email: route.params.email,
    codigo: "",
  });

  const next = () => {
    // axiosURL
    //   .post(`auth/verificar/codigo/candidato`, { 
    //     email: personalData.email,
    //     codigo: personalData.codigo
    //   })
    //   .then((response) => {
    //     console.log("reponse Auth", response.content);
    //     //navigation.navigate({ name: "Redefinicao de senha" });
    //   })
    //   .catch((error) => {
    //     console.log("error ao enviar codigo para o email => ", error);
    //     showMessage("Código incorreto");
    //   });
   navigation.navigate({ name: "Redefinicao de senha" });
  };

  const sendCode = () => {
     // axiosURL
    // .post(`auth/enviar/email`, {email: personalData.email})
    // .then((response) => {
    //   console.log('reponse AUth', response.content)
    //   showMessage("Novo código enviado");
    // })
    // .catch((error) => {
    //   console.log('error ao enviar codigo para o email => ', error)
    //   showMessage('Erro enviar email')
    // });
  };

  return (
    <SafeAreaView style={style.content}>
      <Image style={style.image} source={require("../img/logoLogin.png")} />

      <TitleScreen
        title="Validação de E-mail"
        descreption="Enviamos um código de verificação para ***. Insira o código para realizar a verificação."
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <InputData
          object={personalData}
          onChangeObject={setPersonalData}
          keyObject="codigo"
          label="Digite o código"
          nameIcon="lock"
          mode={true}
        />
      </View>

      <ButtonHome text="Proximo" functionClicked={next} />

      <ButtonCancel title="Enviar novo código" functionClicked={sendCode} />

      <Image
        style={style.imageWaveInferior}
        source={require("../img/waveInferior.png")}
      />
    </SafeAreaView>
  );
};

export default EmailValidation;

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
