import React, { useState } from "react";
import { Image, StyleSheet, View, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosURL from "../API";

import InputData from "../components/InputData";
import ButtonHome from "../components/ButtonHome";
import TitleScreen from "../components/TitleSreen";
import ButtonCancel from "../components/ButtonCancel";
import { showMessage, showToast } from "../Functions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [personalData, setPersonalData] = useState({
    email: "",
  });

  const next = () => {
    console.log('email => ', personalData.email)
    // axiosURL
    // .post(`auth/enviar/email`, {email: personalData.email})
    // .then((response) => {
    //   console.log('reponse AUth', response.content)
    //   showToast('Enviamos um email com o código')
    // })
    // .catch((error) => {
    //   console.log('error ao enviar codigo para o email => ', error)
    //   showMessage('Erro enviar email')
    // });

    navigation.navigate( "Validacao email",{ email: personalData.email});

   
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.content}>
      <Image style={style.image} source={require("../img/logoLogin.png")} />

      <TitleScreen
        title="Esqueci minha senha"
        descreption="Para redefinir a sua senha,informe o seu e-mail cadastrado em sua
            conta e lhe enviaremos um código para ser efeutado a troca."
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <InputData
          object={personalData}
          onChangeObject={setPersonalData}
          keyObject="email"
          label="Email"
          nameIcon="email"
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

export default ForgetPassword;

const style = StyleSheet.create({
  image: {
    height: 130,
    width: '100%',
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
 
  imageWaveInferior:{
 
      width: '100%',
  }
 
});
