import react, {useState, useEffect, useContext} from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialIcons";


import NotFound from "../components/NotFound";
import axiosURL from "../API";
import { AuthContext } from "../contexts/AuthContext";
import CardJobPreview from "../components/CardJobPreview";
import { StatusBar } from "expo-status-bar";

const CandidateJob = ({route}) => {
// console.log('initial params =>', route.params.reload)
const [test , setTest] = useState(1)
  const {idUser} = useContext(AuthContext)
  console.log('TELA CANDIDATEJOB')
  const [error, setError] = useState(false);
  const [displayReload, setDisplayReaload] = useState(true);
  const [job, setJob] = useState([]);


useEffect(() => {
  console.log('REALOAD ACONTECENDO, VALUE =>', route.params.reload)
}, [route.params.reload])

//const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

// const reloadPage = ()=>{
//   console.log(test)
// }
// reloadPage()
// console.log('resultado do teste => ', test)

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
      .get(`vaga/listar/vagas/status?idCandidato=${idUser}&idStatus=${1}`)
      .then((response) => {
        setJob(response.data.content);
        if(response.data.content.length != 0){
          setDisplayReaload(false)
          setError(false);
        }else{
          setDisplayReaload(false)
          setError(true);
        }
      })
      .catch((error) => {
        console.log('erro ao pegar vagas candidadatas => ', error.message)
        setDisplayReaload(false)
        setError(true);     
      });
  }, []);

  return (
    <SafeAreaView>
  
      <StatusBar backgroundColor="#1E7596" />
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

        <ActivityIndicator animating={displayReload} color={"#1E7596"} />
        {job && (
          <FlatList
            data={job}
            renderItem={(item) => 
              <CardJobPreview data={item.item} key={item.item.id} type={'candidatar'} />
            }
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
