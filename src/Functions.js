import { useEffect, useState } from "react";
import { Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const navigation = useNavigation();

export const emptyField = (...n) => {
  const array = [...n];
  if (array.includes("") || array.includes(null) || array.includes(undefined)) {
    return false;
  } else {
    return true;
  }
};

export const letra = (...n) => {
  const array = [...n];
  var regex = [a - z];

  if (regex.test(array)) {
    return true;
  } else {
    return false;
  }
};

export const specialCaractere = (...n) => {
  const array = [...n];
  var regex = /\W|_/;

  if (regex.test(array)) {
    return true;
  } else {
    return false;
  }
};

export const hasId = (obj) => {
  var valuesObject = Object.values(obj);
  console.log("functions", valuesObject);
  if (valuesObject.includes(undefined)) {
    return true;
  } else {
    return false;
  }
};

console.log(specialCaractere(["ahs", "jssijsis"]));

//funcao para api listar estados e guradar dentro do objeto adressAPI
export const listState = () => {
  const [brazilState, setBrazilState] = useState([]);
  const [localidade, setLocalidade] = useState([]);

  useEffect(() => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
      .then((response) => setBrazilState(response.data))
      .catch(() => console.log("api de localidade não está respondendo"));
  }, []);

  useEffect(() => {
    setLocalidade(
      brazilState.map((item) => ({ estado: item.nome, sigla: item.sigla }))
    );
  }, [brazilState]);

  return localidade;
};

export const showMessage = (title, functionOk) =>
  Alert.alert("", title, [
    {
      text: "OK",
      onPress: () => console.log("ok Pressed"),
    },
  ]);

export const showDialog = (text, functionOk, functionCancel) =>
  Alert.alert("", "My Alert Msg", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
