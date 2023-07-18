import React, { useState, useEffect, useContext } from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Pressable, 
    Keyboard } 
from "react-native";

import styles from "./style";
import globalStyles from "../../../components/globalStyle/style";
import { User } from "../../../contexts/User";
import url from "../../../../url-config";
import Loading from "../../../components/Loading";

export default function ForgotPasswordStageOne({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const { tokenAuth } = useContext(User);

    useEffect(() => setErrorEmail(null), [email]);

    const sendEmail = async () => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

        if(email == "" || !regexEmail.test(email)) {
            setErrorEmail("Preencha um e-mail válido");
            return false;
        } else {
            setLoading(true);

            try {
                let response = await fetch(`${url.urlBase}/auth/reset`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                });
    
                let responsePassword = await response.json();
    
                if(response.ok) {
                    setLoading(false);
                    navigation.navigate("ForgotPasswordSuccess");
                } else if(response.status == 404) {
                    setLoading(false);
                    setErrorEmail(responsePassword.message);
                } else {
                    setLoading(false);
                    console.log(responsePassword);
                    alert("Erro ao enviar dados. Verifique o console.");
                }
            } catch (error) {
                setLoading(false);
                console.log("Error Catch: " + error);
                alert("Erro Catch: Verificar console");
            }
        }
    }

    return (
        <>
            <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
                <View>
                    <Text allowFontScaling={false} style={globalStyles.title}>Qual seu E-mail?</Text>

                    <Text maxFontSizeMultiplier={1.2} style={styles.description}>
                        Assim conseguimos encontrar a conta 
                        que está vinculada ao E-mail informado.
                    </Text>

                    <TextInput 
                        onChangeText={setEmail}
                        value={email}
                        style={[
                            styles.input, 
                            {borderColor: isFocused ? "#E06E78" : "#CED4DA80"},
                        ]}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    {errorEmail && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorEmail}</Text>}
                </View>

                <TouchableOpacity 
                    style={globalStyles.buttonPrimary}
                    onPress={() => sendEmail()}
                >
                    <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Avançar</Text>
                </TouchableOpacity>
            </Pressable>

            {loading && <Loading />}
        </>
    )
}
