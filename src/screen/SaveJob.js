import react, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import NotFound from "../components/NotFound";
import axiosURL from "../API";
import { ActivityIndicator } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import CardJobPreview from "../components/CardJobPreview";

const SaveJob = () => {
  const {idUser} = useContext(AuthContext)
  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);


const abc = () => {
  console.log('passou aqui')
}

abc()

  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";
  useEffect(() => {
    axiosURL
      .get(`vaga/listar/vagas/status?idCandidato=${idUser}&idStatus=${2}`)
      .then((response) => {
        setJob(response.data.content);
        console.log()
        if(response.data.content.length != 0){
          setError(false);
        }else{
          setError(true);
        }
      })
      .catch((error) => {
        console.log('erro ao pegar vagas salvas => ', error.message)
        setError(true);
        return false;
      });
  }, []);

  return (
    <SafeAreaView>
      {/* <StatusBar backgroundColor="#1E7596" /> */}
      {/* <SearchBar /> */}
      {/* <TopNavigation navigation={navigation} /> */}
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

        <ActivityIndicator animating={error ? false : true} color={"#1E7596"} />

        {job && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={job}
            renderItem={(item) => (
              <CardJobPreview data={item.item} key={item.id} type={'salvar'} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SaveJob;

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
});
