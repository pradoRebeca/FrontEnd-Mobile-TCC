import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});


    const singIn = (email, password) => {
        if(email !== '' && password !== ''){
            setUser({
                email: email,
                senha: '12'
            })

            navigation.navigate({ name: "CandidateHome" });
        }else {
            console.log('usuario e senha não informados')
        }
    }


  return <AuthContext.Provider value={{idUser : '20', singIn, user}}>
      {children}
      </AuthContext.Provider>;
};

export default AuthProvider