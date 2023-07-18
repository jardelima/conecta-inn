import React, {useState, useEffect, useContext} from "react";
import { 
    View, 
    Text, 
    StatusBar, 
    TouchableOpacity,
    Pressable,
    Keyboard,  
    TextInput,
    Image,
    ScrollView
} from "react-native";

import styles from "./style";
import globalStyles from "../../components/globalStyle/style";
import url from "../../../url-config";
import { User } from "../../contexts/User/index";
import Loading from "../../components/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from "react-native-touch-id";
import { pusherInit } from '../../../pusher-notification';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [showPass, setShowPass] = useState(true);
    const [login, setLogin] = useState(false);
    const [supported, setSupported] = useState(false);
    const [saveUser, setSaveUser] = useState(false);

    const {
        setIdUser,
        setNameUser, 
        setSignIn,
        setTokenAuth
    } = useContext(User);

    async function doLogin(log, pass) {
        setLogin(true);

        try {
            let response = await fetch(`${url.urlBase}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email: log,
                    password: pass,
                }),
            });
    
            let userResponse = await response.json();
    
            let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    
            if(!response.ok) {
                setLogin(false)
                setErrorEmail("Email ou senha incorreto.");
                setErrorPassword("Email ou senha incorreto.");
            } else if (!regexEmail.test(log)) {
                setErrorEmail("Preencha um e-mail válido.");
                setLogin(false)
            } else {
                setLogin(false)
                setErrorEmail(null);
                setErrorPassword(null);
                pusherInit(userResponse.data.user.id.toString());
                setIdUser(userResponse.data.user.id);
                setNameUser(userResponse.data.user.name);
                setTokenAuth(userResponse.data.token);
                setSignIn(true);
                navigation.navigate("RoutesDrawer", { screen: "Dashboard" });
            }
        } catch (error) {
            console.log(error)
            setLogin(false)
        }
    }

    // Salvar dados para login automático
    async function saveLogin(emailAutomatic, passwordAutomatic) {
        if(saveUser) {
            try {
                await AsyncStorage.setItem("@login", emailAutomatic);
                await AsyncStorage.setItem("@password", passwordAutomatic);
            } catch (error) {
                console.log(error);
            }
        }
    }


    // Fazer login automático
    async function doLoginAutomatic() {
        try {
            let login = await AsyncStorage.getItem("@login");
            let rememberPassword = await AsyncStorage.getItem("@password");

            let configs = {
                title: "Autenticacao Touch ID",
                color: "#7D81D2",
                sensorErrorDescription: "Touch ID Inválido",
                fallbackLabel: "Show Passcode",
            }
            
            if(login && rememberPassword !== null) {
                // Verificar se o Touch ID está habilitado no celular ou é suportado
                // Também funciona com o Face ID
                TouchID.isSupported()
                .then(success => {
                    setSupported(true);
                })
                .catch(error => {
                    console.log(`ERRO TOUCH: ${error}`);
                    setEmail(login);
                    setPassword(rememberPassword);
                    alert("Touch ID não suportado ou habilitado.");
                })
                .then(success => {
                    TouchID.authenticate("Login Conecta In", configs)
                    .then(() => {
                        setEmail(login);
                        setPassword(rememberPassword);
                        doLogin(login, rememberPassword);
                    })
                    .catch((error) => {
                        console.log(`ERRO TOUCH ID: ${error}`);
                    })
                })
                .catch(error => {
                    console.log(`ERRO TOUCH: ${error}`);
                    alert("Touch ID não suportado ou habilitado.");
                })
            }
        } catch (error) {
            console.log(`LOGIN ERRO: ${error}`);
        }
    }

    useEffect(() => setErrorEmail(null), [email, password]);
    useEffect(() => setErrorPassword(null), [email, password]);
    useEffect(() => { doLoginAutomatic() }, []);

    return (
        <View>
            <StatusBar backgroundColor={login ? "rgba(0,0,0,0.1)" : "#fff"} barStyle="dark-content"/>

            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <Text allowFontScaling={false} style={styles.title}>Seja bem-vindo!</Text>

                    <View style={styles.inputField}>
                        <Text maxFontSizeMultiplier={1.5} style={styles.label}>E-mail</Text>

                        <TextInput 
                            onChangeText={setEmail}
                            value={email}
                            style={[
                                styles.input, 
                                {borderColor: isFocusedEmail ? "#E06E78" : "#CED4DA80"},
                            ]}
                            onFocus={() => setIsFocusedEmail(true)}
                            onBlur={() => setIsFocusedEmail(false)}
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        {errorEmail && <Text style={globalStyles.errorMessage}>{errorEmail}</Text>}
                    </View>

                    <View style={styles.inputField}>
                        <Text maxFontSizeMultiplier={1.5} style={styles.label}>Senha</Text>

                        <View style={[globalStyles.inputArea, {marginBottom: 0}]}>
                            <TextInput 
                                onChangeText={setPassword}
                                value={password}
                                style={[
                                    styles.input, 
                                    {borderColor: isFocusedPassword ? "#E06E78" : "#CED4DA80"},
                                ]}
                                onFocus={() => setIsFocusedPassword(true)}
                                onBlur={() => setIsFocusedPassword(false)}
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                autoCorrect={false}
                                autoCapitalize="none"
                                secureTextEntry={showPass}
                            />

                            <TouchableOpacity 
                                style={globalStyles.iconPassword}
                                onPress={() => setShowPass(!showPass)}
                            >
                                <Image 
                                    source={require("../../assets/icons/eye.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        {errorPassword && <Text style={globalStyles.errorMessage}>{errorPassword}</Text>}
                    </View>

                    <View style={styles.containerSavePassword}>
                        <View style={styles.containerBtnSavePassword}>
                            <TouchableOpacity
                                style={styles.btnSavePassword} 
                                onPress={() => setSaveUser(!saveUser)}
                            >
                                <View style={[
                                    styles.checkboxBtnSavePassword,
                                    { 
                                        borderColor: `${saveUser ? "#E06E78" : "rgba(0,0,0,0.2)"}`, 
                                        backgroundColor: `${saveUser ? "#E06E78" : "#fff"}`
                                    }
                                ]}>
                                    {saveUser && <Image source={require("../../assets/icons/check.png")} />}
                                </View>

                                <Text maxFontSizeMultiplier={1.2} style={styles.textBtnSavePassword}>Salvar usuário</Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity 
                            style={styles.forgotPassword} 
                            onPress={() => navigation.navigate("ForgotPasswordStageOne")}
                        >
                            <Text maxFontSizeMultiplier={1.2} style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={globalStyles.buttonPrimary} 
                        onPress={() => {
                            doLogin(email, password); 
                            saveLogin(email, password);
                        }}
                    >
                        <Text style={globalStyles.buttonPrimaryText}>Acessar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.register}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.registerMessage}>Ainda não tem uma conta?</Text>
                    
                    <TouchableOpacity 
                        style={styles.registerButton} 
                        onPress={() => navigation.navigate("RegisterStageOne")}
                    >
                        <Text maxFontSizeMultiplier={1.2} style={styles.registerButtonText}>Cadastre-se agora gratuitamente!</Text>
                    </TouchableOpacity>
                </View> 
            </ScrollView>

            {login && <Loading />}
        </View>
    )
}
