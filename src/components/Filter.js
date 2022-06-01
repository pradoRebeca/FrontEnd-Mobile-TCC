import react from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { View } from "react-native-web";

const Filter = ({mode}) => {
  const navigation = useNavigation();


  const modeView = () => {
      if(mode){
          return <Text style={{ fontSize: 16 }}>Filtrar</Text>
      }
  }


  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Toque-me!"
      accessibilityHint="Irá para a tela de filtragem de vagas."
      onPress={() => navigation.navigate("Filtrar")}
      style={mode ? {...style.content} : { ...style.contentModeIcon}}
    >
    {modeView()}
      {/* <Text style={{ fontSize: 16 }}>Filtrar</Text> */}
      <AntDesign name="filter" size={25} color={'#7C7C7C'}/>
    </TouchableOpacity>
  );
};

export default Filter;

const style = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 40,
    height: "auto",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentModeIcon:{
    backgroundColor: '#fff'
  }
});
