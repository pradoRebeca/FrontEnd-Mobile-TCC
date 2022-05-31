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

const Filter = ({ route }) => {
  const edit = true;

  const state = listState();
  const [adressAPI, setAdressAPI] = useState([]);
  const [adressTyped, setAdressTyped] = useState({
    rua: "",
    estado: "",
    cidade: "",
    suporte: "",
    salario: "",
  });

  const [checkBoxDeficiencia, setCheckboxDeficiencia] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [deficiencies, setDeficiencies] = useState([]);
  const [filterData, setPersonalData] = useState({});

  useEffect(() => {

  }, [filterData]);

  //METHOD PUT
  const functionFilterData = () => {

  };

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <KeyboardAvoidingView
            contentContainerStyle={Style.registerCandidateData}
            behavior="position"
            enabled
          >
            <Text style={style.titleSection}>Deficiencia</Text>
            <CheckboxComponent
              data={def}
              type="Deficiencia"
              // text="Tipo de Deficiencias"
            />
            <Text  style={style.titleSection}>Região</Text>
            {/* <Select
              data={state}
              keyObject={"sigla"}
              // object={adressTyped}
              // onChangeObject={setAdressTyped}
              // valueAPI={adressAPI.uf}
            />
              <Select
              data={state}
              keyObject={"sigla"}
              // object={adressTyped}
              // onChangeObject={setAdressTyped}
              // valueAPI={adressAPI.uf}
            /> */}

            <Text  style={style.titleSection}>Suporte Oferecido</Text>
            {/* <Select
              data={state}
              keyObject={"sigla"}
              // object={adressTyped}
              // onChangeObject={setAdressTyped}
              // valueAPI={adressAPI.uf}
            /> */}

            <Text  style={style.titleSection}>Salário</Text>
            {/* <Select
              data={state}
              keyObject={"sigla"}
              // object={adressTyped}
              // onChangeObject={setAdressTyped}
              // valueAPI={adressAPI.uf}
            /> */}
          </KeyboardAvoidingView>
          <ButtonSave disabled={false} mode='filter' functionClicked={functionFilterData} />
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
