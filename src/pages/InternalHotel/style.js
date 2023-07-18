import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        flexBasis: "90%",
    },

    containerScroll: {
        marginBottom: 25,
    },  

    titleContainer: {
        marginBottom: 30,
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
        marginBottom: 10,
    },

    subtitleContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },

    subtitleImage: {
        resizeMode: "contain",
    },

    subtitleText: {
        marginLeft: 10,
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    linksContainer: {
        width: "100%",
    },

    linksRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    }, 

    btnCheckIn: {
        flexBasis: "7%",
        backgroundColor: "#E06E78",
        borderRadius: 100,
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                marginBottom: 45,
            },
        }), 
    },

    btnCheckInText: {
        fontFamily: "SourceSansPro-SemiBold",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },

    checkIn: {
        marginBottom: 10,
    },

    checkInBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 8,
    },  

    checkInTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#495057",
    },

    checkInText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    checkOut: {
        marginTop: 10,
    },

    checkOutTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#495057",
    },

    checkOutText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
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

    textNotification: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },
});

export default styles;