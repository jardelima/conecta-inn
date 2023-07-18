import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        position: "absolute",
        top: -10,
        width: "100%",
    },

    modalView: {
        flex: 1,
        width: "90%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    closeModal: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },

    titleTerms: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#1E1E20",
        marginVertical: 10,
    },

    subtitleTerms: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#1E1E20",
        marginVertical: 8,
    },

    text: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#1E1E20",
        marginVertical: 8,
    },

    terms: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },  

    acceptTerms: {
        backgroundColor: "#E06E78",
        width: 10,
        height: 10,
    },

    buttonTerms: {
        borderWidth: 1,
        borderColor: "#ADB5BD",
        padding: 4,
        width: 15,
        height: 15,
        marginRight: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    termsText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 12,
    },

    nextButtonActive: {
        width: "100%",
        height: 40,
        borderRadius: 50,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E06E78",
    },

    nextButtonDisabled: {
        width: "100%",
        height: 40,
        borderRadius: 50,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3D3D3",
    },

    nextButtonText: {
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        textAlign: "center",
    },
});

export default styles;