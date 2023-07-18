import React, {useState} from "react";
import {View, StatusBar, Animated, Dimensions} from "react-native";
import {Login} from "../../../Login";
import styles from "./style";

export default function Splash2({navigation}) {
  setTimeout(function () {
    navigation.navigate("Onboarding");
  }, 2200);

  const [leaveAnimation, setLeaveAnimation] = useState(new Animated.Value(-50));
  const [logoAnimation, setLogoAnimation] = useState(new Animated.Value(150));
  const [boxAnimation, setBoxAnimation] = useState(new Animated.Value(-20));

  Animated.parallel([
    Animated.timing(leaveAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }),
    Animated.timing(boxAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }),
    Animated.timing(logoAnimation, {
      toValue: 80,
      duration: 800,
      useNativeDriver: false,
    }),
  ]).start();

  return (
    <View style={styles.backgroundSplash2}>
      <StatusBar backgroundColor="#E06E78" barStyle="light-content" />
      <Animated.Image
        style={{
          top: logoAnimation,
        }}
        source={require("../../../assets/images/conecta-inn.png")}
      />
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 120,
          bottom: boxAnimation,
        }}
        backgroundColor="#F0CD86"
      />
      <Animated.Image
        style={{
          position: "absolute",
          left: leaveAnimation,
          bottom: 0,
        }}
        source={require("../../../assets/images/leaves.png")}
      />
    </View>
  );
}
