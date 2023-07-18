import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },

    description: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#ADB5BD",
        marginBottom: 24,
        lineHeight: 21,
    },  

    label: {
        fontSize: 16,
        color: "#888",
        marginBottom: 10,
        fontFamily: "ourceSansPro-Regular",
    },

    input: {
        width: "100%",
        height: 48,
        color: "#343A40",
        borderColor: "#CED4DA80",
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
    },

    select: {
        borderWidth: 1, 
        borderRadius: 8, 
        height: 60, 
        marginBottom: 20, 
        borderColor: "#CED4DA80", 
        marginTop: 0, 
        padding: 0,
    },

    formField: {
        marginBottom: 20,
    },

    formInputSelect: {
        height: 50,
        borderWidth: 1,
        borderColor: "#CED4DA80",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#33303E",
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingTop: 14,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.1)"
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalTitleBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },

    modalTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 20,
        color: "#33303E",
    },

    modalButton: {
        backgroundColor: "#E06E78",
        width: 200,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    modalButtonText: {
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
    },

    option: {
        borderWidth: 1, 
        borderColor: "rgba(0,0,0,0.1)", 
        borderRadius: 6, 
        padding: 10, 
        marginBottom: 20,
    },

    arrowTypeDocument: {
        position: "absolute",
        top: 56,
        right: 14,
    },

    requiredField: {
        color: "#ADB5BD",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "SourceSansPro-Regular",
    },
});

export default styles;