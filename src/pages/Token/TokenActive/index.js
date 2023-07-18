import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Pressable,
    Keyboard,
    StatusBar,
} from "react-native";

import styles from "./style";
import globalStyles from "../../../components/globalStyle/style";
import url from "../../../../url-config";
import { User } from "../../../contexts/User";
import Loading from "../../../components/Loading";

export default function Token({ navigation }) {
    const [token, setToken] = useState("");
    const [tokenError, setTokenError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => setTokenError(null), [token]);

    const { tokenAuth, setTokenHotel } = useContext(User);

    async function activeToken() {
        if(token !== "") {
            setLoading(true);

            try {
                let response = await fetch(`${url.urlBase}/reservation/active`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                    body: JSON.stringify({
                        reservation_token: token,
                    }),
                });
        
                let tokenResponse = await response.json();
    
                if(response.ok) {
                    setTokenHotel(tokens => [...tokens, token]);
                    setLoading(false);
                    setToken("");
                    navigation.navigate("TokenSuccess");
                } else {
                    setLoading(false);
                    setTokenError(tokenResponse)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setTokenError("Campo vazio.");
        }
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={{flex: 1, backgroundColor: "#fff"}}>
            <StatusBar backgroundColor={loading ?  "#7073b5" : "#7D81D2"} />

            <View style={styles.header}>
                <Text allowFontScaling={false} style={styles.headerTitle}>Ativar Token</Text>
            </View>

            <TouchableOpacity 
                style={styles.buttonReturn}
                onPress={() => navigation.navigate("Dashboard")}
            >
                <Image 
                    source={require("../../../assets/icons/arrow-left.png")}
                />
            </TouchableOpacity>


            <View style={styles.wrapper}>
                <View style={styles.containerInput}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleInput}>Qual é o seu token?</Text>

                    <Text maxFontSizeMultiplier={1.2} style={styles.textInput}>Digite o token para ativar sua reserva.</Text>

                    <TextInput
                        style={[
                            styles.input, 
                            {borderColor: isFocused || tokenError ? "#E06E78" : "#CED4DA80"}
                        ]}
                        value={token}
                        onChangeText={setToken}
                        keyboardType="default"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                    />
                    {tokenError && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{tokenError}</Text>}
                </View>

                <TouchableOpacity 
                    onPress={() => activeToken()}
                    style={styles.tokenButton}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.tokenButtonText}>Ativar token</Text>
                </TouchableOpacity>
            </View>

            {loading && <Loading />}
        </Pressable>
    )
}
