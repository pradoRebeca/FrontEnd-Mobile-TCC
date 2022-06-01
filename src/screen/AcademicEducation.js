import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import ModifyTitle from "../components/ModifyTitle";
import Select from "../components/Select";
import ButtonDeleteInformation from "../components/ButtonDeleteInformayion";
import Style from "../Style";
import ButtonSave from "../components/ButtonSave";
import { emptyField, hasId, showMessage, showToast } from "../Functions";
import SelectFormation from "../components/SelectFormation";
import axiosURL from "../API";


const AcademicEducation = ({ route }) => {
  const {idUser} = useContext(AuthContext)
  const visible = route.params.edit;
  const id = route.params.id;

  const navigation = useNavigation();

  const [educationName, setEducationName] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);
  const [educationType, setEducationType] = useState([]);

  const [personalData, setPersonalData] = useState({
    idCandidato: "",
    curso: "",
    idNivelCurso: "",
    areaAtuacao: "",
    nivel: "",
    idArea: "",
    id: "",
  });

  //consumindo APIs de cursos
  useEffect(() => {
    axiosURL
      .get(`curso/area/listar`)
      .then((response) => setEducationType(response.data))
      .catch(() => console.log("api de area de atuacao não está respondendo"));

      axiosURL
      .get(`curso/nivel/listar`)
      .then((response) => setEducationLevel(response.data))
      .catch(() => console.log("api de nivel de cursos não está respondendo"));
  }, []);

  //consumindo APIs de nome de cursos após selecionar um curso
  useEffect(() => {
    axiosURL
      .get(
        `curso/listar?areaAtuacao=${personalData.areaAtuacao}&nivel=${personalData.nivel}`
      )
      .then((response) => setEducationName(response.data))
      .catch(() =>
        console.log(
          "api de nivel de cursos (depois de selecionar area de curso) não está respondendo"
        )
      );
  }, [personalData.areaAtuacao || personalData.nivel]);

  const saveData = () => {
    //METHOD POST
    if (!hasId(personalData)) {
      axiosURL
        .post(`candidato/cadastrar/curso/${idUser}`, {
          curso: personalData.curso,
        })
        .then((response) => {
          showToast("Dados cadastrados com sucesso.");
          navigation.navigate('Perfil', {reload: 1})
          console.log("dados de formacao academica cadastrados com sucesso");
          return true;
        })
        .catch((error) => {
          showMessage("Erro ao cadastrar os dados, tente novamente.");
          console.log("erro ao cadastrar dados  de formacao academica");
          return false;
        });
    } else {
      showMessage("Preencha todos os campos com dados validos.");
      console.log("dados incorretos");
    }
  };

  //METHOD GET
  useEffect(() => {
    if (visible) {
      axiosURL
        .get(`candidato/buscar/${idUser}`)
        .then((response) => {
          var responseCurso = response.data.curso;

          setPersonalData({ ...personalData, ...responseCurso });
          console.log("AcademicEducation: ", personalData);
          return true;
        })
        .catch((error) => {
          console.log("erro ao pegar dados de formacao academica");
          return false;
        });
    }
  }, []);

  //METHOD DELETE
  const deleteData = () => {
    axiosURL
      .delete(`candidato/deletar/curso/${id}`)
      .then((response) => {
        showMessage("Dados deletados com sucesso.");
        navigation.navigate('Perfil', {reload: 1})
        console.log("dados deletados com sucesso");
        return true;
      })
      .catch((error) => {
        showMessage("Erro ao deletar os dados.");
        console.log("erro ao deletar dados");
        return false;
      });
  };

  return (
    <View style={Style.container}>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Formaçao Acadêmica" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <View style={Style.registerCandidateData}>
            <SelectFormation
              data={educationLevel.content}
              type="nivel"
              keyObject="nivel"
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefult={personalData.nivel}
              edit={visible}
            />
            <SelectFormation
              data={educationType.content}
              type="areaAtuacao"
              keyObject="areaAtuacao"
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefult={personalData.areaAtuacao}
              edit={visible}
            />
            <SelectFormation
              data={educationName.content}
              type="curso"
              keyObject="curso"
              object={personalData}
              onChangeObject={setPersonalData}
              valueDefult={personalData.curso}
              edit={visible}
            />
            {visible && (
              <ButtonDeleteInformation functionClicked={deleteData} />
            )}
          </View>
          {!visible && <ButtonSave functionClicked={saveData} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default AcademicEducation;

const style = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  candidateData: {
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
  },
});
