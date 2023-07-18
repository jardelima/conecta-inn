import React, { useState, useEffect } from "react";
import MaskInput from "react-native-mask-input";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Pressable, 
    Keyboard,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

//Puxando o estilo da Register Stage One
import styles from "../RegisterStageOne/style";
import globalStyles from "../../../components/globalStyle/style";

export default function RegisterStageTwo({ route, navigation }) {
    const [cpf, setCpf] = useState("");
    const [errorCpf, setErrorCpf] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    
    const { name } = route.params;

    useEffect(() => setErrorCpf(null), [cpf]);

    const verificationInputs = () => {
        if (cpf == "") {
            setErrorCpf("Preencha seu CPF.");
        } else if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
            setErrorCpf("Preencha corretamente seu CPF.");
        } else {
            setErrorCpf(null);
            navigation.navigate("RegisterStageThree", { name, cpf });
        }
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
            <View>
                <Text allowFontScaling={false} style={globalStyles.title}>Qual seu CPF?</Text>

                <Text style={styles.description}>Informe o seu CPF.</Text>

                <MaskInput 
                    onChangeText={(masked, unmasked) => setCpf(masked)}
                    value={cpf}
                    style={[
                        styles.input, 
                        {borderColor: isFocused ? "#E06E78" : "#CED4DA80"},
                    ]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    mask={[/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/,]}
                />
                {errorCpf && <Text style={globalStyles.errorMessage}>{errorCpf}</Text>}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 20}
            >
                <TouchableOpacity 
                    style={globalStyles.buttonPrimary}
                    onPress={() => verificationInputs()}
                >
                    <Text style={globalStyles.buttonPrimaryText}>Avançar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Pressable>
    )
}
