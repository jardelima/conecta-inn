import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btnFloat: {
        backgroundColor: "#E06E78",
        color: "#fff",
        width: 60,
        height: 60,
        borderRadius: 100,
        position: "absolute",
        right: 20,
        bottom: 120,
        alignItems: "center",
        justifyContent: "center",
    },

    btnFloatImage: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
});

export default styles;