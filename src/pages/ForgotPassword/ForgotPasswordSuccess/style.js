import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: "#7D81D2",
    },  

    exit: {
        width: 30,
        alignSelf: "flex-end",
        justifyContent: "flex-end",
    },

    exitImage: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    titleContainer: {
        paddingHorizontal: 30,
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        lineHeight: 31,
        textAlign: "center",
        color: "#fff",
    },

    subtitle: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        color: "#fff",
        marginTop: 16,
    },
});

export default styles;