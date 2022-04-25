import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import axios from "axios";

import ButtonDeleteInformation from "../components/ButtonDeleteInformayion";
import ModifyTitle from "../components/ModifyTitle";
import InputData from "../components/InputData";
import ButtonSave from "../components/ButtonSave";
import { emptyField } from "../Functions";
import InputCalendar from "../components/InputCalendar";
import axiosURL from "../API";

const ProfissionalExperience = ({ route }) => {
  const edit = route.params.edit;
  const id = route.params.id;

  const [personalData, setPersonalData] = useState({
    id: "",
    cargo: "",
    dataInicio: "",
    dataSaida: "",
    atribuicoes: "",
    nomeEmpresa: "",
  });

  //EXECUTADA AO CLICAR NO BOTÃO 'SALVAR'
  const saveData = () => {
    if (
      emptyField(personalData.cargo) ||
      emptyField(personalData.dataInicio) ||
      emptyField(personalData.dataFim) ||
      emptyField(personalData.atribuicoes) ||
      emptyField(personalData.nomeEmpresa)
    ) {
      //METHOD PUT
      if (edit) {
        axiosURL
          .put(`candidato/atualizar/experiencia/${1}`, {
            cargo: personalData.cargo,
            dataInicio: personalData.dataInicio,
            dataSaida: personalData.dataSaida,
            atribuicoes: personalData.atribuicoes,
            nomeEmpresa: personalData.nomeEmpresa,
          })
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
        axiosURL
          .post(`candidato/cadastrar/experiencia/${1}`, {
            cargo: personalData.cargo,
            dataInicio: personalData.dataInicio,
            dataSaida: personalData.dataFim,
            atribuicoes: personalData.atribuicoes,
            nomeEmpresa: personalData.nomeEmpresa,
          })
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
      console.log("preencha algum campo");
      return false;
    }
  };
  // console.log("professionalExperience: ", id);

  //METHOD GET
  useEffect(() => {
    if (edit) {
      axiosURL
        .get(`candidato/listar/experiencia/${1}`)
        .then((response) => {
          setPersonalData({ ...response.data.content[0]});
          return true;
        })
        .catch((error) => {
          console.log("erro ao pegar dados");
          return false;
        });
    }
  }, [edit]);

  //METHOD DELETE
  const deleteData = () => {
    axiosURL
      .delete(`candidato/deletar/experiencia/${1}`)
      .then((response) => {
        console.log("dados deletados com sucesso");
        return true;
      })
      .catch((error) => {
        console.log("erro ao deletar dados");
        return false;
      });
  };

  console.log("professionalExperience: ", personalData);
  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Experiencia Profissional" />
      <ScrollView>
        <View style={style.container}>
          <View style={style.candidateData}>
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.nomeEmpresa}
              keyObject="nomeEmpresa"
              label="Empresa"
            />
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.cargo}
              keyObject="cargo"
              label="Cargo"
            />
            <InputData
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.atribuicoes}
              keyObject="atribuicoes"
              label="Descrição"
              nameIcon="calendar"
            />

            <InputCalendar
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.dataSaida}
              keyObject="dataSaida"
              label="Data de Saída"
            />
            <InputCalendar
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.dataInicio}
              keyObject="dataInicio"
              label="Data de Inicio"
            />
            {/* <Calendar/> */}

            {edit && <ButtonDeleteInformation functionClicked={deleteData} />}
          </View>
          <ButtonSave functionClicked={saveData} />
        </View>
      </ScrollView>
    </>
  );
};

export default ProfissionalExperience;

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    height: "100%",
    // flex: 1,
    padding: 10,
  },
  candidateData: {
    // flex: 1,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
  },
});
