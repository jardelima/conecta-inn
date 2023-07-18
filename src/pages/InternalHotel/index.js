import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    StatusBar,
} from "react-native";
import Header from "../../components/Header";
import styles from "./style";
import globalStyles from "../../components/globalStyle/style";
import InternalLinkItem from "../../components/InternalLinkItem";
import BtnFloat from "../../components/BtnFloat";
import url from "../../../url-config";
import { User } from "../../contexts/User";

export default function InternalHotel({ navigation, route }) {
    const [dayCheckIn, setDayCheckIn] = useState("");
    const [dayCheckOut, setDayCheckout] = useState("");
    const [monthCheckIn, setMonthCheckIn] = useState("");
    const [monthCheckOut, setMonthCheckOut] = useState("");
    const [modalDisabledItem, setModalDisabledItem] = useState(false);
    const [informatives, setInformatives] = useState([]);

    const {
        idHotel,
        idReservation,
        dateCheckIn,
        dateCheckOut,
        statusReservation,
        termsCheckIn,
        tokenAuth,
    } = useContext(User);

    const {
        localName,
        localAddress,
        listProducts,
    } = route.params;

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

    async function getInformationsHotel() {
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
    }

    useEffect(() => { getDate(); getInformationsHotel(); }, [dateCheckIn, dateCheckOut, idReservation]);

    useEffect(() => {
        if (modalDisabledItem) {
            setTimeout(() => {
                setModalDisabledItem(false);
            }, 1500);

            return
        }
    }, [modalDisabledItem])

    return (
        <View>
            <StatusBar backgroundColor={"#7D81D2"} barStyle={"light-content"} />

            <Header
                src={require("../../assets/icons/menu.png")}
                openDrawerMenu="true"
            />

            <View style={styles.container}>
                <ScrollView style={styles.containerScroll}>
                    <TouchableOpacity
                        style={globalStyles.buttonReturn}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Image
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text allowFontScaling={false} style={styles.title}>{localName}</Text>
                        <View style={styles.subtitleContainer}>
                            <Image
                                style={styles.subtitleImage}
                                source={require("../../assets/icons/map-pin.png")}
                            />
                            <Text maxFontSizeMultiplier={1.2} style={styles.subtitleText}>{localAddress}</Text>
                        </View>
                    </View>

                    <View style={styles.linksContainer}>
                        <View style={styles.linksRow}>
                            <InternalLinkItem
                                src={require("../../assets/images/menu.png")}
                                title="Cardápio"
                                link={() => navigation.navigate("InternalMenu", { localName, localAddress, listProducts })}
                            />

                            <InternalLinkItem
                                src={require("../../assets/images/tour.png")}
                                title="Passeios"
                                link={() => navigation.navigate("InternalTour", { localName, localAddress, listProducts })}
                            />
                        </View>

                        <View style={styles.linksRow}>
                            <InternalLinkItem
                                src={require("../../assets/images/restaurants.png")}
                                title="Serviços"
                                link={() => navigation.navigate("InternalServices", { localName, localAddress, listProducts })}
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
                                link={() => navigation.navigate("InternalPool", { localName, localAddress, listProducts })}
                            />

                            <InternalLinkItem
                                src={require("../../assets/images/placeholder-image.jpg")}
                                title="Frigobar"
                                link={() => navigation.navigate("InternalFridge", { localName, localAddress, listProducts })}
                            />
                        </View> */}

                        {informatives.map((informative, index) => (
                            <InternalLinkItem
                                src={{ uri: `${url.urlImage}/${informative.image}` }}
                                title={informative.name}
                                link={() => {
                                    navigation.navigate("Informative", {
                                        localName,
                                        localAddress,
                                        listProducts,
                                        description: informative.description,
                                        image: informative.image,
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
                            source={require("../../assets/icons/qtd-days.png")}
                        />

                        <View style={styles.checkOut}>
                            <View style={styles.checkInBox}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.checkOutTitle}>Check-out</Text>
                                {statusReservation == "Check-out" &&
                                    <Image
                                        source={require("../../assets/icons/check-in-ok.png")}
                                        style={{ marginLeft: 5, width: 16, height: 16, }}
                                    />
                                }
                            </View>
                            <Text maxFontSizeMultiplier={1.2} style={styles.checkOutText}>{dayCheckOut}, {dateCheckOut.split("-")[2]} de {monthCheckOut} de {dateCheckOut.split("-")[0]}</Text>
                        </View>
                    </View>
                </ScrollView>

                {statusReservation == "Check-out" ?
                    <TouchableOpacity
                        style={[styles.btnCheckIn, { backgroundColor: "rgba(224,110,120,0.4)" }]}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={styles.btnCheckInText}>Check-out já realizado</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.btnCheckIn}
                        onPress={() => {
                            if (statusReservation == "Check-in" || statusReservation == "Check-out") {
                                navigation.navigate("CheckOut", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                });
                            } else if (!termsCheckIn) {
                                navigation.navigate("ModalCheckIn", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                });
                            } else {
                                navigation.navigate("CheckIn", {
                                    localName,
                                    localAddress,
                                    listProducts,
                                });
                            }
                        }}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={styles.btnCheckInText}>
                            {statusReservation == "Confirmada" ? "Check-in" : "Check-out"}
                        </Text>
                    </TouchableOpacity>
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

                <BtnFloat
                    localName={localName}
                    localAddress={localAddress}
                    listProducts={listProducts}
                />
            </View>
        </View>
    )
}
