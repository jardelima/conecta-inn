import React, { useState, useEffect } from "react";
import MaskInput from "react-native-mask-input";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

import styles from "../RegisterStageOne/style";
import globalStyles from "../../../components/globalStyle/style";
import Loading from "../../../components/Loading";

export default function RegisterStageFour({ navigation, route }) {
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [houseComplement, setHouseComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorAddress, setErrorAddress] = useState(null);
    const [errorCep, setErrorCep] = useState(null);
    const [errorCity, setErrorCity] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const [errorCountry, setErrorCountry] = useState(null);
    const [errorNeighborhood, setErrorNeighborhood] = useState(null);

    const [isFocusedAddress, setIsFocusedAddress] = useState(false);
    const [isFocusedHouseNumber, setIsFocusedHouseNumber] = useState(false);
    const [isFocusedHouseComplement, setIsFocusedHouseComplement] = useState(false);
    const [isFocusedCep, setIsFocusedCep] = useState(false);
    const [isFocusedCity, setIsFocusedCity] = useState(false);
    const [isFocusedState, setIsFocusedState] = useState(false);
    const [isFocusedCountry, setIsFocusedCountry] = useState(false);
    const [isFocusedNeighborhood, setIsFocusedNeighborhood] = useState(false);

    const { name, cpf, email, phone } = route.params;

    useEffect(() => setErrorAddress(null), [address]);
    useEffect(() => setErrorCep(null), [cep]);
    useEffect(() => setErrorCity(null), [city]);
    useEffect(() => setErrorState(null), [state]);
    useEffect(() => setErrorCountry(null), [country]);
    useEffect(() => setErrorNeighborhood(null), [neighborhood]);

    const verificationInputs = () => {
        if (address == "") {
            setErrorAddress("Preencha seu endereço.");
        } else if(cep == "") {
            setErrorCep("Preencha seu CEP.");
        } else if(city == "") {
            setErrorCity("Preencha sua cidade.");
        } else if(state == "") {
            setErrorState("Preencha seu estado");
        } else if(country == "") {
            setErrorCountry("Preencha seu País");
        } else if(neighborhood == "") {
            setErrorNeighborhood("Preencha seu bairro");
        } else {
            setErrorAddress(null);
            setErrorCep(null);
            setErrorCity(null);
            setErrorState(null);
            setErrorCountry(null);

            navigation.navigate("RegisterStageFive", { 
                name, 
                cpf, 
                email, 
                phone, 
                address, 
                houseNumber, 
                houseComplement, 
                cep, 
                city, 
                state, 
                country,
                neighborhood, 
            });
        }
    }

    async function getAddress() {
        setLoading(true);

        let cleanCep = cep.replace("-", "");

        try {
            let response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            let responseAddress = await response.json();

            setAddress(responseAddress.logradouro);
            setCity(responseAddress.localidade);
            setNeighborhood(responseAddress.bairro);
            setState(responseAddress.uf);
            setCountry("Brasil");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <View style={[globalStyles.container, styles.container]}>
                <ScrollView style={{ height: "93%"}}>
                    <Text allowFontScaling={false} style={globalStyles.title}>Informe seu endereço</Text>

                    <Text maxFontSizeMultiplier={1.2} style={styles.requiredField}>Campos obrigatórios (*)</Text>

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>CEP*</Text>

                    <View style={globalStyles.inputArea}>
                        <MaskInput 
                            onChangeText={(masked, unmasked) => setCep(masked)}
                            value={cep}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedCep ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedCep(true)}
                            onBlur={() => {
                                getAddress();
                                setIsFocusedCep(false); 
                            }}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            mask={[/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,]}
                        />
                    </View>
                    {errorCep && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCep}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Rua/Avenida*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setAddress}
                            value={address}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedAddress ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedAddress(true)}
                            onBlur={() => setIsFocusedAddress(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorAddress && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorAddress}>{errorAddress}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Número da Residência*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setHouseNumber}
                            value={houseNumber}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedHouseNumber ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedHouseNumber(true)}
                            onBlur={() => setIsFocusedHouseNumber(false)}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                        />
                    </View>

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Complemento</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setHouseComplement}
                            value={houseComplement}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedHouseComplement ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedHouseComplement(true)}
                            onBlur={() => setIsFocusedHouseComplement(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                        />
                    </View>
                    {errorAddress && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorAddress}>{errorAddress}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Bairro*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setNeighborhood}
                            value={neighborhood}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedNeighborhood ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedNeighborhood(true)}
                            onBlur={() => setIsFocusedNeighborhood(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorNeighborhood && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorAddress}>{errorNeighborhood}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Cidade*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setCity}
                            value={city}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedCity ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedCity(true)}
                            onBlur={() => setIsFocusedCity(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorCity && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCity}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Estado*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setState}
                            value={state}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedState ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedState(true)}
                            onBlur={() => setIsFocusedState(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorState && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorState}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>País*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setCountry}
                            value={country}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedCountry ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedCountry(true)}
                            onBlur={() => setIsFocusedCountry(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorCountry && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCountry}</Text>}
                </ScrollView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 20}
                >
                    <TouchableOpacity 
                        style={[globalStyles.buttonPrimary]}
                        onPress={() => verificationInputs()}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Avançar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>

            {loading && <Loading />}
        </>
    )
}
