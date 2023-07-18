import React from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import {
    TouchableOpacity,
    Image,
    Linking,
} from "react-native";

export default function BtnFloat(props) {
    const navigation = useNavigation();

    return (
        // <TouchableOpacity 
        //     style={styles.btnFloat}
        //     onPress={() => {
        //         Linking.openURL("https://wa.me/5585999999999");
        //     }}
        // >
        //     <Image 
        //         style={styles.btnFloatImage}
        //         source={require("../../../assets/icons/chat.png")}
        //     />
        // </TouchableOpacity>
        <TouchableOpacity 
            style={styles.btnFloat}
            onPress={() => navigation.navigate("Chat", {
                localName: props.localName, 
                localAddress: props.localAddress, 
                listProducts: props.listProducts,
                chatInCheckout: props.chatInCheckout,
                service: props.service,
            })}
        >
            <Image 
                style={styles.btnFloatImage}
                source={require("../../assets/icons/chat.png")}
            />
        </TouchableOpacity>
    )
}
