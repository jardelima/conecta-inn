import React, { useState, useEffect, useContext } from "react";
import MaskInput from "react-native-mask-input";
import { 
    View,
    Text, 
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    StatusBar,
    Modal,
    KeyboardAvoidingView,
} from "react-native";

import styles from "./style";
import globalStyles from "../../components/globalStyle/style";
import Header from "../../components/Header";
import { User } from "../../contexts/User";
import url from "../../../url-config";
import Loading from "../../components/Loading";

export default function Payment({ navigation, route }) {
    const { localName, localAddress, listProducts, extract } = route.params;

    const [cardCredit, setCardCredit] = useState(false);
    const [cardDebt, setCardDebt] = useState(true);
    const [nameCard, setNameCard] = useState("");
    const [numberCard, setNumberCard] = useState("");
    const [validateCard, setValidateCard] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalCard, setModalCard] = useState(false);

    const [isFocusedNameCard, setIsFocusedNameCard] = useState(false);
    const [isFocusedNumberCard, setIsFocusedNumberCard] = useState(false);
    const [isFocusedValidateCard, setIsFocusedValidateCard] = useState(false);
    const [isFocusedCvv, setIsFocusedCvv] = useState(false);

    const [errorNameCard, setErrorNameCard] = useState(null);
    const [errorNumberCard, setErrorNumberCard] = useState(null);
    const [errorValidateCard, setErrorValidateCard] = useState(null);
    const [errorCvvCard, setErrorCvvCard] = useState(null);

    const {
        idReservation,
        idHotel,
        tokenAuth, 
        setStatusReservation,
        setUpdateReservations,
    } = useContext(User);

    useEffect(() => setErrorNameCard(null), [nameCard]);
    useEffect(() => setErrorNumberCard(null), [numberCard]);
    useEffect(() => setErrorValidateCard(null), [validateCard]);
    useEffect(() => setErrorCvvCard(null), [cvv]);

    async function sendPayment() {
        if(nameCard == "") {
            setErrorNameCard("Campo vazio ou incorreto");
        }

        if(numberCard == "") {
            setErrorNumberCard("Campo vazio ou incorreto");
        }

        if(validateCard == "") {
            setErrorValidateCard("Campo vazio ou incorreto");
        }

        if(cvv == "") {
            setErrorCvvCard("Campo vazio ou incorreto");
        }

        if(nameCard !== "" && numberCard !== "" && validateCard !== "" && cvv !== "") {
            setLoading(true);

            try {
                let responsePayment = await fetch(`${url.urlBase}/reservation/${idReservation}/check-out`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                    body: JSON.stringify({
                        card_type: cardDebt ? "debit" : "credit",
                        card_full_name: nameCard,
                        card_number: numberCard,
                        cvv: cvv,
                        card_validity: validateCard,
                    }),
                });

                const paymentResponse = await responsePayment.json();
                
                if(responsePayment.ok) {
                    setStatusReservation("Check-out");
                    setUpdateReservations(localName);
                    setLoading(false);
                    setModal(true);
                } else {
                    console.log(paymentResponse);
                    setLoading(false);
                    alert("Erro ao realizar pagamento");
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1,}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <Header
                    src={require("../../assets/icons/menu.png")}
                    openDrawerMenu="true"
                />

                <StatusBar backgroundColor={loading ?  "#7073b5" : modal ? "#7073b5" : "#7D81D2"} />

                <ScrollView style={styles.content}>
                    <TouchableOpacity
                        style={[globalStyles.buttonReturn, styles.buttonReturn]}
                        onPress={() => { 
                            if(extract) {
                                navigation.navigate("Extract", {
                                    localName, 
                                    localAddress, 
                                    listProducts 
                                });
                            } else {
                                navigation.navigate("CheckOut", {
                                    localName, 
                                    localAddress, 
                                    listProducts 
                                });
                            }
                        }}
                    >
                        <Image
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>

                    <View style={styles.containerTitle}>
                        <Text allowFontScaling={false} style={styles.title}>Pagamento</Text>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Chat", {
                                    chatInPayment: true,
                                    localName, 
                                    localAddress, 
                                    listProducts,
                                })
                            }}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.support}>Suporte</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.cardContainer}>
                            <TouchableOpacity
                                style={cardDebt ? styles.cardActive : styles.cardDisabled}
                                onPress={() => {
                                    setCardDebt(true);
                                    setCardCredit(false);
                                }}
                            >
                                <Text allowFontScaling={false} style={cardDebt ? styles.cardTextActive : styles.cardText}>Cartão de Débito</Text>
                            </TouchableOpacity>
        
                            <TouchableOpacity 
                                style={cardCredit ? styles.cardActive : styles.cardDisabled}
                                onPress={() => {
                                    setCardDebt(false);
                                    setCardCredit(true);
                                }}
                            >
                                <Text allowFontScaling={false} style={cardCredit ? styles.cardTextActive : styles.cardText}>Cartão de Crédito</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.cardForm}>
                        <View style={styles.formField}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Nome no cartão</Text>
                            <TextInput 
                                style={[
                                    styles.formInput, 
                                    {borderColor: isFocusedNameCard ? "#E06E78" : "#CED4DA80"},
                                ]}
                                onChangeText={setNameCard}
                                value={nameCard}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                onFocus={() => setIsFocusedNameCard(true)}
                                onBlur={() => setIsFocusedNameCard(false)}
                            />
                            {errorNameCard && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNameCard}</Text>}
                        </View>

                        <View style={styles.formField}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Número no cartão</Text>
                            <MaskInput 
                                style={[
                                    styles.formInput,  
                                    {borderColor: isFocusedNumberCard ? "#E06E78" : "#CED4DA80"},
                                ]}
                                onChangeText={(masked, unmasked) => setNumberCard(unmasked)}
                                value={numberCard}
                                autoCorrect={false}
                                keyboardType="numeric"
                                underlineColorAndroid="transparent"
                                onFocus={() => {setIsFocusedNumberCard(true)}}
                                onBlur={() => {setIsFocusedNumberCard(false)}}
                                mask={[/\d/,/\d/,/\d/,/\d/, " ", /\d/,/\d/,/\d/,/\d/, " ", /\d/,/\d/,/\d/,/\d/, " ", /\d/,/\d/,/\d/,/\d/]}
                            />
                            {errorNumberCard && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorNumberCard}</Text>}
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={[styles.formField, {width: "46%"}]}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Validade</Text>
                                <MaskInput 
                                    style={[
                                        styles.formInput, 
                                        {borderColor: isFocusedValidateCard ? "#E06E78" : "#CED4DA80"},
                                    ]}
                                    onChangeText={(masked, unmasked) => setValidateCard(masked)}
                                    value={validateCard}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => {setIsFocusedValidateCard(true)}}
                                    onBlur={() => {setIsFocusedValidateCard(false)}}
                                    mask={[/\d/,/\d/,"/",/\d/,/\d/,]}
                                />
                                {errorValidateCard && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorValidateCard}</Text>}
                            </View>  

                            <View style={[styles.formField, {width: "46%"}]}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>CVV</Text>
                                <MaskInput 
                                    style={[
                                        styles.formInput, 
                                        {borderColor: isFocusedCvv ? "#E06E78" : "#CED4DA80"},
                                    ]}
                                    onChangeText={(masked, unmasked) => setCvv(masked)}
                                    value={cvv}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => {setIsFocusedCvv(true)}}
                                    onBlur={() => {setIsFocusedCvv(false)}}
                                    mask={[/\d/,/\d/,/\d/]}
                                />
                                {errorCvvCard && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorCvvCard}</Text>}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.containerButton}>
                <TouchableOpacity 
                    style={globalStyles.buttonPrimary}
                    onPress={() => sendPayment()}
                >
                    <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonPrimaryText}>Confirmar</Text>
                </TouchableOpacity>
            </View>

            {loading && <Loading />}

            {modalCard && 
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
                                    <Text maxFontSizeMultiplier={1.2} style={[styles.modalTitle, {fontSize: 16}]}>Dados do cartão salvos com sucesso!</Text>
                                </View>


                                <TouchableOpacity 
                                    style={styles.modalButton}
                                    onPress={() => {
                                        setModalCard(false);
                                    }}
                                >
                                    <Text maxFontSizeMultiplier={1.5} style={styles.modalButtonText}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            }

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
                                    <Text allowFontScaling={false} style={styles.modalTitle}>Check-out feito com sucesso</Text>
                                    <Image
                                        source={require("../../assets/icons/check-in-ok.png")}
                                        style={{ marginLeft: 10, width: 16, height: 16, }}
                                    />
                                </View>


                                <TouchableOpacity 
                                    style={styles.modalButton}
                                    onPress={() => {
                                        setModal(false);
                                        setCvv("");
                                        setNameCard("");
                                        setNumberCard("");
                                        setValidateCard("");

                                        navigation.navigate("Dashboard");
                                    }}
                                >
                                    <Text maxFontSizeMultiplier={1.5} style={styles.modalButtonText}>Concluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </View>
    )
}
