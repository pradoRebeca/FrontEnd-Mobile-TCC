import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screen/Home";
import Login from "../screen/Login";
import Register from "../screen/Register";
import TabNavigation from "./TabNavigation";
import RegisterPersonalData from "../screen/RegisterPersonalData";
import RegisterAdress from "../screen/RegisterAdress";
import AcademicEducation from "../screen/AcademicEducation";
import ProfissionalExperience from "../screen/ProfessionalExperience";
import JobDetails from "../screen/JobDetails";
import CompanyProfile from "../screen/CompanyProfile";
import Filter from "../screen/Filter";
import ForgetPassword from "../screen/ForgetPassword";
import EmailValidation from "../screen/EmailValidation";
import RedefinePassword from "../screen/RedefinePassword";

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackAccessibilityLabel: "Voltar",
        headerStyle: { backgroundColor: "#1E7596" },
        headerShown: true,
        title: false,
        gestureEnabled: true,
        headerTintColor: "#1E7596",
        // back: { color: "white" },
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
        {/* <Stack.Screen
        name="Exemplo Imagem"
        component={ImageView}
        // options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        options={{ headerTransparent: true }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTransparent: true }}
        component={Register}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CandidateHome"
        component={TabNavigation}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="RegisterPersonalData"
        component={RegisterPersonalData}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Cadastrar Endereço"
        component={RegisterAdress}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Formação Academica"
        component={AcademicEducation}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Experiencia Profissional"
        component={ProfissionalExperience}
      />
      {/* <Stack.Screen
        name="Informacoes Adicionais"
        options={{ headerShown: true }}
        component={OtherInformation}
      /> */}
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Detalhes da Vaga"
        component={JobDetails}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Perfil da Empresa"
        component={CompanyProfile}
      />
      <Stack.Screen
        options={{ headerTintColor: "#DCEBF2" }}
        name="Filtrar"
        component={Filter}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="Esqueci a senha"
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="Validacao email"
        component={EmailValidation}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="Redefinicao de senha"
        component={RedefinePassword}
      />
      {/* <Stack.Screen
       options={{ headerShow: false }}
        // options={({ navigation }) => ({
        //   headerTitle: () => (
        //     <SearchBar />
        //   ),
        // })}
        name="Pesquisar"
        component={Search}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigation;
