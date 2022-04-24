import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

//file-text-o
import ButtonOptionsJob from "../components/ButtonOptionsJob";

const JobDetails = ({ route }) => {
  const navigation = useNavigation();

  const [dataVaga, setDataVaga] = useState(
    route.params.dataVaga ?? {
      deficiencia: [],
      beneficio: [],
      formacaoDesejada: [],
    }
  );

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
              <Text style={style.infoText}>{dataVaga.titulo}</Text>
              {dataVaga.deficiencia.map((type) => (
                <Text style={style.infoText}>
                  Deficiencia {type.tipoDeficiencia}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <View style={style.button}>
              <ButtonOptionsJob
                label="Candidatar-se"
                type="blue"
                icon="check-circle-outline"
              />
              <ButtonOptionsJob label="Salvar" icon="bookmark-border" />
              <ButtonOptionsJob label="Dispensar" icon="block" />
            </View>
            <View style={style.details}>
              <View style={style.requisitoVaga}>
                <FontAwesome name="file-text-o" size={14} />
                <Text
                  style={{ marginLeft: 10, fontSize: 15, fontWeight: "500" }}
                >
                  Requisitos
                </Text>
              </View>

              <Text style={style.descricaoRequisitoVaga}>
                {dataVaga.requisitos}
              </Text>

              <Text style={style.requisitoVaga}>Salario</Text>
              <Text style={style.descricaoRequisitoVaga}>
                {dataVaga.salario.salario}
              </Text>

              <Text style={style.requisitoVaga}>Suporte</Text>
              {dataVaga.suporte.map((item) => (
                <Text style={style.descricaoRequisitoVaga}>{item.suporte}</Text>
              ))}

              <Text style={style.requisitoVaga}>Beneficios</Text>
              {dataVaga.beneficio.map((item) => (
                <Text style={style.descricaoRequisitoVaga}>
                  {item.beneficio}
                </Text>
              ))}

              <Text style={style.requisitoVaga}>Formaçoes Academicas</Text>
              {dataVaga.formacaoDesejada.map((item) => (
                <Text style={style.descricaoRequisitoVaga}>{item.curso}</Text>
              ))}

              <Text style={style.requisitoVaga}>Local de Trabalho</Text>
              <Text style={style.descricaoRequisitoVaga}>
                {dataVaga.localTrabalho.bairro}, {dataVaga.localTrabalho.cidade}
                /{dataVaga.localTrabalho.estado}
              </Text>

              <Text style={style.requisitoVaga}>Horario</Text>
              <Text style={style.descricaoRequisitoVaga}>
                {dataVaga.horario.horarioInicio} -{" "}
                {dataVaga.horario.horarioFinal}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={style.linkCompanyProfile}
                onPress={() =>
                  navigation.navigate("Perfil da Empresa", {
                    idCompany: dataVaga.empresa.id,
                  })
                }
              >
                <View style={style.viewLinkImage}>
                  <Image
                    style={style.linkImage}
                    source={{
                      uri: "https://cdn.bettha.com/images/company/logo/menu_default.png",
                    }}
                  />
                </View>
                <Text style={style.linkText}>Visite nosso perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;

const style = StyleSheet.create({
  content: {
    padding: 10,
  },
  contentInformation: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "auto",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  firstPart: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    // backgroundColor: "yellow",
    height: 100,
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  viewCompanyLogo: {
    height: "100%",
    width: "25%",
  },
  viewInfoFirstPart: {
    display: "flex",
    // backgroundColor: "red",
    height: "100%",
    width: "72%",
  },

  infoText: {
    textTransform: "capitalize",
    marginBottom: 10,
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
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    marginTop: 20,
    width: "100%",
    minHeight: 10,
    marginBottom: 20,
  },
  viewLinkImage: {
    borderColor: "#1E7596",
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
    width: 30,
    height: 30,
  },
  linkCompanyProfile: {
    minHeight: 40,
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "#1E7596",
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    minWidth: 10,
    alignItems: "center",
  },
  linkImage: {
    width: "100%",
    height: "100%",
  },
  linkText: {
    color: "#1E7596",
  },
  requisitoVaga: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    // backgroundColor: "blue",
    minHeight: 10,
    width: "100%",
    fontSize: 15,
  },
  descricaoRequisitoVaga: {
    marginBottom: 10,
    textTransform: "capitalize",
    width: "100%",
    minHeight: 10,
    // backgroundColor: "yellow",
  },
});
