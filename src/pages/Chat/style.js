import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    containerHeader: {
        backgroundColor: "#7D81D2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        ...Platform.select({
            ios: {
                paddingTop: 70,
            },
        }), 
    },

    containerMessages: {
        backgroundColor: "#F8F9FA",
        padding: 20,
    },

    blockMessage: {
        marginBottom: 30,
    },

    containerInputMessage: {
        backgroundColor: "#fff",
        padding: 20,
        position: "relative",
        ...Platform.select({
            ios: {
                marginBottom: 40,
            },
        }), 
    },

    titleHeader: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#fff",
    },

    buttonHeader: {
        position: "absolute",
        left: 20,
        top: 10,
        ...Platform.select({
            ios: {
                top: 70,
            },
        }), 
    },

    buttonTextHeader: {
        color: "#fff",
        fontSize: 24,
    },

    formInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CED4DA80",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#33303E",
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingRight: 50,
    },

    formSubmit: {
        position: "absolute",
        right: 24,
        top: 24,
        padding: 12,
    },

    titleMessage: {
        textAlign: "center",
        paddingVertical: 32,
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 12,
        color: "#CED4DA",
    },

    messageFromSupport: {
        alignSelf: "flex-start",
        maxWidth: "90%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    messageFromClient: {
        alignSelf: "flex-end",
        maxWidth: "90%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    textFromSupport: {
        color: "#979797",
    },

    textFromClient: {
        color: "#979797",
    },
});

export default styles;