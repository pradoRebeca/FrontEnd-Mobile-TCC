import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";

import ModifyTitle from "../components/ModifyTitle";
import InputData from "../components/InputData";
import Style from "../Style";
import CheckboxComponent from "../components/CheckBox";
import ButtonSave from "../components/ButtonSave";
import { emptyField, showMessage, showToast } from "../Functions";
import InputCalendar from "../components/InputCalendar";
import axiosURL from "../API";
import { AuthContext } from "../contexts/AuthContext";
import ImageView from "../components/ImageView";
import SelectGenero from "../components/SelectGenero";
import Deficiencias from "./Deficiencias";

const genero = [
  "Selecione um Genero",
  "Prefiro nao Informar",
  "Masculino",
  "Feminino",
  "Binario",
];

const def = [
  {
    id: 1,
    tipo: "AUDITIVA",
  },
  {
    id: 2,
    tipo: "VISUAL",
  },
  {
    id: 3,
    tipo: "MOTORA",
  },
  {
    id: 4,
    tipo: "INTELECTUAL",
  },
  {
    id: 5,
    tipo: "INTELECTUAL",
  },
];

const RegisterPersonalData = ({ route }) => {
  const { idUser } = useContext(AuthContext);
  const edit = true;
  const id = route.params.id;

  const [imageProfile, setImageProfile] = useState('')
  const [idCheckbox, setIdCheckbox] = useState([]);
  const [stateCheckbox, setStateCheckbox] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [personalData, setPersonalData] = useState({
    id: "",
    nome: "",
    nomeSocial: "",
    deficiencia: "",
    genero: "",
    dataNascimento: null,
    informacoes: "",
    email: "",
    emailRecuperacao: "",
    telefone: "",
    outroTelefone: "",
  });

  const arrayFinal = () => {
    let array = [];
    for (let i = 0; i < stateCheckbox.length; i++) {
      if (stateCheckbox[i]) {
        console.log(stateCheckbox[i], idCheckbox[i]);
        let result = array.push(idCheckbox[i]);
      }
    }

    return array;
  };

  //METODO GET DEFICIENCIAS
  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}deficiencia/listar/tipo`)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log("erro ao pegar dados de deficiencia");
  //       return false;
  //     });
  // }, []);

  //VALIDAÇÃO DE CAMPO OBRIGATÓRIO
  // useEffect(() => {
  //   if (
  //     emptyField(
  //       personalData.nome,
  //       personalData.email,
  //       personalData.emailRecuperacao,
  //       personalData.telefone
  //     )
  //   ) {
  //     // setButtonDisabled(false);
  //   } else {
  //     // setButtonDisabled(true);
  //   }
  // }, [personalData]);

  //METHOD PUT
  const saveData = () => {
    console.log("valor : ", arrayFinal());
    console.log(personalData);
    if (
      emptyField(
        personalData.nome,
        personalData.email,
        personalData.emailRecuperacao,
        personalData.telefone
      )
    ) {
      axiosURL
        .put(`candidato/atualizar/${idUser}`, {
          id: 1,
          nome: personalData.nome,
          nomeSocial: personalData.nomeSocial,
          genero: "MASCULINO",
          deficiencia: arrayFinal(),
          dataNascimento: personalData.dataNascimento,
          email: [personalData.email, personalData.emailRecuperacao],
          telefone: [personalData.telefone, personalData.outroTelefone],
        })
        .then((response) => {
          showToast("Dados atualizados com sucesso.");
          console.log(
            "registerPersonalData: ",
            "dados ATUALIZADOS com sucesso"
          );
          return true;
        })
        .catch((error) => {
          showMessage("Erro ao atualizar, tente novamente.");
          console.log("registerPersonalData: ", "erro ao ATUALIZAR dados");
        });
    } else {
      showMessage("Preencha os campos obrigatórios");
    }
  };

  //METHOD GET
  useEffect(() => {
    if (edit) {
      axiosURL
        .get(`candidato/buscar/${1}`)
        .then((response) => {
          console.log(response.data);
          const email = response.data.email[0].email;
          let emailRecuperacao = response.data ? response.data.email[1] : "";
          let telefone = response.data.telefone
            ? response.data.telefone[0].numero
            : "";
          let outroTelefone = response.data.telefone
            ? response.data.telefone[1].numero
            : "";

          setPersonalData({
            ...response.data,
            experiencia: [],
            curso: [],
            telefone: telefone,
            outroTelefone: outroTelefone,
            email: email,
            emailRecuperacao: emailRecuperacao,
            deficiencia: [],
          });
        })
        .catch((error) => {
          console.log("erro ao pegar dados de finformacoes pessoais");
          console.log(error);
          return false;
        });
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Informações Pessoais" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <KeyboardAvoidingView
            contentContainerStyle={Style.registerCandidateData}
            behavior="position"
            enabled
          >
            <ImageView functionImage={setImageProfile}/>
{/* 
            <CheckboxComponent
              data={def}
              type="Deficiencia"
              text="Tipo de Deficiencias"
              idCheckbox={setIdCheckbox}
              stateCheckbox={setStateCheckbox}
              // object={personalData}
              // onChangeObject={setPersonalData}
              // keyObject="deficiencia"
            /> */}

            

            <Deficiencias/>

            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="nome"
              label="Nome"
              valueDefault={personalData.nome}
              required={true}
            />
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.nomeSocial}
              keyObject="nomeSocial"
              label="Nome Social"
              massageError="Email"
            />
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.email}
              keyObject="email"
              label="E-mail"
              massageError="Email"
              required={true}
            />
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.emailRecuperacao}
              keyObject="emailRecuperacao"
              label="E-mail de Recuperação"
              massageError="Email"
              required={true}
            />
            {/* <Select data={genero} /> */}

            <InputCalendar
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.dataNascimento}
              keyObject="dataNascimento"
              label="Data de Nascimento"
            />

            <SelectGenero/>
            <InputData
              object={personalData}
              valueDefault={personalData.telefone}
              onChangeObject={setPersonalData}
              keyObject="telefone"
              label="Primeiro telefone"
              massageError="Email"
              required={true}
            />

            <InputData
              object={personalData}
              valueDefault={personalData.outroTelefone}
              onChangeObject={setPersonalData}
              keyObject="outroTelefone"
              label="Segundo telefone"
              massageError="Email"
            />

            {/* <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="foto"
              label="Foto"
              massageError="Email"
            /> */}

            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="curriculo"
              label="curriculo"
              massageError="Email"
            />
          </KeyboardAvoidingView>
          <ButtonSave functionClicked={saveData} />
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterPersonalData;

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  candidateData: {
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
