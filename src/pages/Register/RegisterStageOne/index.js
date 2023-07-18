import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    TextInput,
    Pressable,
    Keyboard,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

import styles from "./style";
import globalStyles from "../../../components/globalStyle/style";
import ModalTerms from "../../../components/ModalTerms";

export default function RegisterStageOne({ navigation }) {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => setErrorName(null), [name]);

    const verificationInputs = () => {
        if (name == "") {
            setErrorName("Preencha seu nome.");
        } else {
            setErrorName(null);
            navigation.navigate("RegisterStageTwo", { name });
        }
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
            <View>
                <Text allowFontScaling={false} style={globalStyles.title}>Qual seu nome e sobrenome?</Text>

                <Text style={styles.description}>Informe o seu nome e sobrenome.</Text>

                <TextInput 
                    onChangeText={setName}
                    value={name}
                    style={[
                        styles.input, 
                        {borderColor: isFocused ? "#E06E78" : "#CED4DA80"},
                    ]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                />
                {errorName && <Text style={globalStyles.errorMessage}>{errorName}</Text>}
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

            <ModalTerms 
                returnPage={() => {
                    navigation.navigate("Login")
                }}
            />
        </Pressable>
    )
}
