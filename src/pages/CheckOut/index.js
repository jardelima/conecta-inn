import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Linking,
    Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import BtnFloat from "../../components/BtnFloat";
import Header from "../../components/Header";
import styles from "./style";
import globalStyles from "../../components/globalStyle/style";
import InternalLinkItem from "../../components/InternalLinkItem";
import { User } from "../../contexts/User";
import url from "../../../url-config";
import Loading from "../../components/Loading";

export default function CheckOut({ navigation, route }) {
    const [total, setTotal] = useState("");
    const [modal, setModal] = useState(false);
    const [modalInformationsHotel, setModalInformationsHotel] = useState(false);
    const [dayCheckIn, setDayCheckIn] = useState("");
    const [dayCheckOut, setDayCheckout] = useState("");
    const [monthCheckIn, setMonthCheckIn] = useState("");
    const [monthCheckOut, setMonthCheckOut] = useState("");
    const [loading, setLoading] = useState(false);
    const [bedroom, setBedroom] = useState([]);
    const [dependents, setDependents] = useState(0);
    const [linkWifi, setLinkWifi] = useState(false);
    const [hotelLinkWifi, setHotelLinkWifi] = useState(null);
    const [hotelLoginWifi, setHotelLoginWifi] = useState(null);
    const [hotelPasswordWifi, setHotelPasswordWifi] = useState(null);
    const [informatives, setInformatives] = useState([]);
    const [modalDisabledItem, setModalDisabledItem] = useState(false);
    const isFocused = useIsFocused();

    const {
        localName,
        localAddress,
        listProducts
    } = route.params;

    const {
        idReservation,
        tokenAuth,
        idHotel,
        dateCheckIn,
        dateCheckOut,
        statusReservation
    } = useContext(User);

    const days = [
        "Segunda-feira",
        "Terca-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
        "Domingo",
    ];

    const months = [
        "Janeiro",
        "Fevereiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const getDate = () => {
        let checkIn = new Date(dateCheckIn);
        let checkOut = new Date(dateCheckOut);
        let dayCheckIn = checkIn.getDay();
        let dayCheckOut = checkOut.getDay();

        let monthCheckIn = dateCheckIn.split("-")[1];
        let monthCheckOut = dateCheckOut.split("-")[1];

        setDayCheckIn(days[dayCheckIn]);
        setDayCheckout(days[dayCheckOut]);

        setMonthCheckIn(months[monthCheckIn - 1]);
        setMonthCheckOut(months[monthCheckOut - 1]);
    };

    useEffect(() => {
        const getCheckout = navigation.addListener("focus", async () => {
            setLoading(true);

            try {
                let responseExtract = await fetch(`${url.urlBase}/reservation/${idReservation}/items`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                });

                const extractResponse = await responseExtract.json();

                if (responseExtract.ok) {
                    setTotal(extractResponse.data.total);
                } else {
                    console.log("erro");
                }
            } catch (error) {
                console.log(error);
            }

            try {
                let response = await fetch(`${url.urlBase}/hotel/${idHotel}/informative`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                });

                let informations = await response.json();

                if (response.ok) {
                    setInformatives([]);

                    for (let index = 0; index < informations.data.informative.length; index++) {
                        setInformatives((informatives) => [...informatives, {
                            description: informations.data.informative[index].description,
                            image: informations.data.informative[index].image,
                            name: informations.data.informative[index].name,
                        }])
                    }
                } else {
                    setInformatives([]);
                }
            } catch (error) {
                console.log(error)
            }

            try {
                let responseHotel = await fetch(`${url.urlBase}/reservation/reservations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenAuth,
                    },
                });

                const hotelResponse = await responseHotel.json();

                if (responseHotel.ok) {
                    setBedroom([]);
                    setLoading(false);

                    hotelResponse.data.reservations.forEach(hotel => {
                        if (hotel.id == idReservation) {
                            hotel.bedrooms.forEach(bed => {
                                setBedroom((bedroom) =>
                                    [...bedroom, {
                                        nameBedroom: bed.name,
                                        numberBedroom: bed.number,
                                        numberSingleBed: bed.number_single_beds,
                                        numberDoubleBed: bed.number_beds,
                                    }]
                                )

                                setDependents(hotel.dependents_number);

                                if (hotel.hotel.wifi_access_type == "link") {
                                    setLinkWifi(true);
                                    setHotelLinkWifi(hotel.hotel.wifi_link);
                                } else {
                                    setHotelLoginWifi(hotel.hotel.wifi_ssid);
                                    setHotelPasswordWifi(hotel.hotel.wifi_password);
                                }
                            });
                        }
                    });
                } else {
                    setLoading(false);
                    console.log("erro");
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        });

        return getCheckout;
    }, [navigation, isFocused]);

    useEffect(() => {
        getDate();
    }, [dateCheckIn, dateCheckOut]);

    useEffect(() => {
        if (modalDisabledItem) {
            setTimeout(() => {
                setModalDisabledItem(false);
            }, 1500);

            return
        }
    }, [modalDisabledItem])

    return (
        <View style={styles.container}>
            <Header
                src={require("../../assets/icons/menu.png")}
                openDrawerMenu="true"
            />

            <ScrollView style={styles.containerScroll}>
                <TouchableOpacity
                    style={globalStyles.buttonReturn}
                    onPress={() => {
                        setBedroom([]);

                        navigation.navigate("Dashboard", {
                            localName,
                            localAddress,
                            listProducts,
                            checkOut: true,
                        })
                    }}
                >
                    <Image
                        style={globalStyles.buttonReturnImage}
                        source={require("../../assets/icons/arrow-left.png")}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text allowFontScaling={false} style={styles.title}>{localName}</Text>

                    <View style={[styles.subtitleContainer, { marginTop: 10, }]}>
                        <Image
                            style={styles.subtitleImage}
                            source={require("../../assets/icons/map-pin.png")}
                        />
                        <Text maxFontSizeMultiplier={1.2} style={styles.subtitleText}>
                            {localAddress}
                        </Text>
                    </View>

                    <View style={styles.subtitleContainer}>
                        <Image
                            style={styles.subtitleImage}
                            source={require("../../assets/icons/room.png")}
                        />
                        <Text maxFontSizeMultiplier={1.2} style={styles.subtitleText}>
                            Quantidade de Dependentes: {dependents}
                        </Text>
                    </View>

                    {bedroom.map((bed, index) => (
                        <View key={index}>
                            <View style={styles.subtitleContainer}>
                                <Image
                                    style={styles.subtitleImage}
                                    source={require("../../assets/icons/room.png")}
                                />
                                <Text maxFontSizeMultiplier={1.2} style={styles.subtitleText}>
                                    Quarto {bed.numberBedroom}
                                </Text>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity
                        style={styles.buttonWifi}
                        onPress={() => setModal(true)}
                    >
                        <Image source={require("../../assets/icons/wifi.png")} />
                        <Text maxFontSizeMultiplier={1.2} style={styles.buttonWifiText}>Wi-fi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonWifi}
                        onPress={() => setModalInformationsHotel(true)}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.buttonWifiText}>Informações do hotel</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.expensesContainer}>
                    <View>
                        <Text maxFontSizeMultiplier={1.2} style={styles.expensesTitle}>Despesas</Text>
                    </View>
                    <View style={styles.extractContainer}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.expensesTotal}>Total R$ {total}</Text>
                        <TouchableOpacity
                            style={styles.extractButton}
                            onPress={() => {
                                navigation.navigate("Extract", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                })
                            }}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.extractText}>Extrato</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.linksContainer}>
                    <View style={styles.linksRow}>
                        <InternalLinkItem
                            src={require("../../assets/images/menu.png")}
                            title="Cardápio"
                            link={() => {
                                navigation.navigate("InternalMenu", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    checkOut: true,
                                })
                            }}
                        />

                        <InternalLinkItem
                            src={require("../../assets/images/tour.png")}
                            title="Passeios"
                            link={() => {
                                navigation.navigate("InternalTour", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    checkOut: true,
                                })
                            }}
                        />
                    </View>

                    <View style={styles.linksRow}>
                        <InternalLinkItem
                            src={require("../../assets/images/restaurants.png")}
                            title="Serviços"
                            link={() => {
                                navigation.navigate("InternalServices", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    checkOut: true,
                                })
                            }}
                        />

                        <InternalLinkItem
                            src={require("../../assets/images/night.png")}
                            title="Night"
                            link={() => setModalDisabledItem(!modalDisabledItem)}
                            disabled={true}
                        />
                    </View>

                    {/* <View style={styles.linksRow}>
                        <InternalLinkItem
                            src={require("../../assets/images/placeholder-image.jpg")}
                            title="Piscina"
                            link={() => {
                                navigation.navigate("InternalPool", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    checkOut: true,
                                })
                            }}
                        />

                        <InternalLinkItem
                            src={require("../../assets/images/placeholder-image.jpg")}
                            title="Frigobar"
                            link={() => {
                                navigation.navigate("InternalFridge", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    checkOut: true,
                                })
                            }}
                        />
                    </View> */}

                    {informatives.map((informative, index) => (
                        <InternalLinkItem
                            src={{ uri: `${url.urlImage}${informative.image}` }}
                            title={informative.name}
                            link={() => {
                                navigation.navigate("Informative", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                    description: informative.description,
                                    image: informative.image,
                                    checkOut: true,
                                })
                            }}
                            fullItem={true}
                            key={index}
                        />
                    ))}
                </View>

                <View>
                    <View style={styles.checkIn}>
                        <View style={styles.checkInBox}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.checkInTitle}>Check-in</Text>
                            {statusReservation == "Check-in" ?
                                <Image
                                    source={require("../../assets/icons/check-in-ok.png")}
                                    style={{ marginLeft: 5, width: 16, height: 16, }}
                                />
                                :
                                statusReservation == "Check-out" ?
                                    <Image
                                        source={require("../../assets/icons/check-in-ok.png")}
                                        style={{ marginLeft: 5, width: 16, height: 16, }}
                                    />
                                    :
                                    false
                            }
                        </View>
                        <Text maxFontSizeMultiplier={1.2} style={styles.checkInText}>{dayCheckIn}, {dateCheckIn.split("-")[2]} de {monthCheckIn} de {dateCheckIn.split("-")[0]}</Text>
                    </View>

                    <Image
                        style={{ resizeMode: "contain", marginBottom: 10 }}
                        source={require("../../assets/icons/qtd-days.png")}
                    />

                    <View style={[styles.checkIn, { marginBottom: 30 }]}>
                        <View style={styles.checkInBox}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.checkInTitle}>Check-out</Text>
                            {statusReservation == "Check-out" &&
                                <Image
                                    source={require("../../assets/icons/check-in-ok.png")}
                                    style={{ marginLeft: 5, width: 16, height: 16, }}
                                />
                            }
                        </View>
                        <Text maxFontSizeMultiplier={1.2} style={styles.checkInText}>{dayCheckOut}, {dateCheckOut.split("-")[2]} de {monthCheckOut} de {dateCheckOut.split("-")[0]}</Text>
                    </View>
                </View>
            </ScrollView>

            {statusReservation == "Check-out" ?
                <View style={{ padding: 20, paddingHorizontal: 20, }}>
                    <TouchableOpacity
                        style={[styles.btnCheckIn, { backgroundColor: "rgba(224,110,120,0.4)" }]}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.btnCheckInText}>Check-out já realizado</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ padding: 20, paddingHorizontal: 20, }}>
                    <TouchableOpacity
                        style={styles.btnCheckIn}
                        onPress={() => {
                            navigation.navigate("Payment", {
                                localName,
                                localAddress,
                                listProducts,
                            })
                        }}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.btnCheckInText}>Check-out</Text>
                    </TouchableOpacity>
                </View>
            }

            {modal ?
                <View style={styles.modal} onPress={() => setModal(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.title}>Wi-fi</Text>

                            <TouchableOpacity
                                style={styles.exitButton}
                                onPress={() => setModal(false)}
                            >
                                <Text maxFontSizeMultiplier={1.2} style={styles.exitText}>x</Text>
                            </TouchableOpacity>
                        </View>

                        {linkWifi ?
                            <View style={styles.fieldWifi}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.fieldWifiTitle}>Rede</Text>
                                <Text
                                    maxFontSizeMultiplier={1.2}
                                    style={styles.fieldWifiName}
                                    onPress={() => {
                                        Linking.openURL(hotelLinkWifi);
                                    }}
                                >
                                    <Text style={{ color: "#33303E" }}>Clique aqui</Text> para fazer o login na rede
                                </Text>
                            </View>
                            :
                            <>
                                <View style={styles.fieldWifi}>
                                    <Text maxFontSizeMultiplier={1.2} style={styles.fieldWifiTitle}>Rede</Text>
                                    <Text maxFontSizeMultiplier={1.2} style={styles.fieldWifiName}>{hotelLoginWifi}</Text>
                                </View>

                                <View style={[styles.fieldWifi, { marginBottom: 0 }]}>
                                    <Text maxFontSizeMultiplier={1.2} style={styles.fieldWifiTitle}>Senha</Text>
                                    <Text maxFontSizeMultiplier={1.2} style={styles.fieldWifiName}>{hotelPasswordWifi}</Text>
                                </View>
                            </>
                        }
                    </View>
                </View>
                :
                false
            }

            {modalInformationsHotel ?
                <View style={styles.modal} onPress={() => setModalInformationsHotel(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text maxFontSizeMultiplier={1.2} style={styles.title}>Horários</Text>

                            <TouchableOpacity
                                style={styles.exitButton}
                                onPress={() => setModalInformationsHotel(false)}
                            >
                                <Text maxFontSizeMultiplier={1.2} style={styles.exitText}>x</Text>
                            </TouchableOpacity>
                        </View>

                        <Text maxFontSizeMultiplier={1.2} style={styles.hours}>Café da manhã: 07:00h às 10:00h</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.hours}>Piscina: 07:00h às 22:00h</Text>
                    </View>
                </View>
                :
                false
            }

            {modalDisabledItem &&
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModalDisabledItem(!modalDisabledItem)}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, { height: 100, alignItems: "center", justifyContent: "center" }]}>
                                <Text style={styles.textNotification}>Item Desabilitado</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            }

            {loading && <Loading />}

            <BtnFloat
                localName={localName}
                localAddress={localAddress}
                listProducts={listProducts}
                chatInCheckout
            />
        </View>
    )
}
