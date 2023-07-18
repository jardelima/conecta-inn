import React, { useContext } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

import styles from "./style";
import Header from "../Header";
import globalStyles from "../globalStyle/style";
import { User } from "../../contexts/User/index";

export default function DrawerContent({ navigation }) {
    const { nameUser, setSignIn } = useContext(User);

    let cleanNameUser = nameUser.split(" ")[0];

    return (
        <>
            <Header
                src={require("../../assets/icons/exit.png")}
                openDrawerMenu="false"
            />
            <View style={styles.containerMenu}>
                <View>
                    <Text maxFontSizeMultiplier={1.2} style={styles.title}>Olá, {cleanNameUser}!</Text>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("MyData")}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.item}>Meus dados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.item}>Reservas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Token")}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.item}>Ativar Token</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={globalStyles.buttonSecondary}
                    onPress={() => {
                        setSignIn(false);
                        navigation.navigate("Login");
                    }}
                >
                    <Text maxFontSizeMultiplier={1.2} style={globalStyles.buttonSecondaryText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}
