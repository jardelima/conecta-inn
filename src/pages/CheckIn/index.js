import React, { useState, useCallback, useEffect, useContext } from "react";
import DocumentPicker from "react-native-document-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
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
    PermissionsAndroid,
} from "react-native";

import globalStyles from "../../components/globalStyle/style";
import Header from "../../components/Header";
import styles from "./style";
import url from "../../../url-config";
import { User } from "../../contexts/User";
import Loading from "../../components/Loading";

export default function CheckIn({ navigation, route }) {
    const {
        tokenAuth,
        nameUser,
        setStatusReservation,
        idReservation,
    } = useContext(User);

    const [name, setName] = useState(nameUser);
    const [fileResponse, setFileResponse] = useState([]);
    const [filePhoto, setFilePhoto] = useState([]);
    const [local, setLocal] = useState(localName);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [lastOrigin, setLastOrigin] = useState("");
    const [nextOrigin, setNextOrigin] = useState("");
    const [reasonTrip, setReasonTrip] = useState("Selecione o motivo da viagem");
    const [transport, setTransport] = useState("Selecione seu transporte de viagem");
    const [observation, setObservation] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [carModel, setCarModel] = useState("");

    const [modalSelectReason, setModalSelectReason] = useState(false);
    const [modalSelectTransport, setModalSelectTransport] = useState(false);

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedLastOrigin, setIsFocusedLastOrigin] = useState(false);
    const [isFocusedNextOrigin, setIsFocusedNextOrigin] = useState(false);
    const [isFocusedObservation, setIsFocusedObservation] = useState(false);
    const [isFocusedLicensePlate, setIsFocusedLicensePlate] = useState(false);
    const [isFocusedCarModel, setIsFocusedCarModel] = useState(false);

    const [errorName, setErrorName] = useState(null);
    const [errorFile, setErrorFile] = useState(null);

    useEffect(() => setErrorName(null), [name]);
    useEffect(() => setErrorFile(null), [fileResponse]);
    useEffect(() => setLocal(localName));

    const {
        localName,
        localAddress,
        listProducts,
    } = route.params;

    const handleDocumentSelection = useCallback(async () => {
        setFileResponse([]);
        setFilePhoto([]);

        if (Platform.OS !== "ios") {
            try {
                const response = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });

                setFileResponse(response);
            } catch (error) {
                if (DocumentPicker.isCancel(error)) {
                    // ignore
                } else {
                    console.error(error);
                }
            }

        } else {
            try {
                const response = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                    presentationStyle: "fullScreen"
                });

                setFileResponse(response);
            } catch (error) {
                if (DocumentPicker.isCancel(error)) {
                    // ignore
                } else {
                    console.error(error);
                }
            }
        }

    }, [localName]);

    async function sendArchive() {
        if (name == "") {
            setErrorName("Campo vazio")
        }

        if (fileResponse.length === 0 && filePhoto.length === 0) {
            setErrorFile("Nenhum arquivo selecionado")
        }

        if (fileResponse.length > 0 || filePhoto.length > 0) {
            setLoading(true);

            const data = new FormData();

            data.append("checking_copy", fileResponse.length === 0 ? filePhoto[0] : fileResponse[0]);
            data.append("purpose_of_trip", reasonTrip === "Selecione o motivo da viagem" ? "" : reasonTrip);
            data.append("arriving_by", transport === "Selecione seu transporte de viagem" ? "" : transport);
            data.append("arriving_from", lastOrigin);
            data.append("next_destination", nextOrigin);
            data.append("comments", observation);
            data.append("license_plate", licensePlate);
            data.append("vehicle_model", carModel);

            try {
                let response = await fetch(`${url.urlBase}/reservation/${idReservation}/check-in`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                    body: data,
                });

                let archiveResponse = await response.json();

                if (response.ok) {
                    setLoading(false);
                    setModal(true);
                } else {
                    setLoading(false);
                    alert("Erro ao enviar dados");
                    console.log("Error Status: " + response.status);
                }
            } catch (error) {
                setLoading(false);
                alert("Erro ao fazer check-in");

                console.log("Error Catch: " + error);
            }
        }
    }

    const pickImageCamera = async () => {
        const options = {
            mediaType: "photo",
            saveToPhotos: false,
            quality: 0,
        };

        if (Platform.OS !== "ios") {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                    title: "Permissão para acessar camera",
                    message: "O aplicativo precisa acessar sua camera",
                    buttonNeutral: "Pergunte mais tarde",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK",
                });

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setFileResponse([]);

                    launchCamera(options, response => {
                        if (response.didCancel) {
                            // ignore
                        } else {
                            setFilePhoto(
                                [{
                                    fileCopyUri: null,
                                    name: response.assets[0].fileName,
                                    size: response.assets[0].fileSize,
                                    type: response.assets[0].type,
                                    uri: response.assets[0].uri,
                                }]
                            );
                        }
                    });
                } else {
                    console.log("Permissão da camera negada.");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            setFileResponse([]);

            launchCamera(options, response => {
                if (response.didCancel) {
                    // ignore
                } else {
                    setFilePhoto(
                        [{
                            fileCopyUri: null,
                            name: response.assets[0].fileName,
                            size: response.assets[0].fileSize,
                            type: response.assets[0].type,
                            uri: response.assets[0].uri,
                        }]
                    );
                }
            });
        }
    };

    async function pickImageGallery() {
        setFileResponse([]);

        const options = {
            mediaType: "photo",
        }

        const result = await launchImageLibrary(options);

        if (result?.assets) {
            setFilePhoto(
                [{
                    fileCopyUri: null,
                    name: result.assets[0].fileName,
                    size: result.assets[0].fileSize,
                    type: result.assets[0].type,
                    uri: result.assets[0].uri,
                }]
            )
        }
    }

    async function verifyDate() {
        let response = await fetch(`${url.urlBase}/reservation/${idReservation}/show`, {
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Authorization": "Bearer " + tokenAuth,
            },
        });

        let verifyResponse = await response.json();

        console.log(verifyResponse);
    }

    const reasonsTrip = [
        "Lazer - Férias",
        "Negócios",
        "Congresso - Feira",
        "Parentes - Amigos",
        "Estudos - Cursos",
        "Religião",
        "Saúde",
        "Compras",
        "Outros",
    ];

    const transportTrip = [
        "Avião",
        "Automóvel",
        "Ônibus",
        "Moto",
        "Navio - Barco",
        "Trem",
        "Outro",
    ];

    return (
        <View style={styles.container}>
            <Header
                src={require("../../assets/icons/menu.png")}
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={loading ? "#7073b5" : modal ? "#7073b5" : "#7D81D2"} />

            <ScrollView>
                <View style={styles.buttonReturnContainer}>
                    <TouchableOpacity
                        style={globalStyles.buttonReturn}
                        onPress={() => {
                            navigation.navigate("InternalHotel", {
                                localName,
                                localAddress,
                                listProducts,
                            })
                        }}
                    >
                        <Image
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[styles.titleContainer, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                    <Text allowFontScaling={false} style={styles.title}>Check-in</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Chat", {
                                localName,
                                localAddress,
                                listProducts,
                                chatInCheckin: true,
                            });
                        }}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.buttonHelpText}>Suporte</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.titleContainer, { marginTop: 10, }]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MyData")}>
                        <Text maxFontSizeMultiplier={1.2} style={{ color: "#33303E" }}>
                            <Text maxFontSizeMultiplier={1.2} style={{ color: "#E06E78", fontFamily: "SourceSansPro-SemiBold", }}>Clique aqui</Text> para editar seus dados
                        </Text>
                    </TouchableOpacity>

                    <Text maxFontSizeMultiplier={1.2} style={{ color: "#33303E", fontSize: 12, marginTop: 20, fontFamily: "SourceSansPro-Regular" }}>Campos obrigatórios (*)</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Nome Completo*</Text>
                        <TextInput
                            style={[
                                styles.formInput,
                                {
                                    borderColor: isFocusedName ? "#E06E78" : "#CED4DA80",
                                    color: "rgba(0,0,0,0.4)"
                                },
                            ]}
                            onChangeText={setName}
                            value={nameUser}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedName(true)}
                            onBlur={() => setIsFocusedName(false)}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {errorName && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorName}</Text>}
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Estadia*</Text>
                        <TextInput
                            style={[styles.formInput, { color: "rgba(0,0,0,0.4)" }]}
                            value={local}
                            editable={false}
                        />
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Última procedência</Text>
                        <TextInput
                            style={[
                                styles.formInput,
                                { borderColor: isFocusedLastOrigin ? "#E06E78" : "#CED4DA80" },
                            ]}
                            onChangeText={setLastOrigin}
                            value={lastOrigin}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedLastOrigin(true)}
                            onBlur={() => setIsFocusedLastOrigin(false)}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Próximo destino</Text>
                        <TextInput
                            style={[
                                styles.formInput,
                                { borderColor: isFocusedNextOrigin ? "#E06E78" : "#CED4DA80" },
                            ]}
                            onChangeText={setNextOrigin}
                            value={nextOrigin}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedNextOrigin(true)}
                            onBlur={() => setIsFocusedNextOrigin(false)}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => setModalSelectReason(true)}
                        style={styles.formField}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Motivo da viagem</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formInputSelect}>{reasonTrip}</Text>
                        <Image
                            style={styles.arrowDown}
                            source={require("../../assets/icons/arrow-down.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalSelectTransport(true)}
                        style={styles.formField}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Meio de Transporte</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formInputSelect}>{transport}</Text>
                        <Image
                            style={styles.arrowDown}
                            source={require("../../assets/icons/arrow-down.png")}
                        />
                    </TouchableOpacity>

                    {transport == "Automóvel" &&
                        <>
                            <View style={styles.formField}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Modelo do carro</Text>
                                <TextInput
                                    style={[
                                        styles.formInput,
                                        { borderColor: isFocusedCarModel ? "#E06E78" : "#CED4DA80" },
                                    ]}
                                    onChangeText={setCarModel}
                                    value={carModel}
                                    autoCorrect={false}
                                    onFocus={() => setIsFocusedCarModel(true)}
                                    onBlur={() => setIsFocusedCarModel(false)}
                                    underlineColorAndroid="transparent"
                                />
                            </View>

                            <View style={styles.formField}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Placa do carro</Text>
                                <TextInput
                                    style={[
                                        styles.formInput,
                                        { borderColor: isFocusedLicensePlate ? "#E06E78" : "#CED4DA80" },
                                    ]}
                                    onChangeText={setLicensePlate}
                                    value={licensePlate}
                                    autoCorrect={false}
                                    onFocus={() => setIsFocusedLicensePlate(true)}
                                    onBlur={() => setIsFocusedLicensePlate(false)}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </>
                    }

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Observação</Text>
                        <TextInput
                            style={[
                                styles.formInputObservation,
                                { borderColor: isFocusedObservation ? "#E06E78" : "#CED4DA80" },
                            ]}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setObservation}
                            value={observation}
                            autoCorrect={false}
                            onFocus={() => setIsFocusedObservation(true)}
                            onBlur={() => setIsFocusedObservation(false)}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.formField}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.formLabel}>Comprovante*</Text>

                        {filePhoto.map((file, index) => {
                            return <Text maxFontSizeMultiplier={1.2} style={styles.file} key={index}>{file.name}</Text>
                        })}

                        {fileResponse.map((file, index) => {
                            return <Text maxFontSizeMultiplier={1.2} style={styles.file} key={index}>{file.name}</Text>
                        })}

                        <View style={styles.containerBtnImport}>
                            <TouchableOpacity
                                style={styles.btnImportDocument}
                                onPress={() => {
                                    pickImageGallery();
                                }}
                            >
                                <Image
                                    style={styles.imgImportDocument}
                                    source={require("../../assets/icons/gallery.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnImportDocument}
                                onPress={() => {
                                    pickImageCamera();
                                }}
                            >
                                <Image
                                    style={styles.imgImportDocument}
                                    source={require("../../assets/icons/camera.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnImportDocument}
                                onPress={() => {
                                    handleDocumentSelection();
                                }}
                            >
                                <Image
                                    style={styles.imgImportDocument}
                                    source={require("../../assets/icons/file.png")}
                                />
                            </TouchableOpacity>

                        </View>

                        <Text maxFontSizeMultiplier={1.2} style={[styles.formLabel, { textAlign: "center" }]}>Escolha a forma de anexar seu documento</Text>

                        {errorFile && <Text maxFontSizeMultiplier={1.2} style={globalStyles.errorMessage}>{errorFile}</Text>}
                    </View>
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonCheckIn}
                        onPress={() => sendArchive()}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.buttonCheckInText}>Check-in</Text>
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
                                    <Text maxFontSizeMultiplier={1.2} style={styles.modalTitle}>Check-in feito com sucesso</Text>
                                    <Image
                                        source={require("../../assets/icons/check-in-ok.png")}
                                        style={{ marginLeft: 10, width: 16, height: 16, }}
                                    />
                                </View>


                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => {
                                        setModal(false);
                                        setLastOrigin("");
                                        setNextOrigin("");
                                        setReasonTrip("Selecione o motivo da viagem");
                                        setTransport("Selecione seu transporte de viagem");
                                        setLicensePlate("");
                                        setCarModel("");
                                        setObservation("");
                                        setFileResponse([]);
                                        setFilePhoto([]);
                                        setStatusReservation("Check-in");

                                        navigation.navigate("CheckOut", {
                                            localName,
                                            localAddress,
                                            listProducts,
                                        });
                                    }}
                                >
                                    <Text maxFontSizeMultiplier={1.2} style={styles.modalButtonText}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            }

            {modalSelectReason &&
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModal(!modalSelectReason)}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, { height: 300, alignItems: "center", justifyContent: "center" }]}>
                                <TouchableOpacity
                                    onPress={() => setModalSelectReason(false)}
                                    style={{ position: "absolute", top: 20, right: 30 }}
                                >
                                    <Text maxFontSizeMultiplier={1.2} style={{ fontSize: 18, color: "#7D81D2" }}>X</Text>
                                </TouchableOpacity>
                                <ScrollView style={{ width: 200, height: 100, marginTop: 30 }}>
                                    {reasonsTrip.map((reason, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.option}
                                            onPress={() => {
                                                setModalSelectReason(false);
                                                setReasonTrip(`${reason}`);
                                            }}
                                        >
                                            <Text maxFontSizeMultiplier={1.2} style={{ color: "#979797", }}>{reason}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
            }

            {modalSelectTransport &&
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModal(!modalSelectTransport)}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, { height: 300, alignItems: "center", justifyContent: "center" }]}>
                                <TouchableOpacity
                                    onPress={() => setModalSelectTransport(false)}
                                    style={{ position: "absolute", top: 20, right: 30 }}
                                >
                                    <Text maxFontSizeMultiplier={1.2} style={{ fontSize: 18, color: "#7D81D2" }}>X</Text>
                                </TouchableOpacity>
                                <ScrollView style={{ width: 200, height: 100, marginTop: 30 }}>
                                    {transportTrip.map((transport, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.option}
                                            onPress={() => {
                                                setModalSelectTransport(false);
                                                setTransport(`${transport}`);
                                            }}
                                        >
                                            <Text maxFontSizeMultiplier={1.2} style={{ color: "#979797", }}>{transport}</Text>
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
