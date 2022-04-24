import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import Home from "../screen/Home";
import Login from "../screen/Login";
import Register from "../screen/Register";
import TabNavigation from "./TabNavigation";
import RegisterPersonalData from "../screen/RegisterPersonalData";
import RegisterAdress from "../screen/RegisterAdress";
import AcademicEducation from "../screen/AcademicEducation";
import ProfissionalExperience from "../screen/ProfessionalExperience";
import OtherInformation from "../screen/OtherInformation";
import JobDetails from "../screen/JobDetails";
import CompanyProfile from "../screen/CompanyProfile";
import Filter from "../screen/Filter";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import SaveJob from "../screen/SaveJob";

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackAccessibilityLabel: "Voltar",
        headerStyle: { backgroundColor: "#1E7596" },
        headerShown: false,
        title: false,
        gestureEnabled: true,
        back: { color: "white" },
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Login"
        options={{ headerShown: true, headerTransparent: true }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: true, headerTransparent: true }}
        component={Register}
      />
      <Stack.Screen
        name="CandidateHome"
        component={TabNavigation}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="RegisterPersonalData"
        options={{ headerShown: true }}
        component={RegisterPersonalData}
      />
      <Stack.Screen
        name="Cadastrar Endereço"
        options={{ headerShown: true }}
        component={RegisterAdress}
      />
      <Stack.Screen
        name="Formação Academica"
        options={{ headerShown: true }}
        component={AcademicEducation}
      />
      <Stack.Screen
        name="Experiencia Profissional"
        options={{ headerShown: true }}
        component={ProfissionalExperience}
      />
      <Stack.Screen
        name="Informacoes Adicionais"
        options={{ headerShown: true }}
        component={OtherInformation}
      />
      <Stack.Screen
        name="Detalhes da Vaga"
        options={{ headerShown: true }}
        component={JobDetails}
      />
      <Stack.Screen name="Perfil da Empresa" component={CompanyProfile} />
      <Stack.Screen
        name="Filtrar"
        options={{ headerShown: true }}
        component={Filter}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
