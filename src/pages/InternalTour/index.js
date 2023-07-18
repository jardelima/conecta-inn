import React, { useContext, useState, useEffect } from "react";

import { 
    View,
    TouchableOpacity,
    Image,
    Text, 
    StatusBar
} from "react-native";

import globalStyles from "../../components/globalStyle/style";
import styles from "../InternalMenu/style";
import InternalList from "../../components/InternalList";
import Header from "../../components/Header";
import url from "../../../url-config";
import { User } from "../../contexts/User";
import Loading from "../../components/Loading";

const typeTour = [
    {
        type: "Passeios",
    },
]

export default function InternalTour({ navigation, route }) {
    const [tour, setTour] = useState([]);
    const [activeTour, setActiveTour] = useState(false);

    const { 
        localName, 
        localAddress, 
        listProducts, 
        checkOut, 
    } = route.params;

    const { 
        tokenAuth,
        idReservation, 
        idHotel,
    } = useContext(User);

    useEffect(() => {
        setTour([]);
        setActiveTour(false);

        async function getTours() {
            let response = await fetch(`${url.urlBase}/hotel/${idHotel}/tours`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
            });

            let tourResponse = await response.json();
            let allTours = tourResponse.data.tours;

            allTours.forEach(tour => {
                setTour(arr => [...arr, {
                    idProduct: tour.id,
                    page: tour.page,                        
                    img: `${url.urlImage}${tour.image}`,
                    slideImages: tour.images,
                    nameProduct: tour.name,
                    widthProduct: tour.addtional_info,
                    valueProduct: `R$ ${tour.price}`,
                    deliveryProduct: "R$ 2,90",
                    descriptionProduct: tour.description,
                    type: "Passeios",
                    typeProduct: "TO",
                }]);
            });

            setActiveTour(true);
        }

        getTours();
    }, [idHotel]);

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={activeTour ?  "#7D81D2" : "#7073b5"} />

            <View style={styles.containerItems}>
                <TouchableOpacity 
                    style={globalStyles.buttonReturn}
                    onPress={() => {
                        if(checkOut) {
                            navigation.navigate("CheckOut", {
                                localName, 
                                localAddress, 
                                listProducts,
                            });
                        } else {
                            navigation.navigate("InternalHotel", { 
                                localName, 
                                localAddress,
                                listProducts,
                            });
                        }
                    }}
                >
                    <Image 
                        style={globalStyles.buttonReturnImage}
                        source={require("../../assets/icons/arrow-left.png")}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text maxFontSizeMultiplier={1.2} style={[globalStyles.title, styles.title]}>Passeios</Text>  
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleLocal}>{localName}</Text>  
                </View>      
            </View>

            {activeTour ? 
                <InternalList 
                    type="Passeios"
                    list={tour}
                    typeMenu={typeTour}
                />
                :
                <Loading />
            }
        </View>
    )
}