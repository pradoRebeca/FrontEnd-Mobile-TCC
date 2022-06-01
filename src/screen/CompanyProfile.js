import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import CardJobPreview from "../components/CardJobPreview";
import { ScrollView } from "react-native-gesture-handler";
import axiosURL from "../API";
import Filter from "../components/Filter";

const userData = [
  {
    idJob: "hueh3ey2828u3434428u28",
    jobTitle: "Desenvolvedor de Sistemas",
    company: "Nubank",
    imageUriLogo:
      "https://t.ctcdn.com.br/Ol7_EBe_y4dg8j4wND2Dcftesxo=/660x0/smart/i452004.png",
    district: "Alphavile",
    state: "sp",
    info: "Mental",
  },
  {
    idJob: "hueh3ey28282323u2ewew8u28",
    jobTitle: "Vaga para o Welington",
    company: "Accurate Software",
    imageUriLogo:
      "https://pbs.twimg.com/profile_images/1343520363259555842/efkaRrKI_400x400.jpg",
    district: "Alphavile",
    state: "sp",
    info: "visual",
  },
  {
    idJob: "hueh3ey2828u28sdssu2sss8",
    jobTitle: "Jovem Aprendiz",
    company: "Burguer King",
    imageUriLogo:
      "https://boasmart.com/wp-content/uploads/2020/08/Y59a4-Jh.jpg",
    district: "Alphavile",
    state: "sp",
    info: "Mental",
  },
  {
    idJob: "hueh3eywwe2828u28ssssu28",
    jobTitle: "Desenvolvedor de Sistemas",
    company: "Nubank",
    imageUriLogo:
      "https://t.ctcdn.com.br/Ol7_EBe_y4dg8j4wND2Dcftesxo=/660x0/smart/i452004.png",
    district: "Alphavile",
    state: "sp",
    info: "Auditiva",
  },
  {
    idJob: "hueh3eysadsd2dsd828u28u28",
    jobTitle: "Recursos Humanos",
    company: "Banco do Brasil",
    imageUriLogo:
      "https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/07/bancodobrasil_marca.jpg",
    district: "Alphavile",
    state: "sp",
    info: "Motora",
  },
  {
    idJob: "hueh3ey2828u28uddd2334sss38",
    jobTitle: "Adm",
    company: "Bradesco",
    imageUriLogo:
      "https://t.ctcdn.com.br/SgIVt6gyFH7RoIV0ayvRf04g0YU=/400x400/smart/i490023.jpeg",
    district: "Ipanema",
    state: "RJ",
    info: "visual",
  },
];

const CompanyProfile = ({ route }) => {
  const navigation = useNavigation();
  const [mode, setMode] = useState(true);
  const [textMode, setTextMode] = useState("Ver Menos");
  const [companyData, setCompanyData] = useState({});
  const idCompany = route.params.idCompany;
  const [companyJobs, setCompanyJob] = useState([]);
  const setViewMode = () => {
    setMode(!mode);
    setTextMode(mode ? "Ver Mais" : "Ver Menos");
  };

  useEffect(() => {
    axiosURL
      .get(`empresa/buscar/${idCompany}`)
      .then((response) => {
        setCompanyData(response.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }, []);

  useEffect(() => {
    axiosURL
      .get(`vaga/listar/empresa/${idCompany}`)
      .then((response) => {
        setCompanyJob(response.data.content);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }, []);

  console.log("vagas empresa ", companyJobs);

  return (
    <SafeAreaView>
      <ScrollView style={style.content}>
        <View style={style.contentInformation}>
          <View style={style.firstPart}>
            <View style={style.viewCompanyLogo}>
              <Image
                style={style.companyLogo}
                source={{
                  uri: "https://sim.marica.rj.gov.br/img/icones/empresa2.png",
                }}
              />
            </View>
            <View style={style.viewInfoFirstPart}>
              <Text style={style.nameCompany}>{companyData.nome}</Text>
              {companyData.areaAtuacao && (
                <View style={style.textIcon}>
                  <FontAwesome5 color="#b0b0b0" name="building" size={13} />
                  <Text style={style.infoText}>
                    {companyData.areaAtuacao.areaAtuacao}
                  </Text>
                </View>
              )}

              {companyData.endereco && (
                <View style={style.textIcon}>
                  <Octicons color="#b0b0b0" name="location" size={13} />
                  <Text style={style.infoText}>
                    {companyData.endereco.cidade} /{companyData.endereco.sigla}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {!mode && (
            <TouchableOpacity
              style={style.buttonMoreLess}
              onPress={() => setViewMode()}
            >
              <Text style={{ color: "#2795D2" }}>{textMode}</Text>
            </TouchableOpacity>
          )}
          {mode && (
            <View sytle={style.aboutComapny}>
              <Text style={style.title}>Sobre a Empresa</Text>
              <Text style={style.description}>{companyData.descricao}</Text>
              <TouchableOpacity
                style={style.buttonMoreLess}
                onPress={() => setViewMode()}
              >
                <Text style={{ color: "#2795D2" }}>{textMode}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Filter mode='company'/>

        <FlatList
          data={companyJobs}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <CardJobPreview data={item.item} key={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyProfile;

const style = StyleSheet.create({
  content: {
    padding: 10,
  },
  contentInformation: {
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 40,
    height: "auto",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  firstPart: {
    //backgroundColor: 'yellow',
    paddingTop: 10,
    // marginBottom: 10,
    // backgroundColor: "yellow",
    height: 110,
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  viewCompanyLogo: {
    // backgroundColor: 'yellow',
    height: "100%",
    width: "25%",
  },
  viewInfoFirstPart: {
    display: "flex",
    // backgroundColor: "red",
    maxHeight: "100%",
    width: "72%",
  },

  infoText: {
    textTransform: "capitalize",
    marginLeft: 5,
    maxWidth: "100%",
    maxHeight: "100%",
    color: "black",
    fontSize: 14,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  companyLogo: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
    maxHeight: 40,
    // backgroundColor: "red",
    marginBottom: 10,
    borderTopColor: "#C4C4C4",
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 10,
  },
  description: {
    // backgroundColor: "yellow",
    marginBottom: 20,
    width: "100%",
  },
  textIcon: {
    marginBottom: 5,
    // backgroundColor: "pink",
    width: "100%",
    minHeight: 10,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  nameCompany: {
    textTransform: "capitalize",
    // backgroundColor: "blue",
    minHeight: 10,
    width: "100%",
    marginBottom: 5,
    fontSize: 16,
  },
  buttonMoreLess: {
    marginBottom: 10,
    // backgroundColor: 'yellow',
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
