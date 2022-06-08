import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import ButtonDeleteInformation from "../components/ButtonDeleteInformayion";
import ModifyTitle from "../components/ModifyTitle";
import InputData from "../components/InputData";
import ButtonSave from "../components/ButtonSave";
import { emptyField, showMessage, showToast } from "../Functions";
import InputCalendar from "../components/InputCalendar";
import axiosURL from "../API";

const ProfissionalExperience = ({ route }) => {
  const { idUser, setPutInfoProfile } = useContext(AuthContext);
  const navigation = useNavigation();
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
          .put(`candidato/atualizar/experiencia/${id}`, {
            cargo: personalData.cargo,
            dataInicio: personalData.dataInicio,
            dataSaida: personalData.dataSaida,
            atribuicoes: personalData.atribuicoes,
            nomeEmpresa: personalData.nomeEmpresa
          })
          .then((response) => {
            setPutInfoProfile(245)
            showToast("Dados atualizados com sucesso");
            console.log("dados atualizados com sucesso");
            navigation.navigate("Perfil", { reloadEdit: 1 });
            return true;
          })
          .catch((error) => {
            console.log(error)
          
            showMessage("Erro ao atualizar dados");
            console.log("erro ao atualizar dados");
            return false;
          });
      } else {
        //  METHOD POST
        axiosURL
          .post(`candidato/cadastrar/experiencia/${idUser}`, {
            cargo: personalData.cargo,
            dataInicio: personalData.dataInicio,
            dataSaida: personalData.dataSaida,
            atribuicoes: personalData.atribuicoes,
            nomeEmpresa: personalData.nomeEmpresa
          })
          .then((response) => {
            setPutInfoProfile(2)
            showToast("Dados cadastrados com sucesso");
            console.log("dados cadastrados com sucesso");
            console.log(response.status);
            navigation.navigate("Perfil", { reloadPost: 1 });
            return true;
          })
          .catch((error) => {
            showMessage("Erro ao cadastrar os dados. Tente novamente.");
            console.log("erro ao cadastrar dados");
            return false;
          });
      }
    } else {
      showMessage("Preencha algum campo.");
      console.log("preencha algum campo");
      return false;
    }
  };
  // console.log("professionalExperience: ", id);

  //METHOD GET
  useEffect(() => {
    if (edit) {
      axiosURL
        .get(`candidato/listar/experiencia/${idUser}`)
        .then((response) => {
          const dataResponse = response.data.content.filter(
            (item) => item.id === id
          );
          setPersonalData(dataResponse[0]);
          return true;
        })
        .catch((error) => {
          console.log("erro ao pegar dados");
          return false;
        });
    }
  }, [edit]);

  // console.log(personalData)

  //METHOD DELETE
  const deleteData = () => {
    axiosURL
      .delete(`candidato/deletar/experiencia/${id}`)
      .then((response) => {
        showToast("Dados deletados com sucesso");
        console.log("dados deletados com sucesso");
        navigation.navigate("Perfil", { reload: 1 });
        return true;
      })
      .catch((error) => {
        showMessage("Erro ao deletar os dados. Tente novamente.");
        console.log("erro ao deletar dados");
        return false;
      });
  };

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Experiência Profissional" />
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
              valueDefault={personalData.dataInicio}
              keyObject="dataInicio"
              label="Data de Início"
            />

            <InputCalendar
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefault={personalData.dataSaida}
              keyObject="dataSaida"
              label="Data de Saída"
            />
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
    // flex: 1,
    // backgroundColor: 'blue',
    // height: "100%",
    display: "flex",
    justifyContent: "space-between",
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
