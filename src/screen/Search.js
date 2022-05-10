import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import axiosURL from "../API";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

import CardJobPreview from "../components/CardJobPreview";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
// import { Searchbar } from "react-native-paper";

const Search = ({ navigation }) => {
  //id usuario
  const {idUser, user} = useContext(AuthContext)
  console.log('nome do usuario: ' , user.email)

  const [textSearch, setTextSearch] = useState("")
  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);
  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";
//console.log('screen:', textSearch)
  useEffect(() => {
    axiosURL
      .get(`vaga/listar`)
      .then((response) => {
        setJob(response.data.content.filter((item) => item.status == 1)),
          setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);
  console.log(error);
  return (
    <SafeAreaView>
    <SearchBar  onChangeText={setTextSearch}/>
      <StatusBar backgroundColor="#1E7596"/>
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
