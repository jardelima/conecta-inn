import React, { useContext } from "react";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../pages/Dashboard";
import DrawerContent from "../components/DrawerContent";
import InternalHotel from "../pages/InternalHotel";
import InternalMenu from "../pages/InternalMenu";
import InternalTour from "../pages/InternalTour";
import InternalServices from "../pages/InternalServices";
import InternalFridge from "../pages/InternalFridge";
import InternalPool from "../pages/InternalPool";
import InternalProduct from "../pages/InternalProduct";
import Cart from "../pages/Cart";
import CheckIn from "../pages/CheckIn";
import Chat from "../pages/Chat";
import CheckOut from "../pages/CheckOut";
import Extract from "../pages/Extract";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import Token from "../pages/Token/TokenActive";
import TokenSuccess from "../pages/Token/TokenSuccess";
import MyData from "../pages/MyData";
import ModalCheckin from "../pages/ModalCheckIn";
import Informative from "../pages/Informative";

import { User } from "../contexts/User";

const Drawer = createDrawerNavigator();

function RoutesDrawer() {
    const { signIn } = useContext(User);

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    width: "100%",
                },
            }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Token"
                component={Token}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="TokenSuccess"
                component={TokenSuccess}
                options={{
                    headerShown: false,
                }}
            />

            {signIn && <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />}

            <Drawer.Screen
                name="Informative"
                component={Informative}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalHotel"
                component={InternalHotel}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalMenu"
                component={InternalMenu}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalTour"
                component={InternalTour}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalServices"
                component={InternalServices}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalProduct"
                component={InternalProduct}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalPool"
                component={InternalPool}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="InternalFridge"
                component={InternalFridge}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="ModalCheckIn"
                component={ModalCheckin}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="CheckIn"
                component={CheckIn}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="MyData"
                component={MyData}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="CheckOut"
                component={CheckOut}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Extract"
                component={Extract}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    )
}

export default RoutesDrawer;
