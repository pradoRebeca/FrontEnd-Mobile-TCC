import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import axiosURL from "../API";
import DisplayInformation from "../components/DisplayInformations";
import Information from "../components/Informations";
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from "../contexts/AuthContext";

const user = [
  {
    id: "1",
    nome: "valor obj",
    dataNascimento: "valor obj",
    profi: null,
    email: [
      {
        id: 1,
        email: "eemil@1",
      },
      {
        id: 1,
        email: "eemil@1",
      },
    ],
  },
];

const enderecoRua = {
  rua: "rua a",
  numero: "12",
  bairro: "",
  cidade: "sao paulo",
  sigla: "",
  cep: "",
};

const CandidateProfile = ({route}) => {
  const {idUser} = useContext(AuthContext)
  // const [isReaload, setIsReaload] = useState()
  const navigation = useNavigation();
  

  const image = "https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png";
  const [personalData, setPersonalData] = useState([]);
  const [personalInformation, setPersonalInformation] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [cursoData, setCursoData] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [deficienciaData, setDeficienciaData] = useState([]);
  const [display, setDisplay] = useState(true);


  // useEffect(() => {
  //   if(route.params){
  //     const {reload}= route.params
  //     setIsReaload(reload)
  //   }
  // }, [route.params])


console.log(idUser, 'iduser')
  useEffect(() => {
    axiosURL
      .get(`candidato/buscar/${idUser}`)
      .then((response) => {
        setExperienceData(response.data.experiencia);
        setCursoData(response.data.curso);
        setDeficienciaData(response.data.deficiencia);
        setEndereco(response.data.endereco);
        setPersonalInformation({
          ...response.data,
          experiencia: null,
          deficiencia: null,
          endereco: null,
          curso: null,
        });
      })
      .catch((error) => {
        console.log('nao deu para pegar dados do candidato => ', error.message);
        return false;
      });
  }, [route.params]);

// console.log('refresh: ',route.params)

  //Filtro para cada seção
  useEffect(() => {
    setExperienceData(personalData.experiencia);
    setCursoData(personalData.curso);
   setPersonalInformation({ ...personalData, experiencia: null, curso: null });
  }, [personalData]);

  return (
    <SafeAreaView>
      {/* <SearchBar /> */}
      <ScrollView>
        <View style={style.conatinerInformations}>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Informações Pessoais"
              mode="personalInformation"
              data={[personalInformation]}
              nameSreen="RegisterPersonalData"
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Cadastrar Endereço"
             data={[personalData.endereco]}
              nameSreen="Cadastrar Endereço"
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Formações Academicas"
              data={cursoData}
              nameSreen="Formação Academica"
              addInformation={true}
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Experiencia Profissional"
              data={experienceData}
              nameSreen="Experiencia Profissional"
              addInformation={true}
              mode={"profissionalExperience"}
            />
          </View>
          {/* <View style={style.container}>
            <DisplayInformation
              // data={}
              titleSection="Informacoes Adicionais"
              nameSreen="Informacoes Adicionais"
              addInformation={true}
            />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CandidateProfile;

const style = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
  infoPreview: {
    paddingTop: "5%",
    paddingBottom: "5%",
    width: "100%",
    minHeight: 120,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#DCEBF2",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  viewImage: {
    height: 90,
    width: "25%",
  },
  infoText: {
    minHeight: 90,
    width: "60%",
  },
  conatinerInformations: {
    width: "100%",
    padding: 15,
  },
  info: {
    minHeight: 0,
    height: "auto",
    marginBottom: 10,
    maxWidth: "100%",
  },
  infoTitle: {
    minHeight: 0,
    color: "#AAAAAA",
    fontSize: 13,
  },

  infoDescretion: {
    minHeight: 0,
  },

  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },

  titleSection: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
  container: {
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    minHeight: 100,
    padding: 15,
    marginBottom: 15,
  },
});

{
  /* <View style={style.canditateInfo}
 <DisplayInformation titleSection={'nome'} title={'rbecea'} descretion={'ola'} /> 
   <FlatList
      data={userData}
      renderItem={(item) => <DisplayInformation titleSection={item.endereço} title={item.bairro} descretion={item.cep} />}
  /> 

</View> */
}
