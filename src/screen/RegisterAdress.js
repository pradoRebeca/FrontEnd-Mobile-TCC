import React, { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, Image } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";

import InputData from "../components/InputData";
import ModifyTitle from "../components/ModifyTitle";
import Style from "../Style";
import Select from "../components/Select";
import ButtonSave from "../components/ButtonSave";
import { listState, emptyField, listCity } from "../Functions";
import axiosURL from "../API";

//06693590
const RegisterAdress = ({ navigation, route }) => {
  var state = listState();

  const [clicked, setClick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displayButtons, setDisplayButtons] = useState(false);

  const [adressAPI, setAdressAPI] = useState([]);
  const [adressTyped, setAdressTyped] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "abc",
    sigla: "",
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
    if (!route.params.edit) {
      if (adressTyped.cep != "") {
        if (validate(adressTyped.cep)) {
          axios
            .get(`https://viacep.com.br/ws/${adressTyped.cep}/json/`)
            .then((response) => {
              setAdressAPI(response.data);
              setDisplayButtons(true);
            })
            .catch(() => {
              setButtonDisabled(false), setButtonDisabled(false);
            });
        } else {
          console.log("nao deu certo texto");
          //setButtonDisabled(true);
        }
      } else {
        // setButtonDisabled(true);
      }
    }
  }, [adressTyped.cep]);
  console.log("endereco ", adressTyped);
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
              valueDefault={adressAPI.cep ?? adressTyped.cep}
              onChangeObject={setAdressTyped}
            />

            {displayButtons && (
              <>
                <InputData
                  key="rua"
                  label="Logradouro"
                  keyObject="rua"
                  object={adressTyped}
                  onChangeObject={setAdressTyped}
                  valueDefault={adressTyped.rua}
                  valueAPI={adressAPI.logradouro}
                />
                <InputData
                  key="numero"
                  label="Número"
                  keyObject="numero"
                  object={adressTyped}
                  onChangeObject={setAdressTyped}
                  valueDefault={adressTyped.numero}
                  valueAPI={adressAPI.numero}
                />

                <InputData
                  key="bairro"
                  label="Bairro"
                  keyObject="bairro"
                  object={adressTyped}
                  onChangeObject={setAdressTyped}
                  valueDefault={adressTyped.bairro}
                  valueAPI={adressAPI.bairro}
                />
                <Select
                  label={"Selecione um estado"}
                  data={state}
                  keyObject="sigla"
                  object={adressTyped}
                  onChangeObject={setAdressTyped}
                  valueDefault={adressTyped.sigla}
                  valueAPI={adressAPI.uf}
                />
              </>
            )}

            {/* <Select
              label={"Selecione uma cidade"}
              data={city}
              keyObject={"sigla"}
              object={adressTyped}
              onChangeObject={setAdressTyped}
              valueDefault={adressAPI.localidade ?? adressTyped.estadoCidade}
            /> */}

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
