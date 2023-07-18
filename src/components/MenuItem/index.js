import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

export default function MenuItem(props) {
    return (
        <TouchableOpacity 
            style={styles.menuItemContainer}
            onPress={props.linkProduct}
        >
            <Image 
                style={[styles.menuItemImage, {width: 60, height: 60, borderRadius: 6}]}
                source={{uri: props.src}}
            />
            <View style={styles.menuItemDetailsContainer}>
                <Text maxFontSizeMultiplier={1.2} style={styles.menuItemTitle}>{props.nameProduct}</Text>
                <View style={styles.menuItemDetails}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.menuItemDetailWidth}>{props.widthProduct}</Text>
                    <Text maxFontSizeMultiplier={1.2} style={styles.menuItemDetail}>{props.valueProduct}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
