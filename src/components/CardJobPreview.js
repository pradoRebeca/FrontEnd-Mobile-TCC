import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;

const CardJobPreview = ({ data, type }) => {
  console.log('type: ', type)
  const [dataJob, setDataJob] = useState(data ?? []);
  const navigation = useNavigation();

  const changeIcon = () => {
    setIcon(!icon);
  };

  let icon;

  switch (type) {
    case "salvar":
      icon = "bookmark-border";
      break;
    case "candidatar":
      icon = "check-circle-outline";
      break;
    case "dispensar":
      icon = "block";
      break;
  }

  return (
    <View style={style.content}>
      <View style={style.firstPart}>
        <View style={style.viewJobTitle}>
          <Text style={style.jobTitle}>{dataJob.titulo}...</Text>

          <Icon color="#b0b0b0" name={icon} size={23} />
        </View>
        {dataJob.empresa && (
          <View style={style.infoFirstPart}>
            <FontAwesome5 color="#b0b0b0" name="building" size={15} />
            <Text style={style.infoText}>{dataJob.empresa.empresa}</Text>
          </View>
        )}
        {dataJob.localTrabalho && (
          <View style={style.infoFirstPart}>
            <Octicons color="#b0b0b0" name="location" size={15} />
            <Text style={style.infoText}>
              {dataJob.localTrabalho.cidade} - {dataJob.localTrabalho.sigla}
            </Text>
          </View>
        )}
      </View>

      <View style={style.viewSecondPart}>
        {dataJob.deficiencia && (
          <View style={style.deficiency}>
            <Text style={style.secondPartText}>
              {" "}
              Deficiencia {dataJob.deficiencia[0].tipoDeficiencia}{" "}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={style.knowMore}
          onPress={() =>
            navigation.navigate("Detalhes da Vaga", { dataVaga: dataJob ?? [] , type: type })
          }
        >
          <Text style={{ ...style.secondPartText, fontSize: 16 }}>
            Saiba Mais
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardJobPreview;

const style = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "auto",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    
    // elevation: 3,
  },
  firstPart: {
    paddingTop: 10,
    marginBottom: 10,
    // backgroundColor: "yellow",
    height: "auto",
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },
  viewCompanyLogo: {
    height: "75%",
    width: "25%",
  },
  viewInfoFirstPart: {
    height: "75%",
    width: "100%",
  },
  infoFirstPart: {
    // backgroundColor: "pink",
    width: "100%",
    maxHeight: 20,
    flexDirection: "row",
    display: "flex",
    alignContent: "center",
    marginTop: 10,
  },
  infoText: {
    maxHeight: "100%",
    color: "black",
    fontSize: 13,
    marginLeft: 7,
  },
  jobTitle: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "600",
  },
  viewSecondPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  deficiency: {
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: 100,
    height: 20,
    backgroundColor: "#2795D2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  knowMore: {
    width: 100,
    backgroundColor: "#225E77",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  secondPartText: {
    textTransform: "capitalize",
    color: "white",
    fontSize: 15,
  },
  viewJobTitle: {
    // backgroundColor: "red",
    maxHeight: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyLogo: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
});
