import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  LogBox
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

import axiosURL from "../API";
import { AuthContext } from "../contexts/AuthContext";
import CardJobPreview from "../components/CardJobPreview";
import NotFound from "../components/NotFound";
import Filter from "../components/Filter";

const CandidateHome = ({ navigation }) => {
  const { idUser, user, reloadPage } = useContext(AuthContext);
  console.log("TELA DE CANDIDATEHOME");
  const [error, setError] = useState(false);
  const [displayReload, setDisplayReaload] = useState(true);
  const [job, setJob] = useState([]);
  const [reloadVagas, setRealoadVagas] = useState(true);
  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested", "Encountered two children with the same key", "Each child in a list should have a unique 'key' prop", "Picker has been extracted from react-native core and will be removed in a future release."]);
  }, []);

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

  return (
    <SafeAreaView >
      <StatusBar backgroundColor="#1E7596" />
      <View style={style.contentSearch}>
        <View style={style.contentViewSearch}>
          <TouchableOpacity
            style={style.search}
            onPress={() => navigation.navigate("Pesquisar")}
          >
            <Fontisto
              style={{ paddingRight: 14 }}
              name="search"
              color={"#7C7C7C"}
              size={17}
            />

            <Text style={style.textSearch}>Pesquisar...</Text>
          </TouchableOpacity>
          <View style={style.divisor}></View>
          <Filter />
        </View>
      </View>

      <View style={style.content}>
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

export default CandidateHome;

const style = StyleSheet.create({
  content: {
    // backgroundColor: "red",
    paddingBottom: 170,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentSearch: {
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#1E7596",
    // backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  contentViewSearch: {
    elevation: 2,
    paddingRight: 10,
    borderRadius: 10,
    height: 35,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  search: {
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    borderColor: "white",
    elevation: 0,
    width: "86%",
    paddingLeft: 15,
    height: 35,
  },
  textSearch: {
    color: "#7C7C7C",
    fontSize: 18,

    paddingLeft: 10,
  },
});
