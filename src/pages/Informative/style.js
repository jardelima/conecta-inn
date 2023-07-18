import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 20,
        backgroundColor: "#fff",
    },

    header: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },

    buttonReturn: {
        position: "absolute",
        left: 0,
        top: 15,
    },

    slideImage: {
        width: "100%",
        height: 120,
        borderRadius: 8,
        marginTop: 30,
    },

    description: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        marginVertical: 30,
    }
});

export default styles;