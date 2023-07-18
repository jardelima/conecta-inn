import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    containerItems: {
        paddingTop: 24,
        paddingHorizontal: 20,
        flex: 1,
    },

    slideContainer: {
        marginBottom: 36,
        position: "relative",
    },

    favorite: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        width: 36,
        height: 34,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"        
    },

    nameProduct: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
        marginBottom: 6,
    },

    infoProduct: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 30,
    },

    widthProduct: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#979797",
        width: 290,
    },  

    avaliation: {
        flexDirection: "row",
        alignItems: "center",
    },

    avaliationText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#33303E",
        marginLeft: 8,
    },

    descriptionProduct: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#979797",
        lineHeight: 18,
        marginBottom: 50,
    },

    buttonsContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginHorizontal: 20,
        paddingVertical: 10,
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },

    buttonChat: {
        width: "100%",
        height: 50,
        backgroundColor: "#E06E78",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonChatText: {
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
    },

    buttonsQtd: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ECEEF1",
        borderRadius: 100,
    },

    qtd: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#495057",
    },

    buttonReduce: {
        paddingTop: 2,
        paddingBottom: 5,
        paddingHorizontal: 20,
    },

    buttonReduceText: {
        fontSize: 36,
        color: "#C9CCD1",
    },

    buttonIncrease: {
        paddingTop: 2,
        paddingBottom: 5,
        paddingHorizontal: 20,
    },

    buttonIncreaseText: {
        fontSize: 26,
        color: "#E06E78",
    },

    buttonResult: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E06E78",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 100,
    },

    buttonResultText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#fff",
        marginRight: 20,
    },

    buttonResultValue: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        color: "#fff",
    },
});

export default styles;