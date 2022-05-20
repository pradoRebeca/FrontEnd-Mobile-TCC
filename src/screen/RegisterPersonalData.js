import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";

import ModifyTitle from "../components/ModifyTitle";
import Select from "../components/Select";
import InputData from "../components/InputData";
import Style from "../Style";
import { Checkbox } from "react-native-paper";
import CheckboxComponent from "../components/CheckBox";
import ButtonSave from "../components/ButtonSave";
import { emptyField, showMessage } from "../Functions";
import InputCalendar from "../components/InputCalendar";
import axiosURL from "../API";

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
  const edit = true;
  const id = route.params.id;

  const [idCheckbox, setIdCheckbox] = useState([]);
  const [stateCheckbox, setStateCheckbox] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [personalData, setPersonalData] = useState({
    id: "",
    nome: "",
    nomeSocial: "",
    deficiencia: '',
    genero: "",
    dataNascimento: null,
    informacoes: "",
    email: "",
    emailRecuperacao: "",
    telefone: "",
    outroTelefone: "",
  });

  const arrayFinal = () => {
    let array = []
    for(let i = 0 ; i < stateCheckbox.length ; i++ ){
      if(stateCheckbox[i]){
        console.log(stateCheckbox[i], idCheckbox[i] )
    
       let result = array.push(idCheckbox[i]) 
      
      
      }
    }

    return array;
  }

  //METOGO GET DEFICIENCIAS
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
  useEffect(() => {
    if (
      emptyField(
        personalData.nome,
        personalData.email,
        personalData.emailRecuperacao,
        personalData.telefone
      )
    ) {
      // setButtonDisabled(false);
    } else {
      // setButtonDisabled(true);
    }
  }, [personalData]);

  //METHOD PUT
  const saveData = () => {
  
    console.log('valor : ',   arrayFinal())

    if (
      emptyField(
        personalData.nome,
        personalData.email,
        personalData.emailRecuperacao,
        personalData.telefone
      )
    ) {
      axiosURL
        .put(`candidato/buscar/${1}`, {
          id: "",
          nome: "",
          nomeSocial: "",
          genero: "",
          dataNascimento: "",
          informacoes: "",
        })
        .then((response) => {
          showMessage("Dados atualizados com sucesso.");
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

  //console.log("registerPersonalData: ", personalData);
  //METHOD GET
  useEffect(() => {
    if (edit) {
     
      axiosURL
        .get(`candidato/buscar/${1}`)
        .then((response) => {
          const email = response.data.email[0].email;
          let emailRecuperacao = response.data.email[1] ?? "";
          let telefone = response.data.telefone[0] ?? "";
          let outroTelefone = response.data.telefone[1] ?? "";

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
            <CheckboxComponent
              data={def}
              type="Deficiencia"
              text="Tipo de Deficiencias"
              idCheckbox={setIdCheckbox}
              stateCheckbox={setStateCheckbox}
              // object={personalData}
              // onChangeObject={setPersonalData}
              // keyObject="deficiencia"

            />

            {/* <CheckboxComponent
              data={def}
              type="Deficiencia"
              text="Deficiencias"
            /> */}

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
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="telefone"
              label="Telefone"
              massageError="Email"
              required={true}
            />

            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              keyObject="outroTelefone"
              label="Telefone 2"
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
