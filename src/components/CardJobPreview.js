import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const CardJobPreview = ({ data }) => {
  const [dataJob, setDataJob] = useState(data ?? []);
  const navigation = useNavigation();
  const [icon, setIcon] = useState(false);

  const changeIcon = () => {
    setIcon(!icon);
  };

  return (
    <View style={style.content}>
      <View style={style.firstPart}>
        <View style={style.viewJobTitle}>
          <Text style={style.jobTitle}>{dataJob.titulo}...</Text>
          <TouchableOpacity onPress={changeIcon}>
            <Ionicons
              color="#b0b0b0"
              name={icon ? "bookmark" : "bookmark-outline"}
              size={23}
            />
          </TouchableOpacity>
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
            {dataJob.deficiencia.map((type) => (
              <Text style={style.secondPartText}>
                Deficiencia {type.tipoDeficiencia}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={style.knowMore}
          onPress={() =>
            navigation.navigate("Detalhes da Vaga", { dataVaga: dataJob ?? [] })
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
