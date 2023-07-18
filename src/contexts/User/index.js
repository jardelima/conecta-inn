import React, {createContext, useState} from "react";

export const User = createContext();

export default function UserProvider({children}) {
    const [idUser, setIdUser] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [tokenAuth, setTokenAuth] = useState(null);
    const [tokenHotel, setTokenHotel] = useState([]);
    const [idReservation, setIdReservation] = useState("");
    const [idHotel, setIdHotel] = useState("");
    const [dateCheckIn, setDateCheckIn] = useState("");
    const [dateCheckOut, setDateCheckOut] = useState("");
    const [statusReservation, setStatusReservation] = useState(null);
    const [updateReservations, setUpdateReservations] = useState("");
    const [notification, setNotification] = useState(true);
    const [termsCheckIn, setTermsCheckIn] = useState(false);

    return (
        <User.Provider 
            value={{
                idUser,
                setIdUser,
                nameUser, 
                setNameUser, 
                signIn, 
                setSignIn, 
                tokenAuth, 
                setTokenAuth, 
                tokenHotel, 
                setTokenHotel,
                idReservation,
                setIdReservation,
                idHotel,
                setIdHotel,
                dateCheckIn,
                setDateCheckIn,
                dateCheckOut,
                setDateCheckOut,
                statusReservation,
                setStatusReservation,
                updateReservations,
                setUpdateReservations,
                notification, 
                setNotification,
                termsCheckIn,
                setTermsCheckIn,
            }}
        >
            {children}
        </User.Provider>
    )
}