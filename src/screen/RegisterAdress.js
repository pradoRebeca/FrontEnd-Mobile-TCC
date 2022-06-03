import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import InputData from "../components/InputData";
import ModifyTitle from "../components/ModifyTitle";
import Style from "../Style";
import Select from "../components/Select";
import ButtonSave from "../components/ButtonSave";
import {
  listState,
  emptyField,
  listCity,
  showMessage,
  showToast,
} from "../Functions";
import axiosURL from "../API";

//06693590
const RegisterAdress = ({ route }) => {
  const { idUser } = useContext(AuthContext);
  var state = listState();

  const navigation = useNavigation();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displayButtons, setDisplayButtons] = useState(false);
  const [displayInformations, setDisplayInformations] = useState(false);

  const [adressAPI, setAdressAPI] = useState({});

  const [cep, setCep] = useState({ cep: "" });
  const [rua, setRua] = useState({ rua: "" });
  const [bairro, setBairro] = useState({ bairro: "" });
  const [cidade, setCidade] = useState({ cidade: "" });
  const [sigla, setSigla] = useState({ sigla: "", estado: "" });
  const [numero, setNumero] = useState({ numero: "" });

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

  const pesquisarCep = () => {
    if (cep.cep != "") {
      if (validate(cep.cep)) {
        axios
          .get(`https://viacep.com.br/ws/${cep.cep}/json/`)
          .then((response) => {
            setDisplayInformations(true);
            setAdressAPI(response.data);
          })
          .catch(() => {
            setButtonDisabled(false), setDisplayInformations(false);
            showMessage("CEP não encontrado");
          });
      } else {
        setDisplayInformations(false);
        showMessage("CEP invalido");
      }
    } else {
      setDisplayInformations(false);
      showMessage("Insira um CEP para buscar o seu endereço");
    }
  };

  //METHOD GET
  useEffect(() => {
    if (route.params.edit) {
      setDisplayButtons(true);
      axiosURL
        .get(`candidato/buscar/${idUser}`)
        .then((response) => {
          const obj = response.data.endereco;
          setRua({ rua: obj.rua });
          setBairro({ bairro: obj.bairro });
          setNumero({ numero: obj.numero });
          setCidade({ cidade: obj.cidade });
          setCep({ cep: obj.cep });
          setSigla({ sigla: obj.sigla, estado: obj.estado });

          setDisplayButtons(true);
        })
        .catch((error) => {
          console.log("erro ao pegar dados de endereço => ", error.message),
            setDisplayButtons(true);
          return false;
        });
    }
  }, []);

  const saveData = () => {
    //METODO PUT
    if (route.params.edit) {
      axiosURL
        .put(`candidato/atualizar/endereco/${idUser}`, {
          rua: rua.rua,
          numero: numero.numero,
          bairro: bairro.bairro,
          cidade: cidade.cidade,
          sigla: sigla.sigla,
          estado: sigla.estado,
          cep: cep.cep,
        })
        .then((response) => {
          showToast("Dados atualizados com sucesso");
          navigation.navigate("Perfil", { reload: 1 });
          console.log("dados  de endereço  atualizados com sucesso");
          return true;
        })
        .catch((error) => {
          showMessage("Erro ao atualizar dados");
          console.log("erro ao atualizar dados de endereço");
          return false;
        });
    } else {
      //METODO POST
      if (emptyField(cep.cep)) {
        ///console.log('passa pelo post')
        axiosURL
          .post(`candidato/cadastrar/endereco/${idUser}`, {
            rua: rua.rua,
            numero: numero.numero,
            bairro: bairro.bairro,
            estado: sigla.estado,
            cidade: cidade.cidade,
            sigla: sigla.sigla,
            cep: cep.cep,
          })
          .then((response) => {
            showToast("Dados cadastrados com sucesso");
            navigation.navigate("Perfil", { reload: 1 });
            ///  console.log("dados cadastrados com sucesso => ", response.status);
            return true;
          })
          .catch((error) => {
            showMessage("Erro ao cadastrar os dados. Tente novamente.");
            // console.log("erro ao cadastrar dados => " , error.message);
            return false;
          });
      } else {
        //  console.log("preencha os campos corretamente");
        return false;
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#1E7596" />
      <ModifyTitle title="Endereço" />
      <ScrollView>
        <View style={Style.screenSpace}>
          <View style={Style.registerCandidateData}>
            <InputData
              length={9}
              label="Cep"
              keyObject={"cep"}
              error={error}
              required={true}
              object={cep}
              valueDefault={adressAPI.cep ?? cep.cep}
              onChangeObject={setCep}
              type="adress"
              // mask={'cep'}
            />

            {displayInformations ||
              (route.params.edit && (
                <>
                  <InputData
                    key="rua"
                    label="Logradouro"
                    keyObject="rua"
                    object={rua}
                    onChangeObject={setRua}
                    valueDefault={adressAPI.logradouro ?? rua.rua}
                    type="adress"
                  />

                  <InputData
                    key="numero"
                    label="Número"
                    keyObject="numero"
                    object={numero}
                    valueDefault={numero.numero}
                    onChangeObject={setNumero}
                    type="adress"
                  />

                  <InputData
                    key="cicade"
                    label="Cidade"
                    keyObject="cidade"
                    object={cidade}
                    valueDefault={adressAPI.localidade ?? cidade.cidade}
                    onChangeObject={setCidade}
                    type="adress"
                  />

                  <InputData
                    key="bairro"
                    label="Bairro"
                    keyObject="bairro"
                    object={bairro}
                    onChangeObject={setBairro}
                    valueDefault={adressAPI.bairro ?? bairro.bairro}
                    type="adress"
                  />

                  <Select
                    label={"Selecione um estado"}
                    data={state}
                    keyObject="sigla"
                    object={sigla}
                    valueDefault={adressAPI.uf ?? sigla}
                    onChangeObject={setSigla}
                  />
                </>
              ))}

            <TouchableOpacity onPress={pesquisarCep} style={style.button}>
              <Text style={{ color: "#1E7596" }}>Pesquisar CEP</Text>
            </TouchableOpacity>
          </View>
          <ButtonSave disabled={buttonDisabled} functionClicked={saveData} />
          {/* <Button title="Pesquisar CEP" onPress={searchCEP} /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterAdress;

const style = StyleSheet.create({
  button: {
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1E7596",
    width: 120,
    height: 35,
    borderRadius: 5,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
