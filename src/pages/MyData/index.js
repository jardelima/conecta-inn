import React, { useState, useEffect, useContext } from "react";
import MaskInput from "react-native-mask-input";
import { 
    View, 
    Text,
    TouchableOpacity, 
    Image,
    TextInput,
    ScrollView,
    StatusBar,
    Modal,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

import globalStyles from "../../components/globalStyle/style";
import Header from "../../components/Header";
import styles from "./style";
import url from "../../../url-config";
import { User } from "../../contexts/User";
import Loading from "../../components/Loading";

export default function MyData({ navigation, route }) {
    const { 
        tokenAuth, 
        setNameUser,
        nameUser, 
        setStatusReservation,
        idReservation, 
    } = useContext(User);

    const [name, setName] = useState(nameUser);
    const [dateBirth, setDateBirth] = useState("");
    const [nacionality, setNacionality] = useState(null);
    const [phone, setPhone] = useState(null);
    const [typeDocument, setTypeDocument] = useState("Selecione o tipo de documento");
    const [numberDocument, setNumberDocument] = useState(null);
    const [issuingAgency, setIssuingAgency] = useState(null);
    const [address, setAddress] = useState(null);
    const [houseNumber, setHouseNumber] = useState(null);
    const [houseComplement, setHouseComplement] = useState(null);
    const [cep, setCep] = useState("");
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);
    const [neighborhood, setNeighborhood] = useState(null);

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const [modalDocument, setModalDocument] = useState(false);

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNumberDocument, setIsFocusedNumberDocument] = useState(false);
    const [isFocusedDateBirth, setIsFocusedDateBirth] = useState(false);
    const [isFocusedNacionality, setIsFocusedNacionality] = useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = useState(false);
    const [isFocusedTypeDocument, setIsFocusedTypeDocument] = useState(false);
    const [isFocusedIssuingAgency, setIsFocusedIssuingAgency] = useState(false);
    const [isFocusedAddress, setIsFocusedAddress] = useState(false);
    const [isFocusedHouseNumber, setIsFocusedHouseNumber] = useState(false);
    const [isFocusedHouseComplement, setIsFocusedHouseComplement] = useState(false);
    const [isFocusedCep, setIsFocusedCep] = useState(false);
    const [isFocusedCity, setIsFocusedCity] = useState(false);
    const [isFocusedState, setIsFocusedState] = useState(false);
    const [isFocusedCountry, setIsFocusedCountry] = useState(false);
    const [isFocusedNeighborhood, setIsFocusedNeighborhood] = useState(false);

    const [errorName, setErrorName] = useState(null);
    const [errorDateBirth, setErrorDateBirth] = useState(false);
    const [errorNacionality, setErrorNacionality] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorTypeDocument, setErrorTypeDocument] = useState(false);
    const [errorNumberDocument, setErrorNumberDocument] = useState(false);
    const [errorIssuingAgency, setErrorIssuingAgency] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorCep, setErrorCep] = useState(false);
    const [errorCity, setErrorCity] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [errorCountry, setErrorCountry] = useState(false);
    const [errorNeighborhood, setErrorNeighborhood] = useState(false);
    const [errorHouseNumber, setErrorHouseNumber] = useState(false);

    useEffect(() => setErrorName(null), [name]);
    useEffect(() => setErrorDateBirth(null), [dateBirth]);
    useEffect(() => setErrorNacionality(null), [nacionality]);
    useEffect(() => setErrorPhone(null), [phone]);
    useEffect(() => setErrorTypeDocument(null), [typeDocument]);
    useEffect(() => setErrorNumberDocument(null), [numberDocument]);
    useEffect(() => setErrorIssuingAgency(null), [issuingAgency]);
    useEffect(() => setErrorAddress(null), [address]);
    useEffect(() => setErrorCep(null), [cep]);
    useEffect(() => setErrorCity(null), [city]);
    useEffect(() => setErrorState(null), [state]);
    useEffect(() => setErrorCountry(null), [country]);
    useEffect(() => setErrorNeighborhood(null), [neighborhood]);
    useEffect(() => setErrorHouseNumber(null), [houseNumber]);

    async function getUserInfo() {
        setLoading(true);

        let response = await fetch(`${url.urlBase}/user/information`, {
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Authorization": "Bearer " + tokenAuth,
            },
        });

        let responseDate = await response.json();

        if(response.ok) {
            let cleanDateBirth = `${responseDate[0].userapp.date_birth.split(" ")[0].split("-")[2]}/${responseDate[0].userapp.date_birth.split(" ")[0].split("-")[1]}/${responseDate[0].userapp.date_birth.split(" ")[0].split("-")[0]}`;

            setDateBirth(cleanDateBirth);
            setNacionality(responseDate[0].userapp.nationality);
            setPhone(responseDate[0].userapp.phone);
            setAddress(responseDate[0].userapp.address);
            setCep(responseDate[0].userapp.zip_code);
            setCity(responseDate[0].userapp.city);
            setState(responseDate[0].userapp.state);
            setCountry(responseDate[0].userapp.country);
            setTypeDocument(responseDate[0].userapp.identity_document_type);
            setNumberDocument(responseDate[0].userapp.identity_document);
            setIssuingAgency(responseDate[0].userapp.issuing_agency);
            setHouseNumber(responseDate[0].userapp.house_number);
            setHouseComplement(responseDate[0].userapp.house_complement);
            setNeighborhood(responseDate[0].userapp.neighborhood);

            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    async function updateUserInfo() {
        setLoading(true);

        if(name == "") {
            setErrorName("Digite seu nome e sobrenome");
            setLoading(false);
        } else if(dateBirth == "") {
            setErrorDateBirth("Digite sua data de nascimento");
            setLoading(false);
        } else if(nacionality == "") {
            setErrorNacionality("Digite sua nacionalidade");
            setLoading(false);
        } else if(phone == "") {
            setErrorPhone("Digite seu telefone");
            setLoading(false);
        } else if(numberDocument == "") {
            setErrorNumberDocument("Digite o número do seu documento");
            setLoading(false);
        } else if(issuingAgency == "") {
            setErrorIssuingAgency("Digite o orgão expedidor do seu documento");
            setLoading(false);
        } else if(address == "") {
            setErrorAddress("Digite seu endereço");
            setLoading(false);
        } else if(cep == "") {
            setErrorCep("Digite seu CEP");
            setLoading(false);
        } else if(city == "") {
            setErrorCity("Digite sua cidade");
            setLoading(false);
        } else if(state == "") {
            setErrorState("Digite seu estado");
            setLoading(false);
        } else if(country == "") {
            setErrorCountry("Digite o seu País");
            setLoading(false);
        } else if(houseNumber == "") {
            setErrorHouseNumber("Digite o número de sua Residência");
            setLoading(false);
        } else if(neighborhood == "") {
            setErrorNeighborhood("Digite o seu bairro");
            setLoading(false);
        } else {
            let response = await fetch(`${url.urlBase}/user/information`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
                body: JSON.stringify({
                    name: name,
                    date_birth: `${String(dateBirth).split("/")[2]}-${String(dateBirth).split("/")[1]}-${String(dateBirth).split("/")[0]}`,
                    nationality: nacionality,
                    phone: phone,
                    identity_document: numberDocument,
                    identity_document_type: typeDocument,
                    issuing_agency: issuingAgency,
                    address: address,
                    zip_code: cep,
                    city: city,
                    state: state,
                    country: country,
                    house_number: houseNumber,
                    house_complement: houseComplement,
                    neighborhood: neighborhood,
                }),
            });

            let responseDate = await response.json();

            if(response.ok) {
                setLoading(false);
                setModal(true);
                setNameUser(name);
            } else {
                setLoading(false);
            }
        }
    }

    async function getAddress() {
        setLoading(true);

        try {
            let response = await fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`, {
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

    useEffect(() => {
        getUserInfo();
    }, [tokenAuth]);

    const typesDocument = [
        "RG",
        "CNH",
        "Passaporte",
    ];

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={loading ?  "#7073b5" : modal ? "#7073b5" : "#7D81D2"} />

            <ScrollView>
                <View style={styles.buttonReturnContainer}>
                    <TouchableOpacity 
                        style={globalStyles.buttonReturn}
                        onPress={() => { navigation.navigate("Dashboard") }}
                    >
                        <Image 
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text maxFontSizeMultiplier={1.5} style={styles.title}>Altere seus dados</Text>

                    <Text maxFontSizeMultiplier={1.2} style={{ color: "#33303E", fontSize: 12, marginTop: 20, fontFamily: "SourceSansPro-Regular"}}>Campos obrigatórios (*)</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Nome Completo*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedName ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setName}
                            value={name}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedName(true)}
                            onBlur={() => setIsFocusedName(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorName && <Text style={globalStyles.errorMessage}>{errorName}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Data de Nascimento*</Text>
                        <MaskInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedDateBirth ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={(masked, unmasked) => setDateBirth(masked)}
                            value={dateBirth}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedDateBirth(true)}
                            onBlur={() => setIsFocusedDateBirth(false)}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                            mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,]}
                        />
                        {errorNacionality && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNacionality}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Telefone*</Text>
                        <MaskInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedPhone ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={(masked, unmasked) => setPhone(masked)}
                            value={phone}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedPhone(true)}
                            onBlur={() => setIsFocusedPhone(false)}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                            mask={["(",/\d/,/\d/,")", " ", /\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,]}
                        />
                        {errorPhone && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorPhone}</Text>}
                    </View>

                    <TouchableOpacity 
                        style={styles.formField}
                        onPress={() => setModalDocument(true)}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Tipo de documento*</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formInputSelect}>{typeDocument}</Text>
                        <Image
                            style={styles.arrowTypeDocument} 
                            source={require("../../assets/icons/arrow-down.png")} 
                        />
                    </TouchableOpacity>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Número do documento*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedNumberDocument ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setNumberDocument}
                            value={numberDocument}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedNumberDocument(true)}
                            onBlur={() => setIsFocusedNumberDocument(false)}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                        {errorNumberDocument && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNumberDocument}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Orgão expedidor*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedIssuingAgency ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setIssuingAgency}
                            value={issuingAgency}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedIssuingAgency(true)}
                            onBlur={() => setIsFocusedIssuingAgency(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorIssuingAgency && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorIssuingAgency}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>CEP*</Text>
                        <MaskInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedCep ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={(masked, unmasked) => setCep(masked)}
                            value={cep}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedCep(true)}
                            onBlur={() => {
                                getAddress();
                                setIsFocusedCep(false); 
                            }}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                            mask={[/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,]}
                        />
                        {errorCep && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCep}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Rua/Avenida*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedAddress ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setAddress}
                            value={address}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedAddress(true)}
                            onBlur={() => setIsFocusedAddress(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorAddress && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorAddress}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Número da Residência*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedHouseNumber ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setHouseNumber}
                            value={houseNumber}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedHouseNumber(true)}
                            onBlur={() => setIsFocusedHouseNumber(false)}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                        {errorHouseNumber && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorHouseNumber}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Complemento</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedHouseComplement ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setHouseComplement}
                            value={houseComplement}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedHouseComplement(true)}
                            onBlur={() => setIsFocusedHouseComplement(false)}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Bairro*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedNeighborhood ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setNeighborhood}
                            value={neighborhood}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedNeighborhood(true)}
                            onBlur={() => setIsFocusedNeighborhood(false)}
                            underlineColorAndroid="transparent"
                            autoCapitalize="words"
                        />
                        {errorNeighborhood && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNeighborhood}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Cidade*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedCity ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setCity}
                            value={city}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedCity(true)}
                            onBlur={() => setIsFocusedCity(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorCity && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCity}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Estado*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedState ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setState}
                            value={state}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedState(true)}
                            onBlur={() => setIsFocusedState(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorState && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorState}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>País*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedCountry ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setCountry}
                            value={country}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedCountry(true)}
                            onBlur={() => setIsFocusedCountry(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorCountry && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCountry}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Nacionalidade*</Text>
                        <TextInput 
                            style={[
                                styles.formInput, 
                                {borderColor: isFocusedNacionality ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onChangeText={setNacionality}
                            value={nacionality}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedNacionality(true)}
                            onBlur={() => setIsFocusedNacionality(false)}
                            underlineColorAndroid="transparent"
                        />
                        {errorNacionality && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNacionality}</Text>}
                    </View>
                </View>
            </ScrollView>
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 20}
            >       
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonCheckIn}
                        onPress={() => updateUserInfo()}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={styles.buttonCheckInText}>Alterar dados</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {loading && <Loading />}

            {modal && 
                <View>
                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModal(!modal)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.modalTitleBox}>
                                    <Text allowFontScaling={false} style={styles.modalTitle}>Dados alterados com sucesso!</Text>
                                    <Image
                                        source={require("../../assets/icons/check-in-ok.png")}
                                        style={{ marginLeft: 10, width: 16, height: 16, }}
                                    />
                                </View>


                                <TouchableOpacity 
                                    style={styles.modalButton}
                                    onPress={() => {
                                        setModal(false);
                                        navigation.navigate("Dashboard");
                                    }}
                                >
                                    <Text maxFontSizeMultiplier={1.5} style={styles.modalButtonText}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            }

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
                                    <Text maxFontSizeMultiplier={1.2} style={{ fontSize: 18, color: "#7D81D2"}}>X</Text>
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
                                            <Text maxFontSizeMultiplier={1.2} style={{ color:"#979797", }}>{type}</Text>
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
