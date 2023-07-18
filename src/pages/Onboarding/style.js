import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#7D81D2",
        paddingHorizontal: 20,
        paddingVertical: 40,
        flex: 1,
    },

    exitButton: {
        alignSelf: "flex-end",
    },

    title: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 16,
        color: "#fff",
        lineHeight: 24,
        textAlign: "center",
    },

    description: {
        fontFamily: "SourceSansPro-Bold",
        fontSize: 14,
        color: "#F0CD86",
        lineHeight: 24,
        textAlign: "center",
        width: 300,
        alignSelf: "center",
    },

    buttonContainer: {
        width: "100%",
    },

    buttonNext: {
        backgroundColor: "#E06E78",
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        marginVertical: 20,
    },

    buttonNextText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        fontFamily: "SourceSansPro-SemiBold"
    },

    buttonSkip: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    buttonSkipText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        fontFamily: "SourceSansPro-SemiBold"
    },

    slidesContainer: {
        height: "100%",
    },

    slideImage: {
        marginTop: 30,
        alignSelf: "center",
    }
})

export default styles;