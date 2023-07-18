import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerItems: {
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    
    containerScroll: {
        flex: 1,
    }, 

    typeMenuContainer: {
        marginLeft: 10,
        paddingBottom: 15,
        backgroundColor: "#fff",
    },

    typeMenuItem: {
        backgroundColor: "#F5F6F8",
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: "relative",
        zIndex: 2,
        marginHorizontal: 8,
        borderRadius: 100,
    },

    typeMenuText: {
        fontFamily: "SourceSansPro-SemiBold",
        fontSize: 14,
        color: "#979797",
    },

    typeMenuItemActive: {
        backgroundColor: "#E06E78",
    },

    typeMenuTextActive: {
        color: "#ffffff"
    },
});

export default styles;