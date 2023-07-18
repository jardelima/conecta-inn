import React, { useEffect, useContext, useState } from "react";
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity,
    StatusBar
} from "react-native";

import Header from "../../components/Header";
import ReservationItem from "../../components/ReservationItem";
import styles from "./style";
import url from "../../../url-config";
import { User } from "../../contexts/User";

export default function Dashboard({ navigation, route }) {
    const [activeReservation, setActiveReservation] = useState(true);
    const [reservations, setReservations] = useState([]); 

    const { 
        statusReservation,
        tokenAuth, 
        tokenHotel, 
        setIdReservation,
        setIdHotel,
        setDateCheckIn, 
        setDateCheckOut, 
        setStatusReservation,
        updateReservations,
    } = useContext(User);

    async function getReservations() {
        try {
            let response = await fetch(`${url.urlBase}/reservation/reservations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
            });
    
            let responseReservations = await response.json();
            let arrayReservations = responseReservations.data.reservations;

            setReservations([]);

            const months = [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Maio",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
            ];

            let cleanCheckInDay;
            let cleanCheckOutDay;
            let cleanCheckInMonth;
            let cleanCheckOutMonth;

            if(arrayReservations.length === 0) {
                setActiveReservation(false);
            }

            arrayReservations.forEach(reservation => {
                let checkInDay = reservation.entry_date;
                let checkOutDay = reservation.departure_date;

                if(checkInDay || checkOutDay) {
                    cleanCheckInDay = checkInDay.split("-")[2];
                    cleanCheckOutDay = checkOutDay.split("-")[2];

                    cleanCheckInMonth = checkInDay.split("-")[1];
                    cleanCheckOutMonth = checkOutDay.split("-")[1];
                }

                if(reservation.status === "Confirmada" || reservation.status === "Check-in") {
                    setActiveReservation(true); 

                    setReservations(reservs => [...reservs,
                        {
                            token: reservation.token,
                            checkIn: reservation.entry_date,
                            checkOut: reservation.departure_date,
                            dayCheckIn: cleanCheckInDay,
                            dayCheckOut: cleanCheckOutDay,
                            monthCheckIn: months[cleanCheckInMonth - 1],
                            monthCheckOut: months[cleanCheckOutMonth - 1],
                            status: reservation.status,
                            hotel: reservation.hotel.fantasy_name,
                            hotelAddress: reservation.hotel.address,
                            hotelImage: `${url.urlImage}${reservation.hotel.featured_image}`,
                            idReservation: reservation.id,
                            idHotel: reservation.hotel.id,
                        }
                    ]);

                } else {
                    setActiveReservation(false);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReservations();
    }, [tokenHotel, updateReservations, statusReservation]);   

    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor="#7D81D2" barStyle="light-content" />

            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleSmall}>Minhas</Text>
                    <Text maxFontSizeMultiplier={1.5} style={styles.title}>Reservas</Text>
                </View>

                {reservations.length > 0 ? 
                    reservations.map(reservation => {
                        return (
                            <ReservationItem 
                                key={reservation.token}
                                image={{uri: reservation.hotelImage}}
                                firstDate={reservation.dayCheckIn}
                                firstMonth={reservation.monthCheckIn}
                                secondDate={reservation.dayCheckOut}
                                secondMonth={reservation.monthCheckOut}
                                localName={reservation.hotel}
                                localAddress={reservation.hotelAddress}
                                route={() => {
                                        if(reservation.status == "Check-in" || reservation.status == "Check-out") {
                                            if(route.params?.localName == reservation.hotel) {
                                                navigation.navigate("CheckOut", {
                                                    localName: reservation.hotel, 
                                                    localAddress: reservation.hotelAddress,
                                                    listProducts: route.params?.listProducts,
                                                })
                                            } else {
                                                navigation.navigate("CheckOut", {
                                                    localName: reservation.hotel, 
                                                    localAddress: reservation.hotelAddress,
                                                })
                                            }
    
                                            setIdReservation(reservation.idReservation);
                                            setIdHotel(reservation.idHotel)
                                            setStatusReservation(reservation.status);
                                            setDateCheckIn(reservation.checkIn);
                                            setDateCheckOut(reservation.checkOut);
                                        } else {
                                            navigation.navigate("InternalHotel", {
                                                localName: reservation.hotel, 
                                                localAddress: reservation.hotelAddress,
                                            })
    
                                            setIdReservation(reservation.idReservation);
                                            setIdHotel(reservation.idHotel)
                                            setStatusReservation(reservation.status);
                                            setDateCheckIn(reservation.checkIn);
                                            setDateCheckOut(reservation.checkOut);
                                        }
                                    }
                                }
                            />
                        )
                    })
                    :
                    <View style={styles.tokenContainer}>
                        <Text maxFontSizeMultiplier={1.5} style={styles.tokenTitle}>Para visualizar suas reservas, ative seu token clicando no botão abaixo.</Text>

                        <TouchableOpacity 
                            style={styles.tokenButton}
                            onPress={() => navigation.navigate("Token")}
                        >
                            <Text maxFontSizeMultiplier={1.5} style={styles.tokenButtonText}>Ativar token</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </View>
    )
}
