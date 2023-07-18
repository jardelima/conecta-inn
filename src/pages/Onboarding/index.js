import React from "react";
import {
    Text,
    StatusBar,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import styles from "./style";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
    {
        key: "one",
        image: require("../../assets/images/onboarding-1.png"),
        title: "Gerencie suas reservas",
        text: "Plataforma 100% digital focada no segmento de reservas on-line",
    },
    {
        key: "two",
        image: require("../../assets/images/onboarding-2.png"),
        title: "Facilidade no checkin e checkout",
        text: "Com apenas alguns passos você poderá realizar seu checkin e checkout",
    },
    {
        key: "three",
        image: require("../../assets/images/onboarding-3.png"),
        title: "Serviços e cardápio na palma da mão",
        text: "Facilidade para solicitar serviços e consumo do cardápio",
    },
    {
        key: "four",
        image: require("../../assets/images/onboarding-4.png"),
        title: "Controle sua estadia",
        text: "Total controle do seu extrato de todo seu consumo durante sua estadia",
    },
    {
        key: "five",
        image: require("../../assets/images/onboarding-5.png"),
        title: "Checkout rápido",
        text: "Para realizar chackout basta conferir extrato e realizar pagamento diretamente no aplicativo",
    },
];

export default function Onboarding({ navigation }) {
    function renderSlides({ item }) {
        return (
            <View>
                <Image
                    style={styles.slideImage}
                    source={item.image}
                />

                <View>
                    <Text maxFontSizeMultiplier={1.2} style={styles.title}>{item.title}</Text>
                    <Text maxFontSizeMultiplier={1.2} style={styles.description}>{item.text}</Text>
                </View>
            </View>
        )
    }

    function renderNextButton() {
        return (
            <View style={styles.buttonNext}>
                <Text maxFontSizeMultiplier={1.2} style={styles.buttonNextText}>Avançar</Text>
            </View>
        )
    }

    function renderDoneButton() {
        return (
            <View
                style={styles.buttonNext}
                onStartShouldSetResponder={() => navigation.navigate("Login")}
            >
                <Text maxFontSizeMultiplier={1.2} style={styles.buttonNextText}>Iniciar</Text>
            </View>
        )
    }

    function renderSkipButton() {
        return (
            <View
                style={styles.buttonSkip}
                onStartShouldSetResponder={() => navigation.navigate("Login")}
            >
                <Text maxFontSizeMultiplier={1.2} style={styles.buttonSkipText}>Pular introdução</Text>
            </View>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={"#7D81D2"} barStyle="light-content" />

            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.exitButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Image source={require("../../assets/icons/close-yellow.png")} />
                </TouchableOpacity>

                <View style={styles.slidesContainer}>
                    <AppIntroSlider
                        renderItem={renderSlides}
                        data={slides}
                        bottomButton={true}
                        showSkipButton={true}
                        renderNextButton={renderNextButton}
                        renderDoneButton={renderDoneButton}
                        renderSkipButton={renderSkipButton}
                        dotStyle={{
                            backgroundColor: "#F0CD8652",
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            marginTop: 0,
                        }}
                        activeDotStyle={{
                            backgroundColor: "#F0CD86",
                            width: 16,
                            height: 6,
                            borderRadius: 24,
                            marginTop: 0,
                        }}
                    />
                </View>
            </View>
        </>
    )
}
