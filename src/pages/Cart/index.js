import React, { useState, useEffect, useContext } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import styles from "./style";
import globalStyles from "../../components/globalStyle/style";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { User } from "../../contexts/User";
import url from "../../../url-config";

export default function Cart({ navigation, route }) {
    const [list, setList] = useState([]);
    const [addListItems, setAddListItems] = useState([]);
    const [clean, setClean] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState("");
    const [currentQtdProduct, setCurrentQtdProduct] = useState(0);
    const [modalProduct, setModalProduct] = useState(false);
    const isFocused = useIsFocused();

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
        imgSlideOne,
        imgSlideTwo,
        imgSlideThree,
        deliveryProduct,
        descriptionProduct,
    } = route.params;

    const {
        idReservation,
        tokenAuth, 
    } = useContext(User);

    useEffect(() => {
        setLoading(true);
        
        const addItemsList = navigation.addListener("focus", () => {
            let newQtdProduct = 0;
            let newQtdProductList = 0;

            for(let index = 0; index < list.length; index++) {
                if(list[index].nameProduct == nameProduct) {
                    newQtdProduct = qtdProduct + list[index].qtdProduct;
                    list.splice(index, 1);
                }
            }

            for(let i = 0; i < addListItems.length; i++) {
                if(addListItems[i].name_product == nameProduct) {
                    newQtdProductList = qtdProduct + addListItems[i].product_quantity;
                    addListItems.splice(i, 1);
                }
            }

            setList(
                [{
                    imgProduct: `${imgProduct}`,
                    qtdProduct: newQtdProduct == 0 ? qtdProduct : newQtdProduct,
                    nameProduct: nameProduct,
                    widthProduct: widthProduct,
                    valueProduct: valueProduct,
                    deliveryProduct: deliveryProduct,
                    typeProduct: typeProduct,
                    page: page,
                }, ...list]
            )

            setAddListItems(
                [{
                    name_product: nameProduct,
                    product_description: `${nameProduct} ${widthProduct == null ? "" : widthProduct}||${Number(valueProduct.replace("R$", "").replace(" ", "")).toFixed(1)}`,
                    product_quantity: newQtdProductList == 0 ? qtdProduct : newQtdProductList,
                    type: typeProduct,
                    image: `${imgProduct}`,
                    additional_info: widthProduct,
                    localization: page,
                }, ...addListItems]
            )

            setClean(false);
            setLoading(false);
        });

        return addItemsList;
    }, [navigation, isFocused]);

    async function sendItems() {
        setLoading(true);

        let responseProducts = await fetch(`${url.urlBase}/reservation/${idReservation}/add-items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + tokenAuth,
            },
            body: JSON.stringify({ 
                data: addListItems, 
                multiple: true, 
            }),
        });

        const productsResponse = await responseProducts.json();

        if(responseProducts.ok) {
            setLoading(false);
            setModal(true);
        } else {
            setLoading(false);
        }
    }

    const sumOfProducts = (valueProduct, qtdProduct) => {
        let cleanValueProduct = Number(valueProduct.replace("R$ ", "").replace(",", "."));
    
        return `R$ ${(cleanValueProduct * qtdProduct).toFixed(2).replace(".", ",")}`
    }

    const subtotal = () => {
        let subtotal = 0;

        list.forEach(product => {
            subtotal += Number(product.valueProduct.replace("R$", "").replace(",",".")) * product.qtdProduct
        });

        return `R$ ${subtotal.toFixed(2).replace(".", ",")}`
    }

    const total = () => {
        let subtotal = 0;

        list.forEach(product => {
            subtotal += Number(product.valueProduct.replace("R$", "").replace(",", 
             ".")) * product.qtdProduct
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
            <StatusBar backgroundColor={loading ?  "#7073b5" : modal ? "#7073b5" : "#7D81D2"} />

            <View style={styles.containerButton}>
                {/* {clean ? <View></View> : 
                    <TouchableOpacity 
                        style={globalStyles.buttonReturn}
                        onPress={() => {
                            if(clean && !checkOut) {
                                navigation.navigate("InternalHotel",
                                    {
                                        imgProduct,
                                        page,
                                        qtdProduct,
                                        nameProduct,
                                        widthProduct, 
                                        valueProduct,
                                        localName, 
                                        localAddress, 
                                        imgSlideOne,
                                        imgSlideTwo,
                                        imgSlideThree,
                                        deliveryProduct,
                                        descriptionProduct,
                                    }
                                )
                            } else {
                                navigation.navigate("InternalProduct",
                                    {
                                        typeProduct,
                                        slideImages,
                                        idProduct,
                                        checkOut,
                                        listProducts,
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
                                    }
                                )
                            }
                        }}
                    >
                        <Image 
                            style={globalStyles.buttonReturnImage}
                            source={require("../../assets/icons/arrow-left.png")}
                        />
                    </TouchableOpacity>
                }
                 */}
            </View>

            <View style={[styles.content, styles.titles]}>
                <Text allowFontScaling={false} style={styles.title}>Sacola</Text>

                <TouchableOpacity 
                    onPress={() => {
                        setList([]);
                        setAddListItems([]);
                        setClean(true);
                    }}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.clean}>Limpar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                    {
                        list.map((product, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.item} 
                                    onPress={() => {
                                        setCurrentProduct(product.nameProduct);
                                        setCurrentQtdProduct(product.qtdProduct);
                                        setModalProduct(true);
                                    }}
                                >
                                    <View style={styles.itemImage}>
                                        <Image 
                                            style={{width: 60, height: 60, borderRadius: 6,}}
                                            source={{uri: product.imgProduct}}
                                        />

                                        <View style={styles.itemQtdContainer}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.itemQtd}>{product.qtdProduct}</Text>
                                        </View>
                                    </View>
                
                                    <View style={styles.itemInfoContainer}>
                                        <View style={styles.titleProduct}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.nameProduct}>{product.nameProduct}</Text>
                                            {product.page == "fridge" && 
                                                <Text maxFontSizeMultiplier={1.2} style={styles.categoryProduct}>(Frigobar)</Text>
                                            }
                                            {product.page == "pool" && 
                                                <Text maxFontSizeMultiplier={1.2} style={styles.categoryProduct}>(Piscina)</Text>
                                            }
                                        </View>
                
                                        <View style={styles.itemInfo}>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.widthProduct}>{product.widthProduct}</Text>
                                            <Text maxFontSizeMultiplier={1.2} style={styles.valueProduct}>{sumOfProducts(product.valueProduct, product.qtdProduct)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                <TouchableOpacity 
                    style={styles.addMoreItems}
                    onPress={() => {
                        navigation.navigate("CheckOut", {
                            listProducts: list,
                            imgProduct,
                            page,
                            qtdProduct,
                            nameProduct,
                            widthProduct, 
                            valueProduct,
                            localName, 
                            localAddress, 
                            imgSlideOne,
                            imgSlideTwo,
                            imgSlideThree,
                            deliveryProduct,
                            descriptionProduct,
                        })
                    }}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.addMoreItemsText}>Adicionar mais itens</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.cartContainer}>
                <View style={styles.content}>
                    <View style={styles.prices}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.subtotalText}>Subtotal</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.subtotalText}>{subtotal()}</Text>
                    </View>
                    <View style={[styles.prices, styles.total]}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.totalText}>Total</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.totalText}>{total()}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.buttonCart}
                    onPress={() => sendItems()}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.buttonCartText}>Solicitar</Text>
                </TouchableOpacity>
            </View>

            {modal ?
                <View style={styles.modal}>
                    <View style={styles.modalBox}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.modalText}>Itens adicionados com sucesso!</Text>

                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={() => {
                                setModal(false);
                                setList([]);
                                setAddListItems([]);

                                navigation.navigate("CheckOut", {
                                    listProducts: list,
                                    imgProduct,
                                    page,
                                    qtdProduct,
                                    nameProduct,
                                    widthProduct, 
                                    valueProduct,
                                    localName, 
                                    localAddress, 
                                    imgSlideOne,
                                    imgSlideTwo,
                                    imgSlideThree,
                                    deliveryProduct,
                                    descriptionProduct,
                                });
                            }}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.modalButtonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : 
                false
            }

            {modalProduct ?
                <View style={styles.modal}>
                    <View style={styles.modalBox}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.modalText}>Deseja remover {currentProduct}?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={styles.modalProductButton} 
                                onPress={() => setModalProduct(false)}
                            >
                                <Text maxFontSizeMultiplier={1.2} style={styles.modalButtonText}>Não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.modalProductButton}
                                onPress={() => {
                                    for(let index = 0; index < list.length; index++) {
                                        if(list[index].nameProduct == currentProduct && list[index].qtdProduct == currentQtdProduct) {
                                            list.splice(index, 1)
                                        }
                                    }

                                    for(let i = 0; i < addListItems.length; i++) {
                                        if(addListItems[i].name_product == currentProduct && addListItems[i].product_quantity == currentQtdProduct) {
                                            addListItems.splice(i, 1)
                                        }
                                    }

                                    setModalProduct(false);
                                }}
                            >
                                <Text maxFontSizeMultiplier={1.2} style={styles.modalButtonText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                : 
                false
            }

            {loading &&
                <Loading />
            }
        </View>
    )
}
