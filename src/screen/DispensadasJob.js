import react, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import NotFound from "../components/NotFound";
import axiosURL from "../API";
import { ActivityIndicator } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import CardJobPreview from "../components/CardJobPreview";

const DispensadasJob = () => {
  const {idUser, reloadPage} = useContext(AuthContext)
  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);
console.log(idUser, 'iduser')


  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  useEffect(() => {
    axiosURL
      .get(`vaga/listar/vagas/status?idCandidato=${idUser}&idStatus=${3}`)
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
        console.log('erro ao pegar vagas dispensadas => ', error.message)
        setError(true);
        return false;
      });
  }, [reloadPage]);

  // console.log("dispensar ", job);

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

       {/* <ActivityIndicator animating={error ? false : true} color={"#1E7596"} /> */}
        {job && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={job}
            renderItem={(item) => (
              <CardJobPreview data={item.item} key={item.id} type={"dispensar"} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DispensadasJob;

const style = StyleSheet.create({
  content: {
    paddingTop: 10,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
