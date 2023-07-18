import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerMenu: {
        flex: 1,
        padding: 20,
        backgroundColor: "#7D81D2",
        justifyContent: "space-between",
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#fff",
        marginBottom: 28,
    },

    item: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 18,
        color: "#fff",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F6F833"
    },

    lastItem: {
        borderBottomWidth: 0,
    },
});

export default styles;