import React from "react";
import {View, StatusBar, Image} from "react-native";
import {Splash2} from "../Splash2";
import styles from "./style";

export default function Splash({navigation}) {
  setTimeout(function () {
    navigation.navigate("Splash2");
  }, 2200);

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="#E06E78" barStyle="light-content" />
      <Image
        style={styles.itemImage}
        source={require("../../../assets/images/logo-splash.png")}
      />
    </View>
  );
}
