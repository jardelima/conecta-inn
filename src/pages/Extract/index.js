import React, {useState, useEffect, useContext} from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";

import styles from "./style";
import Header from "../../components/Header";
import globalStyles from "../../components/globalStyle/style";
import { User } from "../../contexts/User";
import url from "../../../url-config";
import Loading from "../../components/Loading";

export default function Extract({ navigation, route }) {
    const { 
        localName, 
        localAddress, 
        listProducts,
    } = route.params;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        idReservation,
        tokenAuth, 
        statusReservation,
    } = useContext(User);

    async function getProducts() {
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

            if(responseExtract.ok) {
                setLoading(false);
                setList([]);

                for(let index = 0; index < extractResponse.data.items.length; index++) {
                    if(extractResponse.data.items[index].image) {
                        setList((list) => [...list, 
                            {
                                imgProduct: extractResponse.data.items[index].image,
                                qtdProduct: extractResponse.data.items[index].quantity,
                                nameProduct: extractResponse.data.items[index].description,
                                widthProduct: extractResponse.data.items[index].additional_info,
                                valueProduct: extractResponse.data.items[index].price,
                                localization: extractResponse.data.items[index].localization,
                            }]
                        )
                    } else {
                        setList((list) => [...list,
                            {
                                qtdProduct: extractResponse.data.items[index].quantity,
                                nameProduct: extractResponse.data.items[index].description,
                                widthProduct: extractResponse.data.items[index].additional_info,
                                valueProduct: extractResponse.data.items[index].price,
                                localization: extractResponse.data.items[index].localization,
                            }]
                        )
                    }
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [listProducts, localName]);

    const sumOfProducts = (valueProduct, qtdProduct) => {
        let cleanValueProduct = Number(valueProduct.replace("R$ ", "").replace(",", "."));
    
        return `R$ ${(cleanValueProduct * qtdProduct).toFixed(2).replace(".", ",")}`
    }

    const subtotal = () => {
        let subtotal = 0;

        list.forEach(product => {
            subtotal += Number(product.valueProduct.replace("R$", "").replace(",", ".")) * product.qtdProduct
        });

        return `R$ ${subtotal.toFixed(2).replace(".", ",")}`
    }

    const total = () => {
        let subtotal = 0;

        list.forEach(product => {
            subtotal += Number(product.valueProduct.replace("R$", "").replace(",", ".")) * product.qtdProduct
        });

        if(subtotal > 0) {
            return `R$ ${Number(subtotal).toFixed(2).replace(".", ",")}`
        } else {
            return "R$ 0,00";
        }
    }

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />
            <StatusBar backgroundColor={loading ? "#7073b5" : "#7D81D2"} />

            <View style={styles.containerButton}>
                <TouchableOpacity 
                    style={globalStyles.buttonReturn}
                    onPress={() => {
                        navigation.navigate("CheckOut", {
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

            <View style={[styles.content, styles.titles]}>
                <Text allowFontScaling={false} style={styles.title}>Extrato</Text>

                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("Chat", {
                            chatInExtract: true,
                            localName, 
                            localAddress, 
                            listProducts,
                        })
                    }}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.clean}>Suporte</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                    {list !== undefined && Object.values(list).length > 0 ?
                        list.map((product, index) => {
                            return (
                                <View key={index} style={styles.item}>
                                    <View style={styles.itemImage}>
                                        {product.imgProduct ? 
                                            <Image 
                                                style={{width: 60, height: 60, borderRadius: 6,}}
                                                source={{uri: `${url.urlImage}${product.imgProduct}`}}
                                            />
                                            :
                                            <Image 
                                                style={{width: 60, height: 60, borderRadius: 6,}}
                                                source={require("../../assets/images/placeholder-image.jpg")}
                                            />
                                        }

                                        <View style={styles.itemQtdContainer}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.itemQtd}>{product.qtdProduct}</Text>
                                        </View>
                                    </View>
                
                                    <View style={styles.itemInfoContainer}>
                                        <View style={styles.titleProduct}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.nameProduct}>{product.nameProduct}</Text>
                                            {product.localization == "fridge" && 
                                                <Text maxFontSizeMultiplier={1.2} style={styles.categoryProduct}>(Frigobar)</Text>
                                            }
                                            {product.localization == "pool" && 
                                                <Text maxFontSizeMultiplier={1.2} style={styles.categoryProduct}>(Piscina)</Text>
                                            }
                                        </View>
                
                                        <View style={styles.itemInfo}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.widthProduct}>{product.widthProduct}</Text>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.valueProduct}>{sumOfProducts(product.valueProduct, product.qtdProduct)}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        : 
                        <Text maxFontSizeMultiplier={1.2} style={styles.emptyBag}>Sacola vazia</Text>
                    }

            </ScrollView>

            <View style={styles.cartContainer}>
                {statusReservation == "Check-out" ?
                    <TouchableOpacity 
                        style={[styles.buttonCart, {backgroundColor: "rgba(224,110,120,0.4)"}]}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.buttonCartText}>Check-out já realizado</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <View style={styles.content}>
                            <View style={styles.prices}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.subtotalText}>Subtotal</Text>
                                <Text maxFontSizeMultiplier={1.2} style={styles.subtotalText}>{list !== undefined ? subtotal() : "R$ 0,00"}</Text>
                            </View>
                            <View style={[styles.prices, styles.total]}>
                                <Text maxFontSizeMultiplier={1.2} style={styles.totalText}>Total</Text>
                                <Text maxFontSizeMultiplier={1.2} style={styles.totalText}>{list !== undefined ? total() : "R$ 0,00"}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.buttonCart}
                            onPress={() => {
                                navigation.navigate("Payment", {
                                    localName, 
                                    localAddress, 
                                    listProducts,
                                    extract: true,
                                })
                            }}
                        >
                            <Text maxFontSizeMultiplier={1.5} style={styles.buttonCartText}>Check-out</Text>
                        </TouchableOpacity>
                    </>   
                }
            </View>

            {loading && <Loading />}
        </View>
    )
}
