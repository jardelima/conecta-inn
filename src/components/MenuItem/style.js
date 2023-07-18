import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    menuItemContainer: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F6F8",
    },

    menuItemImage: {
        resizeMode: "cover",
        marginRight: 16,
        borderRadius: 6,
    },

    menuItemTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        marginBottom: 8,
        color: "#33303E",
    },

    menuItemDetailsContainer: {
        width: "75%",
    },  

    menuItemDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    menuItemDetail: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    menuItemDetailWidth: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
        width: 180,
    },
});

export default styles;