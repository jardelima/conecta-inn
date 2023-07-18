import React from "react";
import { 
    View, 
    TouchableOpacity, 
    Image, 
    Text} 
from "react-native";

import styles from "./style";

export default function ReservationItem(props) {
    return (
        <TouchableOpacity 
            style={styles.itemContainer}
            onPress={props.route}
            activeOpacity={2}
        >
            <Image 
                style={[styles.itemImage, {width: "100%", height: 150,}]}
                source={props.image}
            />

            <View style={styles.itemDates}>
                <View style={styles.itemDate}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.itemNumber}>{props.firstDate}</Text>
                    <Text maxFontSizeMultiplier={1.2} style={styles.itemMonth}>{props.firstMonth}</Text>
                </View>
                <Text style={styles.itemSpacer}>-</Text>
                <View style={styles.itemDate}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.itemNumber}>{props.secondDate}</Text>
                    <Text maxFontSizeMultiplier={1.2} style={styles.itemMonth}>{props.secondMonth}</Text>
                </View>
            </View>

            <Text maxFontSizeMultiplier={1.2} style={styles.itemLocalName}>{props.localName}</Text>

            <View style={styles.itemLocalContainer}>
                <Image 
                    style={styles.itemLocalIcon}
                    source={require("../../assets/icons/map-pin.png")}
                />
                <Text maxFontSizeMultiplier={1.2} style={styles.itemLocalAddress}>{props.localAddress}</Text>
            </View>
        </TouchableOpacity>
    )
}
