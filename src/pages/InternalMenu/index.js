import React, { useEffect, useContext, useState } from "react";
import { 
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar, 
} from "react-native";

import globalStyles from "../../components/globalStyle/style";
import styles from "./style";
import InternalList from "../../components/InternalList";
import Header from "../../components/Header";
import { User } from "../../contexts/User";
import url from "../../../url-config";
import Loading from "../../components/Loading";

export default function InternalMenu({ navigation, route }) {
    const [menu, setMenu] = useState([]);
    const [typeMenu, setTypeMenu] = useState([]);
    const [activeMenu, setActiveMenu] = useState(false);

    const { 
        localName, 
        localAddress, 
        checkOut, 
        listProducts,
    } = route.params;

    const { 
        tokenAuth,
        idReservation,
        idHotel,
    } = useContext(User);

    useEffect(() => {        
        setMenu([]);
        setActiveMenu(false);

        async function getProducts() {
            let response = await fetch(`${url.urlBase}/hotel/${idHotel}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
            });

            let productsResponse = await response.json();
            let allProducts = productsResponse.data.products;

            allProducts.forEach(product => {
                setTypeMenu(arr => [...arr, {
                    type: product.category.name,
                }]);

                setMenu(arr => [...arr, {
                    idProduct: product.id,
                    page: product.page,                        
                    img: `${url.urlImage}${product.image}`,
                    slideImages: product.images,
                    nameProduct: product.name,
                    widthProduct: product.addtional_info,
                    valueProduct: `R$ ${product.price}`,
                    deliveryProduct: "R$ 2,90",
                    descriptionProduct: product.description,
                    type: product.category.name,
                    typeProduct: "PR",
                }]);
            });

            setActiveMenu(true);
        }

        getProducts();
    }, [idHotel]);

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={activeMenu ?  "#7D81D2" : "#7073b5"} />

            <View style={styles.containerItems}>
                <TouchableOpacity 
                    style={globalStyles.buttonReturn}
                    onPress={() => {
                        if(checkOut) {
                            navigation.navigate("CheckOut", {
                                localName, 
                                localAddress, 
                                listProducts,
                            })
                        } else {
                            navigation.navigate("InternalHotel", { 
                                localName, 
                                localAddress,
                                listProducts,
                            })
                        }
                    }}
                >
                    <Image 
                        style={globalStyles.buttonReturnImage}
                        source={require("../../assets/icons/arrow-left.png")}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text maxFontSizeMultiplier={1.2} style={[globalStyles.title, styles.title]}>Cardápio</Text>  
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleLocal}>{localName}</Text>  
                </View>      
            </View>

            {activeMenu ?             
                <InternalList 
                    type={typeMenu[0].type}
                    list={menu}
                    typeMenu={typeMenu}
                />
                :
                <Loading />
            }

        </View>
    )
}
