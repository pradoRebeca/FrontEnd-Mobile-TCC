import React, { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, Image } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";

import InputData from "../components/InputData";
import ModifyTitle from "../components/ModifyTitle";
import Style from "../Style";
import Select from "../components/Select";
import ButtonSave from "../components/ButtonSave";
import { listState, emptyField } from "../Functions";

//06693590
const RegisterAdress = ({ navigation, route }) => {
  var state = listState();
  const baseUrl = "http://10.107.144.24:8080/";
  const [clicked, setClick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [adressAPI, setAdressAPI] = useState([]);
  const [adressTyped, setAdressTyped] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    sigla: "",
    cep: "",
  });

  const [error, setError] = useState({
    message: "",
    display: true,
    typed: "info",
  });

  const validate = (value) => {
    var caractereEspecial = /\W|_/;
    var letra = "[a-z]";

    if (caractereEspecial.test(value) || value.match(letra)) {
      return false;
    } else {
      return true;
    }
  };

  //GET API VIACEP
  useEffect(() => {
    if (adressTyped.cep != "") {
      if (validate(adressTyped.cep)) {
        axios
          .get(`https://viacep.com.br/ws/${adressTyped.cep}/json/`)
          .then(
            (response) => (
              setAdressAPI(response.data), setButtonDisabled(false)
            )
          )
          .catch(() => setButtonDisabled(false));
      } else {
        console.log("nao deu certo  texto");
        setButtonDisabled(true);
      }
    } else {
      setButtonDisabled(true);
    }
  }, [adressTyped.cep]);

  //METHOD GET
  useEffect(() => {
    if (route.params.edit) {
      axios
        .get(`${baseUrl}/candidato/buscar/${1}`)
        .then((response) => {
          setAdressTyped(reponse.data);
        })
        .catch((error) => {
          console.log("erro ao pegar dados de endereço");
          return false;
        });
    }
  }, []);

  
  const saveData = () => {
    //METODO PUT
    if (route.params.edit) {
      axios
        .put(`${baseUrl}${id}`, {})
        .then((response) => {
          console.log("dados  de endereço  atualizados com sucesso");
          return true;
        })
        .catch((error) => {
          console.log("erro ao atualizar dados de endereço");
          return false;
        });
    } else {
      //METODO POST
      if (emptyField(adressTyped.cep)) {
        axios
          .post(`${baseUrl}/candidato/cadastrar/endereco/1`, { adressTyped })
          .then((response) => {
            console.log("dados cadastrados com sucesso");
            return true;
          })
          .catch((error) => {
            console.log("erro ao cadastrar dados");
            return false;
          });
      } else {
        console.log("preencha os campos corretamente");
        return false;
      }
    }
  };

  // console.log(adressTyped)
  // console.log(adressAPI)

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Endereço" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <KeyboardAvoidingView
            contentContainerStyle={Style.registerCandidateData}
            behavior="position"
          >
            <InputData
              length={9}
              label="Cep"
              keyObject={"cep"}
              error={error}
              required={true}
              object={adressTyped}
              onChangeObject={setAdressTyped}
            />
            <InputData
              editable={false}
              label="Logradouro"
              keyObject="rua"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueAPI={adressAPI.logradouro}
            />
            <InputData
              label="Número"
              keyObject="numero"
              object={adressTyped}
              onChangeObject={setAdressTyped}
            />
            <InputData
              label="Bairro"
              keyObject="bairro"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueAPI={adressAPI.bairro}
            />
            <Select
              data={state}
              keyObject={"sigla"}
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueAPI={adressAPI.uf}
            />
            {/* <InputData
              label="Complemento"
              massageError="complemento"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueAPI={adressAPI.logradouro}
            /> */}
          </KeyboardAvoidingView>
          <ButtonSave disabled={buttonDisabled} functionClicked={saveData} />
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterAdress;
