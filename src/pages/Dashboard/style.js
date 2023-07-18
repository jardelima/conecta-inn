import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        flex: 1,
    },

    container: {
        padding: 20,
        backgroundColor: "#fff",
    },

    titleSmall: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 13,
        color: "#33303E",
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
        marginBottom: 30,
    },

    tokenContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },

    tokenTitle: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E",
        textAlign: "center",
        marginBottom: 50,
    },

    tokenButton: {
        backgroundColor: "#E06E78",
        borderRadius: 50,
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    tokenButtonText: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 14,
        textTransform: "uppercase",
        color: "#fff",
    }
});

export default styles;