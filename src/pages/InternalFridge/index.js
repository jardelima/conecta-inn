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
        type: "Produtos",
    },
]

export default function InternalFridge({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const [activeProducts, setActiveProducts] = useState(false);

    const { 
        localName, 
        localAddress, 
        listProducts, 
        checkOut, 
    } = route.params;

    const { 
        tokenAuth,
        idHotel,
    } = useContext(User);

    useEffect(() => {
        setProducts([]);
        setActiveProducts(false);

        async function getProducts() {
            let response = await fetch(`${url.urlBase}/hotel/${idHotel}/products/fridge`, {
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
                setProducts(arr => [...arr, {
                    idProduct: product.id,
                    page: "fridge",                        
                    img: `${url.urlImage}${product.image}`,
                    slideImages: product.images,
                    nameProduct: product.name,
                    widthProduct: product.addtional_info,
                    valueProduct: `R$ ${product.price}`,
                    deliveryProduct: "R$ 2,90",
                    descriptionProduct: product.description,
                    type: "Produtos",
                    typeProduct: "PR",
                }]);
            });

            setActiveProducts(true);
        }

        getProducts();
    }, [idHotel, localName]);

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <StatusBar backgroundColor={activeProducts ?  "#7D81D2" : "#7073b5"} />

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
                    <Text maxFontSizeMultiplier={1.2} style={[globalStyles.title, styles.title]}>Frigobar</Text>  
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleLocal}>{localName}</Text>  
                </View>      
            </View>

            {activeProducts ? 
                <InternalList 
                    type="Produtos"
                    list={products}
                    typeMenu={typeService}
                />
                :
                <Loading />
            }
        </View>
    )
}
