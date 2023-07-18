import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 22,
        color: "#1E1E20",
        marginBottom: 16,
    },

    buttonPrimary: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E06E78",
        width: "100%",
        height: 46,
        borderRadius: 24,
    },

    buttonPrimaryText: {
        fontFamily: "SourceSansPro-SemiBold",
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
    },

    buttonSecondary: {
        backgroundColor: "#F0CD86",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 46,
        borderRadius: 24,
    },

    buttonSecondaryText: {
        fontFamily: "SourceSansPro-SemiBold",
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
    },

    buttonReturn: {
        backgroundColor: "#F5F6F8",
        padding: 10,
        width: 40,
        borderRadius: 50,
        marginBottom: 15,
    },

    buttonReturnImage: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    },

    inputArea: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",
        marginBottom: 20,
    },

    iconPassword: {
        position: "absolute",
        right: 10,
    },

    errorMessage: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#dc143c",
    },
});

export default globalStyles;