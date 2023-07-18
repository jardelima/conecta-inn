import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    containerButton: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 10,
    },

    content: {
        paddingHorizontal: 20,
    },

    titles: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
        marginBottom: 0
    },

    clean: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    item: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F6F8",
        position: "relative",
    },

    itemInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    itemInfoContainer: {
        width: "96%",
    },

    titleProduct: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        flexWrap: "wrap"
    },

    nameProduct: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#495057",
        marginRight: 10,
    },

    categoryProduct: {
        fontSize: 14,
        fontFamily: "SourceSansPro-SemiBold",
        color: "#979797"
    },

    nameProduct: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#495057",
        marginBottom: 10,
    },

    widthProduct: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
        alignSelf: "flex-start",
        width: "75%",
    },  

    valueProduct: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
        alignSelf: "flex-end",
    },

    itemImage: {
        position: "relative",
        marginRight: 14,
    },

    itemQtdContainer: {
        position: "absolute",
        bottom: 4,
        right: 4,
        borderRadius: 100,
        backgroundColor: "#7D81D2",
        overflow: "hidden",
    },  

    itemQtd: {
        backgroundColor: "#7D81D2",
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },

    emptyBag: {
        textAlign: "center",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#979797",
        paddingTop: 30,
    },

    cartContainer: {
        padding: 20,
        backgroundColor: "#F8F9FA",
    },

    subtotalText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E",
    },  

    deliveryText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#979797",
    },

    totalText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 20,
        color: "#33303E",
    },

    prices: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    total: {
        borderTopWidth: 1,
        borderTopColor:  "#E4E4E499",
        paddingTop: 20,
        marginTop: 10,
        marginBottom: 20,
    },

    buttonCart: {
        width: "100%",
        backgroundColor: "#E06E78",
        borderRadius: 100,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonCartText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
    }
});

export default styles;