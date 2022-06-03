import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import axiosURL from "../API";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

import CardJobPreview from "../components/CardJobPreview";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
// import { Searchbar } from "react-native-paper";

const Search = ({ navigation }) => {
  //id usuario
  const { idUser, user, reloadPage } = useContext(AuthContext);
  console.log("nome do usuario: ", reloadPage);

  const [textSearch, setTextSearch] = useState("");
  const [error, setError] = useState(false);
  const [displayReload, setDisplayReaload] = useState(true);
  const [job, setJob] = useState([]);
  const [reloadVagas, setRealoadVagas] = useState(true);
  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  useEffect(() => {
    // if (reloadVagas) {
      axiosURL
        .get(`vaga/listar/${idUser}`)
        .then((response) => {
          if (response.data.content.length != 0) {
            setJob(response.data.content.filter((item) => item.status == 1));
            console.log("com conteudo");
            setDisplayReaload(false);
            setError(false);
          } else {
            console.log("sem conteudo");
            setDisplayReaload(false);
            setError(true);
          }
        })
        .catch((error) => {
          console.log("erro ao buscar vagas sem relacao com o candidato");
          setDisplayReaload(false);
          setError(true);
        });
    // }
  }, [reloadPage]);

  const resultSearch = () => {
    axiosURL
      .get(`pesquisa/?palavra=${textSearch}`)
      .then((response) => {
        setJob(response.data.content);
        console.log(response.data.content);
        if (response.data.content.length != 0) {
          console.log("com conteudo");
          setDisplayReaload(false);
          setRealoadVagas(false);
          setError(false);
        } else {
          console.log("sem conteudo");
          setRealoadVagas(false);
          setDisplayReaload(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.log("erro ao pegar dados pela pesquisa => ", error);
        console.log("erro ao buscar vagas sem relacao com o candidato");
        setJob([]);
        setDisplayReaload(false);
        setError(true);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#1E7596" />
      <SearchBar onChangeText={setTextSearch} functionClicked={resultSearch} />
      <View
        style={
          error
            ? {
                ...style.content,
                justifyContent: "space-between",
              }
            : { ...style.content }
        }
      >
        {error && <NotFound />}
        <ActivityIndicator animating={displayReload} color={"#1E7596"} />

        {job && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={job}
            renderItem={(item) => (
              <CardJobPreview data={item.item} key={item.id} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const style = StyleSheet.create({
  content: {
    paddingBottom: 170,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
