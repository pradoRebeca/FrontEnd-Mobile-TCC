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
  // const [adressTyped, setAdressTyped] = useState({
  //   rua: "",
  //   numero: "",
  //   bairro: "",
  //   sigla: "",
  //   cidade: "",
  //   cep: "",
  //   estado: "",
  // });

  const [cep, setCep] = useState({cep: ''});
  const [rua, setRua] = useState({rua : ''});
  const [bairro, setBairro] = useState({bairro: ''});
  const [cidade, setCidade] = useState({cidade: ''});
  const [sigla, setSigla] = useState({sigla: ''});
  const [numero, setNumero] = useState({numero: ''});


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

  // useEffect(() => {
  //   setCity(listCity(adressTyped.city));
  // }, [adressTyped.cidade]);

  //GET API VIACEP
  // function searchCEP() {
  //   axios
  //     .get(`https://viacep.com.br/ws/${cep.cep}/json/`)
  //     .then((response) => setAdressAPI(response.data))
  //     .catch((error) => console.log("error: ", error));
  // }

  // useEffect(() => {
  //   searchCEP()
  // }, [adressTyped.cep])

  useEffect(() => {
  //  console.log("passo");
    // setAdressAPI('abcjs')
    // console.log(adressAPI)
    if (cep.cep != "") {
      if (validate(cep.cep)) {
        //console.log(validate(adressTyped.cep))
        axios
          .get(`https://viacep.com.br/ws/${cep.cep}/json/`)
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
  }, [cep.cep]);

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
          rua: rua.rua,
          numero: numero.numero,
          bairro: bairro.bairro,
          estado: sigla.estado,
          cidade: cidade.cidade,
          sigla: sigla.sigla,
          cep: cep.cep,
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
            rua: rua.rua,
            numero: numero.numero,
            bairro: bairro.bairro,
            estado: sigla.estado,
            cidade: cidade.cidade,
            sigla: sigla.sigla,
            cep: cep.cep,
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

 // console.log("endereco ", adressTyped);
  // console.log( 'via cep', adressAPI)


  console.log('bairro: ', bairro)
  console.log('cep: ', cep)
  console.log('rua: ', rua)
  console.log('cidade: ', cidade)
  console.log('estado: ', sigla.estado)
  console.log('numero: ', numero)
  console.log('sigla: ', sigla)



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
              object={cep}
              valueDefault={adressAPI.cep ?? cep.cep}
              onChangeObject={setCep}
              type='adress'
              mask={'cep'}
            />

            <InputData
              key="rua"
              label="Logradouro"
              keyObject="rua"
              object={rua}
              onChangeObject={setRua}
              valueDefault={adressAPI.logradouro ?? rua.rua}
              type='adress'
            
            />
            <InputData
              key="numero"
              label="Número"
              keyObject="numero"
              object={numero}
              valueDefault={numero.numero}
              onChangeObject={setNumero}
              type='adress'
            />
            
            <InputData
              key="cicade"
              label="Cidade"
              keyObject="cidade"
              object={cidade}
              valueDefault={adressAPI.localidade ?? cidade.cidade}
              onChangeObject={setCidade}
              type='adress'
            />

            <InputData
              key="bairro"
              label="Bairro"
              keyObject="bairro"
              object={bairro}
              onChangeObject={setBairro}
              valueDefault={adressAPI.bairro ?? bairro.bairro}
              type='adress'
            />

            <Select
              label={"Selecione um estado"}
              data={state}
              keyObject="sigla"
              object={sigla}
              valueDefault={adressAPI.uf ?? sigla.sigla}
              onChangeObject={setSigla}
            
            />
          </KeyboardAvoidingView>
          <ButtonSave disabled={buttonDisabled} functionClicked={saveData} />
          {/* <Button title="Pesquisar CEP" onPress={searchCEP} /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterAdress;
