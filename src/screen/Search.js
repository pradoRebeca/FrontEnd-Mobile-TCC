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
  LogBox,
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
import PesquisarVaga from "../components/PesquisarVaga";
// import { Searchbar } from "react-native-paper";

const Search = ({ route }) => {
  const { idUser, user, reloadPage } = useContext(AuthContext);

  const [textSearch, setTextSearch] = useState("");
  const [error, setError] = useState(false);
  const [displayReload, setDisplayReaload] = useState(true);
  const [job, setJob] = useState([]);
  const [reloadVagas, setRealoadVagas] = useState(true);

  const { vagasFiltro } = route.params ?? [];

  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  //useEffect(() => {
  //  // if (reloadVagas) {
  //   axiosURL
  //      .get(`vaga/listar/${idUser}`)
  //      .then((response) => {
  //        if (response.data.content.length != 0) {
  //          setJob(response.data.content.filter((item) => item.status == 1));
  //          console.log("com conteudo");
  //          setDisplayReaload(false);
  //          setError(false);
  //        } else {
  //          console.log("sem conteudo");
  //          setDisplayReaload(false);
  //          setError(true);
  //        }
  //      })
  //      .catch((error) => {
  //       console.log("erro ao buscar vagas sem relacao com o candidato");
  //        setDisplayReaload(false);
  //        setError(true);
  //      });
  // }
  // }, [reloadPage]);

  useEffect(() => {
    if (vagasFiltro) {
      if (vagasFiltro.length != 0) {
        setJob(vagasFiltro);
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
    }

    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
      "Encountered two children with the same key",
      "Each child in a list should have a unique 'key' prop",
    ]);
  }, [vagasFiltro]);

  const resultSearch = () => {
    axiosURL
      .get(`pesquisa/?palavra=${textSearch}`)
      .then((response) => {
        setJob(response.data.content);
        console.log(response.data.content);
        if (response.data.content.length != 0) {
          setJob(response.data.content);
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

    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
      "Encountered two children with the same key",
      "Each child in a list should have a unique 'key' prop",
    ]);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#1E7596" />
      <SearchBar onChangeText={setTextSearch} functionClicked={resultSearch} />
      <View style={style.content}>
        {displayReload && <PesquisarVaga />}

        {error && <NotFound />}
        {/* <ActivityIndicator animating={displayReload} color={"#1E7596"} /> */}

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
    paddingTop: 20,
    width: "100%",
    display: "flex",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  flat: {
    paddingTop: 20,

    paddingBottom: 20,
  },
});
