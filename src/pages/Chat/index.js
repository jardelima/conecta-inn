import React, { useState, useEffect, useRef, useContext} from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import styles from "./style";
import url from "../../../url-config";
import { User } from "../../contexts/User";
import Loading from "../../components/Loading";


export default function Chat({ navigation, route }) {
    const { 
        chatInPayment,
        chatInExtract,
        chatInCheckin,
        chatInCheckout,
        chatInProduct,
        localName, 
        localAddress, 
        listProducts,

        //parametros para retornar a interna do produto
        typeProduct,
        slideImages,
        idProduct,
        checkOut,
        imgProduct,
        page,
        qtdProduct,
        nameProduct,
        widthProduct, 
        valueProduct,
        deliveryProduct,
        descriptionProduct,
    } = route.params;

    const { 
        tokenAuth, 
        idUser, 
        idReservation, 
        idHotel,
    } = useContext(User);

    const [listMessages, setListMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isFocusedMessage, setIsFocusedMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [idConversation, setIdConversation] = useState(null);
    const isFocused = useIsFocused();

    const scrollViewRef = useRef();

    async function updateMessages() {
        setLoading(true);

        try {
            let response = await fetch(`${url.urlBase}/reservation/${idReservation}/start-chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
                body: JSON.stringify({
                    hotel: idHotel,
                    service: idProduct,
                }),
            });
    
            let responseChat = await response.json();

    
            if(response.ok && responseChat.data.conversation[0] == undefined) {
                setListMessages([]);
                setIdConversation(responseChat.data.conversation.id);

                responseChat.data.conversation.messages.forEach(messageItem => {
                    setListMessages(listMessages => [...listMessages, {
                        from: messageItem.to,
                        to: messageItem.from,
                        createdAt: messageItem.created_at.split("T")[0],
                        message: messageItem.message,
                    }]);
                });

    
                setLoading(false);
            } else if(response.ok && responseChat.data.conversation[0]) {
                setListMessages([]);
                setIdConversation(responseChat.data.conversation[0].id);
    
                responseChat.data.conversation[0].messages.forEach(messageItem => {
                    setListMessages(listMessages => [...listMessages, {
                        from: messageItem.to,
                        to: messageItem.from,
                        createdAt: messageItem.created_at.split("T")[0],
                        message: messageItem.message,
                    }]);
                });

                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            //ignore
            console.log(error)
        }
    }

    async function sendMessage() {
        setLoading(true);

        try {
            let response = await fetch(`${url.urlBase}/reservation/chat/send-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + tokenAuth,
                },
                body: JSON.stringify({
                    from: idUser,
                    to: idHotel,
                    message: message,
                    conversation_id: idConversation,
                }),
            });
    
            let responseChat = await response.json();
    
            if(response.ok) {
                updateMessages();
                setLoading(false);
            } else {
                setLoading(false);
                console.log(responseChat);
            }
        } catch (error) {
            setLoading(false);
            //ignore
            console.log("Error Catch" + error);
        }
    }

    useEffect(() => {
        const getMessages = navigation.addListener("focus", async () => {
            updateMessages();
        });

        return getMessages;
    }, [navigation, isFocused]);
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#7D81D2" barStyle="light-content" />

                <View style={styles.containerHeader}>
                    <TouchableOpacity
                        style={styles.buttonHeader}
                        onPress={() => {
                            if(chatInExtract) {
                                navigation.navigate("Extract", {
                                    localName, 
                                    localAddress,
                                    listProducts,
                                })
                            } else if(chatInPayment) {
                                navigation.navigate("Payment", {
                                    localName, 
                                    localAddress,
                                    listProducts,
                                })
                            } else if(chatInCheckout) {
                                navigation.navigate("CheckOut", {
                                    localName, 
                                    localAddress,
                                    listProducts,
                                })
                            } else if(chatInProduct) {
                                navigation.navigate("InternalProduct", {
                                    typeProduct,
                                    slideImages,
                                    idProduct,
                                    checkOut,
                                    listProducts,
                                    imgProduct,
                                    page,
                                    qtdProduct,
                                    nameProduct,
                                    widthProduct, 
                                    valueProduct,
                                    localName, 
                                    localAddress, 
                                    deliveryProduct,
                                    descriptionProduct,
                                })
                            } else if(chatInCheckin) {
                                navigation.navigate("CheckIn", {
                                    localName, 
                                    localAddress,
                                    listProducts,
                                })
                            } else {
                                navigation.navigate("InternalHotel", {
                                    localName, 
                                    localAddress,
                                    listProducts,
                                })
                            }
                        }}
                    >
                        <Text maxFontSizeMultiplier={1.5} style={styles.buttonTextHeader}>x</Text>
                    </TouchableOpacity>

                    <Text allowFontScaling={false} style={styles.titleHeader}>Chat com { localName }</Text>
                </View>  

                <ScrollView 
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                    style={styles.containerMessages}
                >
                    <Text maxFontSizeMultiplier={1.2} style={styles.titleMessage}>{ localName } entrou no Chat</Text>

                    <View style={styles.blockMessage}>
                        {listMessages.map((itemMessage, index) => {
                            return (
                                <View 
                                    key={index}
                                    style={itemMessage.to == idHotel ? styles.messageFromSupport : styles.messageFromClient}
                                >
                                    <Text 
                                        maxFontSizeMultiplier={1.2}
                                        style={itemMessage.to == idHotel ? styles.textFromSupport : styles.textFromClient}
                                    >
                                        {itemMessage.message}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                <KeyboardAvoidingView 
                    style={styles.containerInputMessage}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
                >
                    <TextInput 
                        style={[
                            styles.formInput, 
                            {borderColor: isFocusedMessage ? "#E06E78" : "#CED4DA80"},
                        ]}
                        onChangeText={setMessage}
                        value={message}
                        autoCorrect={false}
                        onFocus={() => setIsFocusedMessage(true)}
                        onBlur={() => setIsFocusedMessage(false)}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        placeholder="Digite sua mensagem..."
                    />
                    
                    <TouchableOpacity
                        style={styles.formSubmit}
                        onPress={() => {
                            sendMessage();
                            setMessage("");
                        }}
                    >
                        <Image 
                            source={require("../../assets/icons/send-message.png")}
                        />
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            {loading && <Loading />}
        </View>
    )
}
