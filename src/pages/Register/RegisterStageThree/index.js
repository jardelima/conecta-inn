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

import styles from "../RegisterStageOne/style";
import globalStyles from "../../../components/globalStyle/style";

export default function RegisterStageThree({ route, navigation }) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPhone, setErrorPhone] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = useState(false);

    const { name, cpf } = route.params;

    useEffect(() => setErrorEmail(null), [email]);
    useEffect(() => setErrorPhone(null), [phone]);

    const verificationInputs = () => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

        if (email == "" || !regexEmail.test(email)) {
            setErrorEmail("Preencha seu e-mail corretamente.");
        } else if(phone == "") {
            setErrorPhone("Preencha seu Telefone.");
        } else {
            setErrorEmail(null);
            setErrorPhone(null);
            navigation.navigate("RegisterStageFour", { name, cpf, email, phone });
        }
    }

    return (  
        <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
            <View>
                <Text allowFontScaling={false} style={globalStyles.title}>Contatos</Text>

                <Text style={styles.description}>Assim conseguimos encontrar a conta que está vinculada ao seu e-mail e telefone informado.</Text>

                <Text maxFontSizeMultiplier={1.2} style={styles.requiredField}>Campos obrigatórios (*)</Text>

                <Text maxFontSizeMultiplier={1.2} style={styles.label}>E-mail*</Text>

                <View style={globalStyles.inputArea}>
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
                
                <Text maxFontSizeMultiplier={1.2} style={styles.label}>Telefone*</Text>

                <View style={globalStyles.inputArea}>
                    <MaskInput 
                        onChangeText={(masked, unmasked) => setPhone(masked)}
                        value={phone}
                        style={[
                            styles.input, 
                            {borderColor: isFocusedPhone ? "#E06E78" : "#CED4DA80"},
                        ]}
                        onFocus={() => setIsFocusedPhone(true)}
                        onBlur={() => setIsFocusedPhone(false)}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        mask={["(",/\d/,/\d/,")", " ",/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,]}
                    />
                </View>
                {errorPhone && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorPhone}</Text>}
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 20}
            >
                <TouchableOpacity 
                    style={globalStyles.buttonPrimary}
                    onPress={() => {
                        verificationInputs(); 
                    }}
                >
                    <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Avançar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Pressable>
    )
}
