import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    buttonReturnContainer: {
        paddingTop: 24,
        paddingLeft: 20,
    },

    titleContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    title: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        color: "#33303E",
    },

    subtitle: {
        fontFamily: "montserrat-bold",
        fontSize: 18,
        color: "#33303E",
        marginBottom: 20,
    },

    buttonHelpText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },

    formField: {
        marginBottom: 20,
    },

    formLabel: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 14,
        color: "#33303E",
        paddingBottom: 8,
    },

    formInput: {
        borderWidth: 1,
        height: 50,
        borderColor: "#CED4DA80",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#33303E",
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        paddingHorizontal: 10,
    },

    fileContainer: {
        width: "100%",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#CED4DA80",
    },

    addFileDefault: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
    },

    addFile: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
        paddingTop: 10,
    },

    fileIcon: {
        backgroundColor: "#F5F6F8",
        color: "#E06E78",
        borderRadius: 100,
        textAlign: "center",
        fontSize: 32,
        paddingHorizontal: 14,
        marginBottom: 10,
    },

    fileText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E",
    },

    file: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E",
        textAlign: "center",
        paddingTop: 40,
        marginBottom: 10,
    },

    buttonContainer: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        ...Platform.select({
            ios: {
                paddingVertical: 20,
            }
        })
    },

    buttonCheckIn: {
        backgroundColor: "#E06E78",
        padding: 12,
        borderRadius: 100,
    },

    buttonCheckInText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
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

    modalTitleBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },

    modalTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 20,
        color: "#33303E",
    },

    modalButton: {
        backgroundColor: "#E06E78",
        width: 200,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    modalButtonText: {
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
    },

    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
    },

    cardDisabled: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#F5F6F8",
        borderRadius: 6,
    },

    cardText: {
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        color: "#33303E"
    },

    cardActive: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "#E06E78",
        borderRadius: 6,
    },

    cardTextActive: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
        color: "#fff"
    },

    select: {
        borderWidth: 1, 
        borderRadius: 8, 
        height: 60,  
        borderColor: "#CED4DA80", 
        marginTop: 0, 
        padding: 0,
    },

    formInputSelect: {
        height: 50,
        borderWidth: 1,
        borderColor: "#CED4DA80",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#33303E",
        fontFamily: "SourceSansPro-Regular",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingTop: 14,
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

    modalTitleBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },

    modalTitle: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 20,
        color: "#33303E",
    },

    modalButton: {
        backgroundColor: "#E06E78",
        width: 200,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    modalButtonText: {
        color: "#fff",
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 16,
    },

    option: {
        borderWidth: 1, 
        borderColor: "rgba(0,0,0,0.1)", 
        borderRadius: 6, 
        padding: 10, 
        marginBottom: 20,
    },

    arrowTypeDocument: {
        position: "absolute",
        top: 46,
        right: 14,
    },
});

export default styles;