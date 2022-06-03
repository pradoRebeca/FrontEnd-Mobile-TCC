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
  SafeAreaView
} from "react-native";
import axiosURL from "../API";
import { AuthContext } from "../contexts/AuthContext";
import CardJobPreview from "../components/CardJobPreview";
import NotFound from "../components/NotFound";

const CandidateHome = ({navigation}) => {
  console.log("tela CANDIDATEHOME");
  //id usuario
  const { idUser, user, reloadPage } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [displayReload, setDisplayReaload] = useState(true);
  const [job, setJob] = useState([]);
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

  return (
    <SafeAreaView>
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
        <TouchableOpacity onPress={() => navigation.navigate('Pesquisar')}>
        <Text> Pesquisar</Text>
        </TouchableOpacity>
        {error && <NotFound />}
        {/* <ActivityIndicator animating={error ? false : true} color={"#1E7596"} /> */}

        {job && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={job}
            renderItem={(item) => <CardJobPreview data={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CandidateHome;

const style = StyleSheet.create({
  content: {
    marginTop: 10,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageNotFound: {
    width: 300,
    minHeight: 300,
  },
});
