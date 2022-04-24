import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Information from "./Informations";
import ItemSeparator from "./ItemSeparator";

const DisplayInformation = ({
  nameSreen,
  addInformation,
  data,
  titleSection,
  mode,
}) => {
  const navigation = useNavigation();
  const [itens, setItens] = useState(data ?? []);
  //var modeId = "id";
  // console.log("displayinformatiosn ", data);
  // var info = data ?? [];
  //switch (mode) {
  // case "curso":
  //   modeId = "idCursoCandidato";
  //   break;
  //}

  // const renderItens = () => {
  //   if (data !== undefined) {
  //     data.map((item) => (
  //       <Information
  //         data={item}
  //         key={item.id}
  //         mode={mode}
  //         nameSreen={nameSreen}
  //       />
  //     ));
  //   }
  // };

  var renderItens;

  useEffect(() => {
    // if (typeof data != undefined) {
    //   return (renderItens = itens.map((item) => (
    //     <Information
    //       data={item}
    //       key={item.id}
    //       mode={mode}
    //       nameSreen={nameSreen}
    //     />
    //   )));
    // } else {
    //   console.log("erro ", data);
    // }

    setItens(data);
  }, [data]);
  //var conteudo = data || ['','']

  // console.log()

  //   const renderItem = () => {
  //    if (data != undefined) {
  //       return data.map((item) => <Text>{item.nome}</Text>)
  //     }else{
  //       return <Text>sem conteudo</Text>
  //    }
  // };

  const arrayOrObject = () => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  };

  const buttonAdd = () => {
    if (addInformation == true || data == undefined) {
      return (
        <TouchableOpacity
          style={{ ...style.buttonAdd }}
          onPress={() => navigation.navigate(nameSreen, { edit: false })}
        >
          <Text style={{ color: "white" }}>Adicionar Informação</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <Text style={style.title}>{titleSection}</Text>
      <FlatList
        data={data}
        renderItem={(item) => (
          <Information data={item.item} mode={mode} nameSreen={nameSreen} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
      {/*[itens].map((item) => (
        <Information data={item} mode={mode} nameSreen={nameSreen} />
      ))*/}

      {buttonAdd()}
    </>
  );
};

export default DisplayInformation;

const style = StyleSheet.create({
  title: {
    color: "black",
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
  },

  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1E7596",
    width: 80,
    height: 30,
    borderRadius: 5,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAdd: {
    marginTop: 20,
    minWidth: "30%",
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    backgroundColor: "#1E7596",
    borderRadius: 5,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtonAdd: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
