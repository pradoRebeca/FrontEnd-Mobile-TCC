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
import { listState, emptyField, showMessage } from "../Functions";
import Deficiencias from "./Deficiencias";
import SelectSuporte from "../components/SelectSuporte";

const salario = [
  {
    id: 1,
    valor: "Indiferente",
  },
  {
    id: 2,
    valor: "Acima de R$ 1.000,00",
  },
  {
    id: 3,
    valor: "Acima de R$ 2.000,00",
  },
  {
    id: 4,
    valor: "Acima de R$ 3.000,00",
  },
  {
    id: 5,
    valor: "Acima de R$ 4.000,00",
  },
  {
    id: 6,
    valor: "Acima de R$ 5.000,00",
  },
];

const Filter = ({ route, navigation }) => {
  const [estado, setEstado] = useState([]);
  const [suporte, setSuporte] = useState([]);
  const [tipoDeficiencia, setTipoDeficiencia] = useState([]);
  const [deficiencia, setDeficiencia] = useState([]);
  const [cidade, setCidade] = useState([]);

  //ID'S FILTRO
  const [idSalario, setIdSalario] = useState();
  const [idTipoDeficiencia, setIdTipoDeficiencia] = useState();
  const [idDeficiencia, setIdDeficiencia] = useState();
  const [idEstado, setIdEstado] = useState();
  const [idCidade, setIdCidade] = useState();
  const [idSuporte, setIdSuporte] = useState();

  const [vagasComFiltro, setVagasComFiltro] = useState([]);

  useEffect(() => {
    //GET ESTADOS
    axiosURL
      .get(`pesquisa/estado`)
      .then((response) => {
        setEstado(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de estado => ", error);
      });

    //GET SUPORTE
    axiosURL
      .get(`vaga/listar/suporte`)
      .then((response) => {
        setSuporte(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de suporte=> ", error);
      });

    //GET TIPO DEFICIENCIA
    axiosURL
      .get(`deficiencia/listar/tipo`)
      .then((response) => {
        setTipoDeficiencia(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de suporte=> ", error);
      });
  }, []);

  //GET DEFICIENCIAS
  useEffect(() => {
    axiosURL
      .get(`deficiencia/listar/${idTipoDeficiencia}`)
      .then((response) => {
        setDeficiencia(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {});
  }, [idTipoDeficiencia]);

  //GET CIDADE
  useEffect(() => {
    axiosURL
      .get(`pesquisa/cidade/${idEstado}`)
      .then((response) => {
        setCidade(response.data.content);
      })
      .catch((error) => {
        console.log("erro ao pegar dados de cidade=> ", error);
      });
  }, [idEstado]);

  const verificarItens = () => {
    let urlBaseFiltragem = "vaga/listar?";

    if (idEstado) {
      urlBaseFiltragem = urlBaseFiltragem + `&idEstado=${idEstado}`;
      if (idSuporte) {
        urlBaseFiltragem = urlBaseFiltragem + `&idSuporte=${idSuporte}`;
        if (idDeficiencia) {
          urlBaseFiltragem =
            urlBaseFiltragem + `&idDeficiencia=${idDeficiencia}`;
          if (idSuporte) {
            urlBaseFiltragem = urlBaseFiltragem + `&idSuporte=${idSuporte}`;
            if (idCidade) {
              urlBaseFiltragem = urlBaseFiltragem + `&idCidade=${idCidade}`;
            }
          }
        }
      }
    }

    return urlBaseFiltragem;
  };

  const functionFilterData = () => {
    const url = verificarItens();
    axiosURL
      .get(`${url}`)
      .then((response) => {
        setVagasComFiltro(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        showMessage("Houve algum erro ao filtrar as vagas. Tente novamente.");
        console.log("erro ao pegar dados do filtro=> ", error);
      });
  };

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Filtro de Vagas" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <View style={Style.registerCandidateData}>
            <Text style={style.titleSection}>Tipos de Deficiência</Text>
            <SelectSuporte
              data={tipoDeficiencia}
              onChange={setIdTipoDeficiencia}
              nameKey="tipo"
            />

            <Text style={style.titleSection}>Deficiência</Text>
            <SelectSuporte
              data={deficiencia}
              onChange={setIdDeficiencia}
              nameKey="deficiencia"
              // disabled={idTipoDeficiencia? false : true}
            />

            <Text style={style.titleSection}>Estado</Text>
            <SelectSuporte
              data={estado}
              nameKey="sigla"
              onChange={setIdEstado}
            />

            <Text style={style.titleSection}>Cidade</Text>
            <SelectSuporte
              data={cidade}
              nameKey="cidade"
              onChange={setIdCidade}
            />

            <Text style={style.titleSection}>Suporte Oferecido</Text>
            <SelectSuporte
              data={suporte}
              nameKey="nome"
              onChange={setIdSuporte}
            />

            <Text style={style.titleSection}>Salário</Text>
            <SelectSuporte
              data={salario}
              nameKey="valor"
              onChange={setIdSalario}
            />
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
