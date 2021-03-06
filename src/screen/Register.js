import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import InputData from "../components/InputData";
import { emptyField, showMessage } from "../Functions";
//import { showMessage } from "../alerts/ShowMessage";
import ButtonHome from "../components/ButtonHome";
import axiosURL from "../API";
import TitleScreen from "../components/TitleSreen";

//GOOGLE COLOR rgb('#4285F4','#0DF9D58','#FAB400','#DB4437')

const Register = () => {
  const navigation = useNavigation();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [personalData, setPersonalData] = useState({
    nome: "",
    senha: "",
    confirmeSenha: "",
    email: "",
  });

  //METHOD POST
  const register = () => {
    if (
      emptyField(
        personalData.nome,
        personalData.email,
        personalData.senha,
        personalData.confirmeSenha
      )
    ) {
      if (personalData.senha !== personalData.confirmeSenha) {
        showMessage("As senhas devem ser iguais.");
      } else {
        axiosURL
          .post("candidato/cadastrar", {
            nome: personalData.nome,
            senha: personalData.senha,
            email: personalData.email,
            genero: "PREFIRO_NAO_INFORMAR",
          })
          .then((response) => navigation.navigate({ name: "Login" }))
          .catch(() => showMessage("Erro ao cadastrar, tente novamente."));
      }
    } else {
      showMessage("Preencha todos os campos.");
      console.log("preencha TODOS  OS CAMPOS");
    }
  };

  return (
    <SafeAreaView style={style.content}>
      <ScrollView>
        <Image
          style={style.imageLogo}
          source={require("../img/logoLogin.png")}
        />

        <TitleScreen title="Cadastre-se" />
        <View
          style={{
            width: "100%",
            paddingLeft: "8%",
            paddingRight: "10%",
            marginTop: 30,
          }}
        >
          <InputData
            object={personalData}
            onChangeObject={setPersonalData}
            keyObject="nome"
            label="Nome"
            nameIcon="account"
            mode={true}
          />

          <InputData
            object={personalData}
            onChangeObject={setPersonalData}
            keyObject="email"
            label="Email"
            nameIcon="email"
            mode={true}
          />

          <InputData
            object={personalData}
            onChangeObject={setPersonalData}
            keyObject="senha"
            label="Senha"
            nameIcon="lock"
            security={true}
            mode={true}
          />

          <InputData
            object={personalData}
            onChangeObject={setPersonalData}
            keyObject="confirmeSenha"
            label="Confirme a senha"
            security={true}
            nameIcon="lock"
            mode={true}
          />
        </View>

        <View style={style.buttonContent}>
          <ButtonHome
            text="Cadastrar"
            functionClicked={register}
            nameScreen="CandidateHome"
          />
        </View>

        {/* <Image
          style={style.imageWaveInferior}
          source={require("../img/waveInferior.png")}
        /> */}
      </ScrollView>

      {/* cadastrar com o google */}
      {/*  <Text style={style.text}>OU CADASTRE-SE COM</Text>

         <TouchableOpacity
            accessible={true}
            accessibilityHint="Fazer o cadastro com a conta do google"
            accessibilityLabel="Cadastrar-se com o google "
          >
            <View style={{ ...style.viewButtonGoogle }}>
              <FontAwesome name="google" size={18} color="#225E77" />
              <Text style={{ ...style.titleButtonGoogle }}>
                Entrar com Google
              </Text>
            </View>
          </TouchableOpacity>
 */}
    </SafeAreaView>
  );
};

export default Register;

const style = StyleSheet.create({
  imageLogo: {
    maxHeight: 130,
    width: "100%",
  },
  imageWaveInferior: {
    top: 0,
    bottom: 80,
    height: 80,
    width: "100%",
  },
  titleScreen: {
    color: "#225E77",
    fontSize: 40,
    letterSpacing: 3,
    marginBottom: 40,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  viewButton: {
    height: 50,
    width: 300,
    backgroundColor: "#225E77",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 30,
  },
  titleButton: {
    color: "white",
    fontSize: 24,
    letterSpacing: 1,
    fontWeight: "500",
  },
  text: {
    marginBottom: 5,
    color: "#225E77",
    fontSize: 14,
  },
  viewButtonGoogle: {
    height: 40,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "#225E77",
    borderWidth: 2,
  },
  titleButtonGoogle: {
    marginLeft: 15,
    color: "#225E77",
    fontSize: 13,
  },
  buttonContent: {
    marginTop: 15,
    paddingLeft: "8%",
    paddingRight: "8%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
