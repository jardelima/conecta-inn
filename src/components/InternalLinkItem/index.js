import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import styles from "./style";

export default function InternalLinkItem(props) {
    return (
        <View style={[styles.itemContainer, props.fullItem && styles.itemFullContainer]}>
            <TouchableOpacity
                style={[styles.item, props.fullItem && styles.itemFull]}
                activeOpacity={2}
                onPress={props.link}
            >
                <Image
                    style={[styles.itemImage, props.disabled && { opacity: .4 }, props.fullItem && styles.imageFullItem]}
                    source={props.src}
                />
            </TouchableOpacity>

            <Text maxFontSizeMultiplier={1.2} style={[styles.itemText, props.disabled && { opacity: .4 }, props.fullItem && {alignSelf: "flex-start", paddingLeft: 10,}]} >{props.title}</Text>
        </View>
    )
}
