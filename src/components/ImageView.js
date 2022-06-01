import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageView({functionImage}) {
  const [image, setImage] = useState(
    "https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png"
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result.uri);
    functionImage(result.uri)
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={style.content}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
      <Image source={{ uri: image }} style={style.contentImage} />
      <TouchableOpacity style={style.text} onPress={pickImage}>
        <Text style={{ color: '#1E7596'}}>Escolher foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  contentImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  text: {
    // backgroundColor: "yellow",
    height: 40,
    width: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
    // borderColor: 'red',
    // borderWidth: 1,
   

  },
  content: {
    height: 150,
    marginBottom: 15,
    // backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
