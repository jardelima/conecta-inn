import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    itemContainer: {
        width: "48%",
        height: 170,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    itemFullContainer: {
        width: "100%",
    },

    item: {
        width: "48%",
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        borderRadius: 8,
    },

    itemFull: {
        width: "100%",
        padding: 0,
    },

    itemImage: {
        width: 160,
        height: 120,
        resizeMode: "contain",
        marginBottom: 14,
        borderRadius: 24,
    },

    imageFullItem: {
        width: "100%",
    },  

    itemText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 17,
        textAlign: "center",
        color: "#33303E",
    }
});

export default styles;