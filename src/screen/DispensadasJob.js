import react, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import NotFound from "../components/NotFound";
import axiosURL from "../API";
import { ActivityIndicator } from "react-native-paper";

import CardJobPreview from "../components/CardJobPreview";

const CandidateJob = () => {
  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);

  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  useEffect(() => {
    axiosURL
      .get(`vaga/listar/vagas/status?idCandidato=${1}&idStatus=${3}`)
      .then((response) => {
        setJob(response.data.content);
        setError(false);
        return true;
      })
      .catch((error) => {
        setError(true);
        return false;
      });
  }, []);

  console.log("dispensar ", job);

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
              <CardJobPreview data={item.item} key={item.id} type={'dispensar'} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CandidateJob;

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
