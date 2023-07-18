import React, { useState, useEffect } from "react";
import MaskInput from "react-native-mask-input";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Pressable, 
    Keyboard,
    ScrollView,
    Modal,
    Image,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

import styles from "../RegisterStageOne/style";
import globalStyles from "../../../components/globalStyle/style";
import url from "../../../../url-config";
import Loading from "../../../components/Loading";

export default function RegisterStageFive({ navigation, route }) {
    const [nacionality, setNacionality] = useState("");
    const [numberDocument, setNumberDocument] = useState("");
    const [issuingAgency, setIssuingAgency] = useState("");
    const [typeDocument, setTypeDocument] = useState("RG");
    const [birth, setBirth] = useState("");
    const [loading, setLoading] = useState(false);

    const [modalDocument, setModalDocument] = useState(false);

    const [errorNacionality, setErrorNacionality] = useState(null);
    const [errorNumberDocument, setErrorNumberDocument] = useState(null);
    const [errorIssuingAgency, setErrorIssuingAgency] = useState(null);
    const [errorBirth, setErrorBirth] = useState(null);

    const [isFocusedNacionality, setIsFocusedNacionality] = useState(false);
    const [isFocusedNumberDocument, setIsFocusedNumberDocument] = useState(false);
    const [isFocusedIssuingAgency, setIsFocusedIssuingAgency] = useState(false);
    const [isFocusedBirth, setIsFocusedBirth] = useState(false);

    const { name, cpf, email, phone, address, houseNumber, houseComplement, cep, city, state, country, neighborhood } = route.params;

    useEffect(() => setErrorNacionality(null), [nacionality]);
    useEffect(() => setErrorNumberDocument(null), [numberDocument]);
    useEffect(() => setErrorIssuingAgency(null), [issuingAgency]);
    useEffect(() => setErrorBirth(null), [birth]);

    async function finishRegister() {
        setLoading(true);

        if (nacionality == "") {
            setErrorNacionality("Preencha sua nacionalidade.");
            setLoading(false);
        }  else if(birth == "") {
            setErrorBirth("Preencha sua data de nascimento.");
            setLoading(false);
        } else if(numberDocument == "") {
            setErrorNumberDocument("Preencha a numeração do seu documento.");
            setLoading(false);
        } else if(issuingAgency == "") {
            setErrorIssuingAgency("Preencha local de expedição do seu documento.");
            setLoading(false);
        } else {            
            try {
                let response = await fetch(`${url.urlBase}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        cpf: cpf,
                        date_birth: `${String(birth).split("/")[2]}-${String(birth).split("/")[1]}-${String(birth).split("/")[0]}`,
                        nationality: nacionality,
                        phone: phone,
                        identity_document: numberDocument,
                        identity_document_type: typeDocument,
                        issuing_agency: issuingAgency,
                        address: address,
                        house_number: houseNumber,
                        house_complement: houseComplement,
                        zip_code: cep,
                        city: city,
                        state: state,
                        country: country,
                        neighborhood: neighborhood,
                    }),
                });

                const responseJson = await response.json();
                
                if(response.ok) {
                    setLoading(false);
                    navigation.navigate("RegisterSuccess");
                } else {
                    setLoading(false);
                    alert("Dados incorretos ou já cadastrados")
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const typesDocument = [
        "RG",
        "CNH",
        "Passaporte",
    ];

    return (
        <View>
            <Pressable onPress={Keyboard.dismiss} style={[globalStyles.container, styles.container]}>
                <ScrollView style={{ height: "93%" }}>
                    <Text allowFontScaling={false} style={globalStyles.title}>Informe sua documentação</Text>

                    <Text maxFontSizeMultiplier={1.2} style={{ color: "#ADB5BD", fontSize: 12, marginBottom: 20, fontFamily: "SourceSansPro-Regular"}}>Campos obrigatórios (*)</Text>

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Nacionalidade*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setNacionality}
                            value={nacionality}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedNacionality ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedNacionality(true)}
                            onBlur={() => setIsFocusedNacionality(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorNacionality && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNacionality}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Data de Nascimento*</Text>

                    <View style={globalStyles.inputArea}>
                        <MaskInput 
                            onChangeText={(masked, unmasked) => setBirth(masked)}
                            value={birth}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedBirth ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedBirth(true)}
                            onBlur={() => setIsFocusedBirth(false)}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,]}
                        />
                    </View>
                    {errorBirth && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorBirth}</Text>}

                    <TouchableOpacity 
                        style={[styles.formField, {position: "relative",}]}
                        onPress={() => setModalDocument(true)}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.label}>Tipo de documento*</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formInputSelect}>{typeDocument}</Text>
                        <Image
                            style={styles.arrowTypeDocument} 
                            source={require("../../../assets/icons/arrow-down.png")} 
                        />
                    </TouchableOpacity>

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Número do documento*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setNumberDocument}
                            value={numberDocument}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedNumberDocument ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedNumberDocument(true)}
                            onBlur={() => setIsFocusedNumberDocument(false)}
                            keyboardType="numeric"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                        />
                    </View>
                    {errorNumberDocument && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNumberDocument}</Text>}

                    <Text maxFontSizeMultiplier={1.2} style={styles.label}>Orgão Expedidor*</Text>

                    <View style={globalStyles.inputArea}>
                        <TextInput 
                            onChangeText={setIssuingAgency}
                            value={issuingAgency}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedIssuingAgency ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedIssuingAgency(true)}
                            onBlur={() => setIsFocusedIssuingAgency(false)}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="words"
                        />
                    </View>
                    {errorIssuingAgency && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorIssuingAgency}</Text>}
                </ScrollView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 20}
                >
                    <TouchableOpacity 
                        style={globalStyles.buttonPrimary}
                        onPress={() => finishRegister()}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Finalizar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Pressable>

            {loading && <Loading />}

            {modalDocument && 
                <View>
                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModal(!modalDocument)}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {height: 300, alignItems: "center", justifyContent: "center"}]}>
                                <TouchableOpacity
                                    onPress={() => setModalDocument(false)} 
                                    style={{ position: "absolute", top: 20, right: 30}}
                                >
                                    <Text maxFontSizeMultiplier={1.5} style={{ fontSize: 18, color: "#7D81D2"}}>X</Text>
                                </TouchableOpacity>
                                <ScrollView style={{ width: 200, height: 100, marginTop: 30}}>
                                    {typesDocument.map((type, index) => (
                                        <TouchableOpacity 
                                            key={index}
                                            style={styles.option}
                                            onPress={() => {
                                                setModalDocument(false);
                                                setTypeDocument(`${type}`);
                                            }}
                                        >
                                            <Text maxFontSizeMultiplier={1.2} style={{ color:"#979797" }}>{type}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </View>
    )
}
