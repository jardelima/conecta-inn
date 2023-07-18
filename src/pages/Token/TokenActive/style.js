import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },

    header: {
        backgroundColor: "#7D81D2",
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                paddingTop: 70,
            },
        }), 
    },

    buttonReturn: {
        backgroundColor: "#F5F6F8",
        borderRadius: 50,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 20,
    },

    headerTitle: {
        fontFamily: "montserrat-bold",
        fontSize: 16,
        color: "#fff"
    },

    containerInput: {
        marginTop: 20,
    },

    titleInput: {
        fontFamily: "montserrat-bold",
        fontSize: 22,
        color: "#33303E",
        marginBottom: 16,
    },  

    textInput: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#ADB5BD",
        marginBottom: 24,
    },

    input: {
        width: "100%",
        height: 48,
        color: "#343A40",
        borderColor: "#CED4DA80",
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    tokenButton: {
        backgroundColor: "#E06E78",
        borderRadius: 50,
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    tokenButtonText: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 14,
        textTransform: "uppercase",
        color: "#fff",
    },
});

export default styles;