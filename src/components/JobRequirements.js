import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//file-text-o

const JobRequirements = ({ title, data, key }) => {
  const render = () => {
console.log(data)
      if (Array.isArray(data)) {
        return data.map((item) => (
          <Text style={style.description}>{item[key]}</Text>
        ));
      } else {
        return <Text style={style.description}>{data}</Text>;
      }
    };
  
    
 
  return (
    <>
      <View style={style.title}>
        <FontAwesome name="file-text-o" size={14} />
        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "500" }}>
          {title}
        </Text>
      </View>
      {render()}
    </>
  );
};

export default JobRequirements;

const style = StyleSheet.create({
  title: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    // backgroundColor: "blue",
    minHeight: 10,
    width: "100%",
    fontSize: 15,
  },
  description: {
    marginBottom: 10,
    textTransform: "capitalize",
    width: "100%",
    minHeight: 10,
    // backgroundColor: "yellow",
  },
});
