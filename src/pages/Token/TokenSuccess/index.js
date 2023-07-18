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

export default function TokenSuccess({ navigation }) {
    return (
        <View>
            <StatusBar backgroundColor="#7D81D2" barStyle="light-content" />

            <View style={[globalStyles.container, styles.container]}>
                <TouchableOpacity 
                    style={styles.exit}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Image 
                        style={styles.exitImage}
                        source={require("../../../assets/icons/exit.png")}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <View>
                        <Text maxFontSizeMultiplier={1.2} style={styles.title}>Token ativado com sucesso!</Text> 
                    </View>
                    
                    <Text maxFontSizeMultiplier={1.2} style={styles.subtitle}>
                        Agora você pode verificar as reservas respectivas ao token ativado.
                    </Text>
                </View>

                <TouchableOpacity
                    style={globalStyles.buttonSecondary} 
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text maxFontSizeMultiplier={1.5} style={globalStyles.buttonSecondaryText}>Minhas Reservas</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
