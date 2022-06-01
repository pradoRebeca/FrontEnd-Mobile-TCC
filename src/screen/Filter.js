import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, ScrollView, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";

import ModifyTitle from "../components/ModifyTitle";
import Select from "../components/Select";

import Style from "../Style";
import { Checkbox } from "react-native-paper";
import CheckboxComponent from "../components/CheckBox";
import ButtonSave from "../components/ButtonSave";

import axiosURL from "../API";
import { listState, emptyField } from "../Functions";
import Deficiencias from "./Deficiencias";
import SelectSuporte from "../components/SelectSuporte";

// const genero = [
//   "Selecione um Genero",
//   "Prefiro nao Informar",
//   "Masculino",
//   "Feminino",
//   "Binario",
// ];

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

const Filter = ({ route }) => {
  const [estado, setEstado] = useState([]);
  const [suporte, setSuporte] = useState([]);
  const [tipoDeficiencia, setTipoDeficiencia] = useState([]);
  const [deficiencia, setDeficiencia] = useState([]);

  const [filterData, setPersonalData] = useState({});


const [idTipoDeficiencia, setIdTipoDeficiencia] = useState(0)

  useEffect(() => {
    //GET ESTADOS
    axiosURL
      .get(`pesquisa/estado`)
      .then((response) => {
        setEstado(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de estado => ", error);
      });

    //GET SUPORTE
    axiosURL
      .get(`vaga/listar/suporte`)
      .then((response) => {
        setSuporte(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de suporte=> ", error);
      });

    //GET TIPO DEFICIENCIA
    axiosURL
      .get(`deficiencia/listar/tipo`)
      .then((response) => {
        setTipoDeficiencia(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de suporte=> ", error);
      });
  }, []);

  useEffect(() => {
    axiosURL
      .get(`deficiencia/listar/${idTipoDeficiencia}`)
      .then((response) => {
        setDeficiencia(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de suporte=> ", error);
      });
  }, [tipoDeficiencia]);

  const functionFilterData = () => {};

  console.log(idTipoDeficiencia)
  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <View style={Style.registerCandidateData}>
            <Text style={style.titleSection}>Tipos de Deficiência</Text>
            <SelectSuporte data={tipoDeficiencia} onChange={setTipoDeficiencia} nameKey="tipo" />

            <Text style={style.titleSection}>Deficiência</Text>
            <SelectSuporte data={deficiencia} onChange={setIdTipoDeficiencia} nameKey="deficiencia" />

            <Text style={style.titleSection}>Região</Text>
            {/* <SelectSuporte data={cidade} nameKey="nome" /> */}

            <Text style={style.titleSection}>Suporte Oferecido</Text>
            <SelectSuporte data={suporte} nameKey="nome" />

            <Text style={style.titleSection}>Salário</Text>
          </View>
          <ButtonSave
            disabled={false}
            mode="filter"
            functionClicked={functionFilterData}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Filter;

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
  titleSection: {
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
    minHeight: 10,
    fontSize: 16,
    // backgroundColor: "yellow",
  },
});
