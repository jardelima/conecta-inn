import React, { useState, useContext } from "react";
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StatusBar,
    Modal,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from '@react-navigation/drawer';
import { User } from "../../contexts/User";

import styles from "./style";

export default function Header(props) {
    const { 
        notification,
        setNotification,
    } = useContext(User);

    const [modalNotification, setModalNotification] = useState(false);
    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus();

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#7D81D2" barStyle="light-content" />

                <View>
                    <Image 
                        source={require("../../assets/images/logo.png")}
                    />
                </View>

                <View style={styles.icons}>
                    <TouchableOpacity 
                        style={styles.notification}
                        onPress={() => {
                            setModalNotification(!modalNotification);
                        }}
                    >
                        <Image 
                            source={require("../../assets/icons/notification.png")}
                        />
                        {notification ? 
                            <View style={[styles.notificationAlert, styles.notificationAlertActive]} />
                        :
                            <View style={styles.notificationAlert} />
                        }
                        
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            if (drawerStatus === "closed") {
                                navigation.openDrawer();
                            } else {
                                navigation.dispatch(DrawerActions.closeDrawer());
                            }
                        }}
                    >                 
                        <Image 
                            source={props.src}
                        />
                    </TouchableOpacity>
                </View>
            </View>  

            {modalNotification && 
                <View>
                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => setModalNotification(!modalNotification)}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {height: 200, alignItems: "center", justifyContent: "center"}]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalNotification(false);
                                        setNotification(false);
                                    }} 
                                    style={{ position: "absolute", top: 20, right: 30}}
                                >
                                    <Text maxFontSizeMultiplier={1.2} style={{ fontSize: 18, color: "#7D81D2"}}>X</Text>
                                </TouchableOpacity>

                                {notification ?
                                    <Text style={styles.textNotification}>Você tem notificações ativas</Text>
                                :
                                    <Text style={styles.textNotification}>Você não tem notificações</Text>
                                }
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </>
    )
}   
