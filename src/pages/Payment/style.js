import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    
    buttonReturn: {
        marginTop: 14,
    },

    containerTitle: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    editText: {
        fontSize: 14,
        marginBottom: 20,
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
    },

    support: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
    },

    cardDisabled: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#F5F6F8",
        borderRadius: 6,
    },

    cardText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E"
    },

    cardActive: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#E06E78",
        borderRadius: 6,
    },

    cardTextActive: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#fff"
    },

    formField: {
        marginBottom: 14,
    },  

    formLabel: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#33303E",
        marginBottom: 8,
    },  

    formInput: {
        borderWidth: 1,
        borderColor: "#CED4DA80",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#33303E",
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        paddingHorizontal: 10,
        height: 40,
    },

    containerButton: {
        paddingHorizontal: 20,
        paddingVertical: 20,
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
    }
});

export default styles;