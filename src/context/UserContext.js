import React, { useContext } from "react";

export const UserContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: (isAuth) => {},
    userInfo: {},
    setUserInfo: (info) => {}
})