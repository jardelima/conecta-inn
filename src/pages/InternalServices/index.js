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

const typeService = [
    {
        type: "Serviços",
    },
]

export default function InternalServices({ navigation, route }) {
    const [service, setService] = useState([]);
    const [activeService, setActiveService] = useState(false);

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
        setService([]);
        setActiveService(false);

        async function getServices() {
            let response = await fetch(`${url.urlBase}/hotel/${idHotel}/services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
            });

            let servicesResponse = await response.json();
            let allServices = servicesResponse.data.services;

            allServices.forEach(service => {
                setService(arr => [...arr, {
                    idProduct: service.id,
                    page: service.page,                        
                    img: `${url.urlImage}${service.image}`,
                    slideImages: service.images,
                    nameProduct: service.name,
                    widthProduct: service.addtional_info,
                    valueProduct: `R$ ${service.price}`,
                    deliveryProduct: "R$ 2,90",
                    descriptionProduct: service.description,
                    type: "Serviços",
                    typeProduct: "SE",
                }]);
            });

            setActiveService(true);
        }

        getServices();
    }, [idHotel]);

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={activeService ?  "#7D81D2" : "#7073b5"} />


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
                    <Text maxFontSizeMultiplier={1.2} style={[globalStyles.title, styles.title]}>Serviços</Text>  
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleLocal}>{localName}</Text>  
                </View>      
            </View>

            {activeService ? 
                <InternalList 
                    type="Serviços"
                    list={service}
                    typeMenu={typeService}
                />
                :
                <Loading />
            }
        </View>
    )
}