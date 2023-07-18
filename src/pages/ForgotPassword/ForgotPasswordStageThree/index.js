import React, { useState, useEffect } from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Pressable, 
    Keyboard,
    Image } 
from "react-native";

//Puxando o estilo da Forgot Password One
import styles from "../ForgotPasswordStageOne/style";
import globalStyles from "../../../components/globalStyle/style";

export default function ForgotPasswordStageOne({ navigation, route }) {
    const [password, setPassword] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [showPass, setShowPass] = React.useState(true);
    const { currentPassword } = route.params;


    useEffect(() => setErrorPassword(null), [password]);

    const verificationInputs = () => {
        if (password == "") {
            setErrorPassword("Preencha sua senha.");
        } else if (currentPassword !== password) {
            setErrorPassword("As senhas não são iguais.");
        } else {
            setErrorPassword(null);
            navigation.navigate("ForgotPasswordSuccess");
        }
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
            <View>
                <Text allowFontScaling={false} style={globalStyles.title}>Agora pode confirmar a nova senha?</Text>

                <Text maxFontSizeMultiplier={1.2} style={styles.description}>
                    Assim conseguimos encontrar a conta 
                    que está vinculada ao E-mail informado.
                </Text>

                <View style={globalStyles.inputArea}>
                    <TextInput 
                        onChangeText={setPassword}
                        value={password}
                        style={[
                            styles.input, 
                            {borderColor: isFocused ? "#E06E78" : "#CED4DA80"},
                        ]}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={showPass}
                    />

                    <TouchableOpacity 
                        style={globalStyles.iconPassword}
                        onPress={() => setShowPass(!showPass)}
                    >
                        <Image 
                            source={require("../../../assets/icons/eye.png")}
                        />
                    </TouchableOpacity>
                </View>
                {errorPassword && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorPassword}</Text>}
            </View>

            <TouchableOpacity 
                style={globalStyles.buttonPrimary}
                onPress={() => verificationInputs()}
            >
                <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Avançar</Text>
            </TouchableOpacity>
        </Pressable>
    )
}
