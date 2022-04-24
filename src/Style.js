import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowHeightPorcent =  Dimensions.get('window').height - 250;


const Style = StyleSheet.create({
  container:{
    display: "flex",
    flexGrow: 1,
    height: '100%',
  },
  screenSpace: {
    // minHeight: windowHeightPorcent,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  registerCandidateData: {
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
  },
});

export default Style;