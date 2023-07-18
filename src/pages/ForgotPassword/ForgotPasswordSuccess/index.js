import React from "react";
import { 
    View, 
    Text, 
    StatusBar,
    TouchableOpacity, 
    Image,
} from "react-native";

import globalStyles from "../../../components/globalStyle/style";
import styles from "./style";

export default function ForgotPasswordSuccess({ navigation }) {
    return (
        <View>
            <StatusBar backgroundColor="#7D81D2" barStyle="light-content" />

            <View style={[globalStyles.container, styles.container]}>
                <TouchableOpacity 
                    style={styles.exit}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Image 
                        style={styles.exitImage}
                        source={require("../../../assets/icons/exit.png")}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <View>
                        <Text maxFontSizeMultiplier={1.2} style={styles.title}>Você recebera um link no seu e-mail</Text> 
                        <Text maxFontSizeMultiplier={1.2} style={styles.title}>para trocar a senha</Text>
                    </View>
                    
                    <Text maxFontSizeMultiplier={1.2} style={styles.subtitle}>
                        Acesse o link enviado para seu e-mail para trocar a senha.
                    </Text>
                </View>

                <TouchableOpacity
                    style={globalStyles.buttonSecondary} 
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonSecondaryText}>Voltar para login</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
