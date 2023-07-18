import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RoutesConfigs from "./src/routes/routesConfig";

import UserProvider from "./src/contexts/User";

const App = () => {
    return (
        <NavigationContainer>
            <UserProvider>
                <RoutesConfigs />
            </UserProvider>
        </NavigationContainer>
    );
};

export default App;
