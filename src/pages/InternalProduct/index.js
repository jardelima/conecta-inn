import React, { useState, useEffect, useContext } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    Image, 
    ScrollView,
    Linking,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import Header from "../../components/Header";
import globalStyles from "../../components/globalStyle/style";
import styles from "./style";
import { User } from "../../contexts/User";
import url from "../../../url-config";
import { useIsFocused } from "@react-navigation/native";

export default function InternalProduct({ navigation, route }) {
    const [result, setResult] = useState(valueProduct);
    const [qtd, setQtd] = useState(1);
    const [favList, setFavList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [pageReturn, setPageReturn] = useState(null);
    const isFocused = useIsFocused();
    let newFavList = [];
    
    const { 
        typeProduct,
        slideImages,
        idProduct,
        listProducts,
        checkOut,
        imgProduct,
        page,
        qtdProduct, 
        nameProduct, 
        widthProduct, 
        valueProduct,
        localName, 
        localAddress, 
        deliveryProduct,
        descriptionProduct,
    } = route.params;

    const { statusReservation } = useContext(User);

    function valueProducts(qtd) {
        const cleanValueProduct = Number(valueProduct.replace("R$ ", "").replace(",", "."));

        setResult(`R$ ${(cleanValueProduct * qtd).toFixed(2)}`)
    }

    function renderSlides({ item }) {
        return (
            <View>
                <Image 
                    style={{width: "100%", height: 300, borderRadius: 6,}}
                    source={{uri: `${url.urlImage}${item.uri}`}}
                />
            </View>
        )
    }

    useEffect(() => {
        switch (page) {
            case "menu":
                setPageReturn("InternalMenu");
                break;
            case "tour":
                setPageReturn("InternalTour");
                break;
            case "services":
                setPageReturn("InternalServices");
                break;
            case "pool":
                setPageReturn("InternalPool");
                break;
            case "fridge":
                setPageReturn("InternalFridge");
                break;
            default:
                break;
        }
    }, [localName, page])

    useEffect(() => {
        if(favList.includes(nameProduct)) {
            setFavorite(false);
        } else {
            setFavorite(true);
        }
    });

    useEffect(() => {
        const updateQtdProduct = navigation.addListener("focus", async () => {
            if(qtd !== 1) {
                setQtd(1);
            }
        });

        return updateQtdProduct;
    }, [navigation, isFocused]);

    return (
        <View style={styles.container}>
            <Header 
                src={require("../../assets/icons/menu.png")} 
                openDrawerMenu="true"
            />

            <View style={styles.container}>
                <ScrollView style={styles.containerItems}>
                    <TouchableOpacity 
                        style={globalStyles.buttonReturn}
                        onPress={() => {
                            setQtd(1);
                            setFavorite(true);

                            navigation.navigate(pageReturn, { localName, localAddress, checkOut, listProducts });
                        }}
                    >
                        <Image 
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>  

                    <View>
                        <View style={styles.slideContainer}>
                            <AppIntroSlider 
                                renderItem={renderSlides}
                                data={slideImages}
                                showNextButton={false}
                                showDoneButton={false}
                                dotStyle={{
                                    backgroundColor: "#CED4DA80",
                                    width: 24,
                                    height: 6,
                                    borderRadius: 12,
                                    marginTop: 130,
                                }}
                                activeDotStyle={{
                                    backgroundColor: "#E06E78",
                                    width: 24,
                                    height: 6,
                                    borderRadius: 12,
                                    marginTop: 130,
                                }}
                            />

                            {favorite ? 
                                <TouchableOpacity 
                                    style={styles.favorite}
                                    onPress={() => {
                                        setFavorite(!favorite);

                                        if(favList.includes(nameProduct)) {
                                            return false;
                                        } else {
                                            setFavList([...favList, nameProduct]);
                                        }
                                    }}
                                >
                                    <Image source={require("../../assets/icons/heart.png")} />
                                </TouchableOpacity>  
                                : 
                                <TouchableOpacity
                                    style={styles.favorite}
                                    onPress={() => {
                                        setFavorite(!favorite);

                                        if(favList.length == 1) {
                                            setFavList([]);
                                        } else {
                                            favList.map((product) => {
                                                if(product !== nameProduct) {
                                                    newFavList = [...newFavList, product];
                                                }
                                                
                                                setFavList(newFavList)
                                            });
                                        }
                                    }}
                                >
                                    <Image source={require("../../assets/icons/heart-active.png")} />
                                </TouchableOpacity> 
                            }
                        </View>

                        <Text allowFontScaling={false} style={styles.nameProduct}>{nameProduct}</Text>

                        <View style={styles.infoProduct}>
                            <Text style={styles.widthProduct}>{widthProduct}</Text>

                            <View style={styles.avaliation}>
                                <Image 
                                    source={require("../../assets/icons/star.png")}
                                />
                                <Text maxFontSizeMultiplier={1.2} style={styles.avaliationText}>4.0</Text>
                            </View>
                        </View>

                        <Text maxFontSizeMultiplier={1.2} style={styles.descriptionProduct}>{descriptionProduct}</Text>
                    </View>
                </ScrollView>

                <View style={styles.buttonsContainer}>
                    {nameProduct == "Lavanderia" && 
                        // <TouchableOpacity style={styles.buttonChat}
                        //     onPress={() => {
                        //         Linking.openURL("https://wa.me/558599999999");
                        //     }}
                        // >
                        //     <Text style={styles.buttonChatText}>Falar com atendente</Text>
                        // </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonChat}
                            onPress={() => navigation.navigate("Chat", {
                                typeProduct,
                                slideImages,
                                idProduct,
                                listProducts,
                                localName,
                                localAddress,
                                checkOut,
                                page: page,
                                qtdProduct: qtd,
                                imgProduct: imgProduct,
                                nameProduct: nameProduct,
                                widthProduct: widthProduct,
                                valueProduct: valueProduct,
                                deliveryProduct: deliveryProduct,
                                descriptionProduct: descriptionProduct,
                                chatInProduct: true,
                            })}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.buttonChatText}>Falar com atendente</Text>
                        </TouchableOpacity>
                    }
                    
                    {nameProduct == "Spa" && 
                        // <TouchableOpacity style={styles.buttonChat}
                        //     onPress={() => {
                        //         Linking.openURL("https://wa.me/558599999999");
                        //     }}
                        // >
                        //     <Text style={styles.buttonChatText}>Falar com atendente</Text>
                        // </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonChat}
                            onPress={() => navigation.navigate("Chat", {
                                typeProduct,
                                slideImages,
                                idProduct,
                                listProducts,
                                localName,
                                localAddress,
                                checkOut,
                                page: page,
                                qtdProduct: qtd,
                                imgProduct: imgProduct,
                                nameProduct: nameProduct,
                                widthProduct: widthProduct,
                                valueProduct: valueProduct,
                                deliveryProduct: deliveryProduct,
                                descriptionProduct: descriptionProduct,
                                chatInProduct: true,
                            })}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.buttonChatText}>Falar com atendente</Text>
                        </TouchableOpacity>
                    }
                    
                    <View style={styles.buttonsRow}>
                        <View style={styles.buttonsQtd}>
                            <TouchableOpacity 
                                style={styles.buttonReduce}
                                onPress={() => {
                                    if(qtd > 1) {
                                        setQtd(qtd - 1);
                                        valueProducts(qtd - 1);
                                    } else {
                                        setQtd(qtd);
                                    }
                                }}    
                            >
                                <Text allowFontScaling={false} style={styles.buttonReduceText}>-</Text>
                            </TouchableOpacity>

                            <Text maxFontSizeMultiplier={1.1} style={[styles.qtd, {opacity: statusReservation == "Check-out" || statusReservation == "Confirmada" ? 0.5 : 1}]}>{qtd}</Text>

                            <TouchableOpacity 
                                style={styles.buttonIncrease}
                                onPress={() => {
                                    if(statusReservation == "Check-in") {
                                        setQtd(qtd + 1);
                                        valueProducts(qtd + 1);
                                    }
                                }}
                            >
                                <Text allowFontScaling={false} style={[styles.buttonIncreaseText, {opacity: statusReservation == "Check-out" || statusReservation == "Confirmada" ? 0.5 : 1}]}>+</Text>
                            </TouchableOpacity>
                        </View>

                        {statusReservation == "Check-out" || statusReservation == "Confirmada"
                            ? 
                                <TouchableOpacity style={[styles.buttonResult, {backgroundColor: "rgba(224,110,120,0.4)"}]}>
                                    <Text allowFontScaling={false} style={styles.buttonResultText}>Adicionar</Text>
                                    <Text maxFontSizeMultiplier={1.1} style={styles.buttonResultValue}>
                                        {qtd === 1 ? valueProduct.replace(".", ",") : result.replace(".", ",")}
                                    </Text>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity 
                                    style={styles.buttonResult}
                                    onPress={() => {
                                        navigation.navigate("Cart", 
                                            {
                                                typeProduct,
                                                slideImages,
                                                idProduct,
                                                listProducts,
                                                localName,
                                                localAddress,
                                                checkOut,
                                                page: page,
                                                qtdProduct: qtd,
                                                imgProduct: imgProduct,
                                                nameProduct: nameProduct,
                                                widthProduct: widthProduct,
                                                valueProduct: valueProduct,
                                                deliveryProduct: deliveryProduct,
                                                descriptionProduct: descriptionProduct,
                                            }
                                        );
                                    }}
                                >
                                    <Text allowFontScaling={false} style={styles.buttonResultText}>Adicionar</Text>
                                    <Text maxFontSizeMultiplier={1.1} style={styles.buttonResultValue}>
                                        {qtd === 1 ? valueProduct.replace(".", ",") : result.replace(".", ",")}
                                    </Text>
                                </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </View>
    )
}
