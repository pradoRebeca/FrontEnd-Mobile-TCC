import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/Navigation/StackNavigation";
import AuthProvider from "./src/contexts/AuthContext";

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
