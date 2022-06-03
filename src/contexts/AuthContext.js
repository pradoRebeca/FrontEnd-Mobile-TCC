import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axiosURL from "../API";
import { showMessage } from "../Functions";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [reloadPage, setRealoadPage] = useState()
  const [putReloadPage, setPutReloadPage] = useState()

  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const auth = (email, password) => {
    axiosURL
      .post(`auth/candidato`, {
        login: email,
        senha: password,
      })
      .then((response) => {
        setUser({
          id: response.data.id,
          name: response.data.nome,
        });
        navigation.navigate({ name: "CandidateHome" });
      })
      .catch((error) => {
        showMessage("Não foi possível fazer login, verifique seus dados.");
        console.log("error login =>", error.message);
      });
  };

  const singIn = (email, password) => {
    if (email !== "" && password !== "") {
      auth(email, password);
    } else {
      showMessage("usuario e senha não informados");
    }
  };

  return (
    <AuthContext.Provider value={{ singIn, user, idUser: user.id, setRealoadPage, setPutReloadPage, putReloadPage, reloadPage}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
