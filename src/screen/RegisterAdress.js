import React, { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, Image, Button } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";

import InputData from "../components/InputData";
import ModifyTitle from "../components/ModifyTitle";
import Style from "../Style";
import Select from "../components/Select";
import ButtonSave from "../components/ButtonSave";
import { listState, emptyField, listCity, showMessage } from "../Functions";
import axiosURL from "../API";

//06693590
const RegisterAdress = ({ navigation, route }) => {
  var state = listState();

  const [apiResponse, setApiResponse] = useState(0);
  const [clicked, setClick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displayButtons, setDisplayButtons] = useState(false);

  const [adressAPI, setAdressAPI] = useState({});
  // const [teste, setTeste] = useState({
  //   rua: "1",
  //   numero: "12",
  //   bairro: "dsds",
  //   cidade: "dsdsd",
  //   sigla: "SP",
  //   cep: "06693590",
  //   estado: "dsd",
  // });

  const [adressTyped, setAdressTyped] = useState({
    rua: "",
    numero: "",
    bairro: "",
    sigla: "",
    cidade: "",
    cep: "",
    estado: "",
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

  const [city, setCity] = useState(listState(adressTyped.sigla));
  // useEffect(() => {
  //   setCity(listCity(adressTyped.city));
  // }, [adressTyped.cidade]);

  //GET API VIACEP

  
  useEffect(() => {
//      console.log("valor do cep: ", adressTyped.cep);
// setAdressAPI('abcjs')
// console.log(adressAPI)
    if (adressTyped.cep != "") {
      if (validate(adressTyped.cep)) {
        //console.log(validate(adressTyped.cep))
        axios
          .get(`https://viacep.com.br/ws/${adressTyped.cep}/json/`)
          .then((response) => setAdressAPI(response.data))
          .catch(() => {
            setButtonDisabled(false),
              setButtonDisabled(false),
              showMessage("CEP não encontrado");
          });
      } else {
        console.log("nao deu certo texto");
        //setButtonDisabled(true);
      }
    } else {
      // setButtonDisabled(true);
    }
  },[adressTyped.cep]);

  // console.log("adressAPI: ", adressAPI);

  //METHOD GET
  useEffect(() => {
    if (route.params.edit) {
      setDisplayButtons(true);
      axiosURL
        .get(`candidato/buscar/${1}`)
        .then((response) => {
          setAdressTyped(response.data.endereco), setDisplayButtons(true);
        })
        .catch((error) => {
          console.log("erro ao pegar dados de endereço"),
            setDisplayButtons(true);
          return false;
        });
    }
  }, []);

  const saveData = () => {
    //METODO PUT
    if (route.params.edit) {
      axiosURL
        .put(`candidato/atualizar/endereco/1`, {
          rua: adressTyped.rua,
          numero: adressTyped.numero,
          bairro: adressTyped.bairro,
          estado: adressTyped.estado,
          cidade: adressTyped.cidade,
          sigla: adressTyped.sigla,
          cep: adressTyped.cep,
        })
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
        console.log(adressTyped);
        axiosURL
          .post(`candidato/cadastrar/endereco/1`, {
            rua: adressTyped.rua,
            numero: adressTyped.numero,
            bairro: adressTyped.bairro,
            cidade: adressTyped.cidade,
            estado: adressTyped.estado,
            sigla: adressTyped.sigla,
            cep: adressTyped.cep,
          })
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

  console.log("endereco ", adressTyped);
  //console.log( 'via cep', adressAPI)

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
              valueDefault={adressTyped.cep}
              onChangeObject={setAdressTyped}
            />

            <InputData
              key="rua"
              label="Logradouro"
              keyObject="rua"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueDefault={adressAPI.logradouro}
              // valueDefault={teste.rua}
            />
            {/* <InputData
              key="numero"
              label="Número"
              keyObject="numero"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueDefault={adressAPI.numero}
              // valueAPI={adressAPI.numero}
            /> */}

            {/* <InputData
              key="bairro"
              label="Bairro"
              keyObject="bairro"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueDefault={adressAPI.bairro ?? adressTyped.bairro}
               
            /> */}
            {/* <InputData
              key="cicade"
              label="Cidade"
              keyObject="cidade"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueAPI={adressAPI.localidade}
              // valueAPI={adressAPI.localidade}
            /> */}
            {/* <Select
              label={"Selecione um estado"}
              data={state}
              keyObject="sigla"
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueDefault={adressAPI.uf}
              // valueAPI={adressAPI.uf}
            /> */}
          </KeyboardAvoidingView>
          <ButtonSave disabled={buttonDisabled} functionClicked={saveData} />
          <Button
            title="Cadastrar Endereço"
            onPress={() => {
              setApiResponse(200);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterAdress;
