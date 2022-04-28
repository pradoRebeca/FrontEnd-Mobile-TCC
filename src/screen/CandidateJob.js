import react, {useState, useEffect} from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import NotFound from "../components/NotFound";
import axiosURL from "../API";
import { ActivityIndicator } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialIcons";


import CardJobPreview from "../components/CardJobPreview";

const CandidateJob = () => {
  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);

  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

const carregar = () =>{ 
 if(job.length < 0){
    console.log('é para carregar')
    return <ActivityIndicator animating={true} color={'red'} />
  } else{
    console.log('nao é para carregar')
  }
}

  useEffect(() => {
    axiosURL
      .get(`vaga/listar/vagas/status?idCandidato=${1}&idStatus=${1}`)
      .then((response) => {
        setJob(response.data.content);
        setError(false);
      })
      .catch((error) => {
        setError(true);     
      });
  }, []);

  console.log(job)

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
              <CardJobPreview data={item.item} key={item.id} type={'candidatar'} />
            )}
          />
        )}
      </View>
    </SafeAreaView>)
  
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
