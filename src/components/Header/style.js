import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#7D81D2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        ...Platform.select({
            ios: {
                paddingTop: 70,
            },
        }), 
    },

    icons: {
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
    },

    notification: {
        marginRight: 30,
    },

    notificationAlert: {
        position: "absolute",
        width: 8,
        height: 8,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#33303E",
        bottom: 0,
        right: -2,
        zIndex: 2,
    },

    notificationAlertActive: {
        borderColor: "#F45252",
        backgroundColor: "#F45252",
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

    invisible: {
        display: "none",
    }
});

export default styles;