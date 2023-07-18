import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    itemContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },

    itemImage: {
        resizeMode: "cover",
        borderRadius: 8,
        marginBottom: 16,
    },

    itemDates: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    itemDate: {
        backgroundColor: "#CED4DA33",
        paddingVertical: 6,
        width: "100%",
        maxWidth: 160,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    itemNumber: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 18,
        color: "#E06E78",
        textAlign: "center",
    },

    itemMonth: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 10,
        color: "#ADB5BD",
        textAlign: "center",
        textTransform: "uppercase",
    },

    itemSpacer: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 20,
        color: "#979797",
    },

    itemLocalName: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#33303E",
        alignSelf: "flex-start",
        marginBottom: 10,
    },

    itemLocalContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },

    itemLocalIcon: {
        resizeMode: "contain",
        marginRight: 10,
    },

    itemLocalAddress: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },
});

export default styles;