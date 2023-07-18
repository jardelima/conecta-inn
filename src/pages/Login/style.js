import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
        marginBottom: 50,
        ...Platform.select({
            ios: {
                marginTop: 60,
            },
        }),
    },

    forgotPassword: {
        alignItems: "flex-end",
        alignSelf: "flex-end",
        width: "100%",
        maxWidth: 140,
    },

    forgotPasswordText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#E06E78",
    },

    register: {
        alignItems: "center",
        marginTop: 40,
    },

    registerMessage: {
        fontFamily: "SourceSansPro-Regular",
        color: "#ADB5BD",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },

    registerButton: {
        alignItems: "center",
    },

    registerButtonText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#E06E78",
    },

    inputField: {
        marginBottom: 30,
    },  

    label: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#495057",
        marginBottom: 10,
    },

    input: {
        width: "100%",
        height: 48,
        color: "#343A40",
        borderColor: "#CED4DA80",
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 40,
    },

    containerSavePassword: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 60,
    },

    containerBtnSavePassword: {
        flexDirection: "row", 
        alignItems: "center", 
    },

    btnSavePassword: {
        width: 185, 
        height: 17, 
        flexDirection: "row",
    },

    checkboxBtnSavePassword: {
        width: 16,
        height: 17,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1, 
        borderRadius: 4,
    },

    textBtnSavePassword: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#E06E78",
        marginLeft: 6,
    },
});

export default styles;