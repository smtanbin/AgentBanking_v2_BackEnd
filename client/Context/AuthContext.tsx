
import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const AuthContext = createContext({})
const cookies = new Cookies
const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useReducer((oldState, newState) => newState, {
        token: undefined,
        user: null,
        validitations: false
    });

    const cookieUpdate = () => {
        let data = cookies.get('auth')
        if (data) {
            const decode_data: any = jwtDecode(data)
            const user = decode_data.user
            setAuth({
                token: data,
                user: user,
                validitations: true
            });
        } else {
            setAuth({
                token: undefined,
                user: null,
                validitations: false
            })
        }
    }

    const updateAuth = () => {
        cookieUpdate()
    }
    const authValid = () => {
        new Promise(async (resolve) => {
            await cookieUpdate()
            resolve(auth.validitations)
        })
    }



    return (
        <AuthContext.Provider value={{ auth, authValid, updateAuth }} >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;