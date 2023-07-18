import React from "react";
import {
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import styles from "./style";
import url from "../../../url-config";

export default function Informative({ navigation, route }) {
    const {
        localName,
        localAddress,
        listProducts,
        description,
        image,
        checkOut,
    } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.buttonReturn}
                    onPress={() => {
                        if (!checkOut) {
                            navigation.navigate("InternalHotel", {
                                localName,
                                localAddress,
                                listProducts,
                            });
                        } else {
                            navigation.navigate("CheckOut", {
                                localName,
                                localAddress,
                                listProducts,
                            });
                        }
                    }}
                >
                    <Image source={require("../../assets/icons/arrow-left.png")} />
                </TouchableOpacity>

                <Text maxFontSizeMultiplier={1.2}>Informações Úteis</Text>
            </View>

            <View>
                <Image style={styles.slideImage} source={{ uri: `${url.urlImage}${image}`}} />

                <Text maxFontSizeMultiplier={1.2} style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}
