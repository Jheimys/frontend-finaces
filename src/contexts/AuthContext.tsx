// @react/client
// @ts-nocheck
"use client"
import { createContext, ReactNode, useState, useEffect } from 'react'

import { api } from '../services/apiClient'

import {destroyCookie, setCookie, parseCookies } from 'nookies'

//import Router from 'next/router'

import { useRouter } from 'next/router'

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: signInProps) => Promise<void>
    signOut: () => void;
}

type UserProps  = {
    id: string;
    name: string;
    email: string;
}

type signInProps = {
    email: string;
    password: string;
}

type AuthProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try {
        destroyCookie(undefined, '@nextauth.token')
        const router = useRouter();
        
        if (typeof window !== 'undefined') {
            router.push('/');
        }

    } catch (error) {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()

    const isAuthenticated = !!user 

    //const router = useRouter();

    async function signIn({email, password}: signInProps ){   
        try {
             
            const router = useRouter();
            const response = await api.post('/session', {
            email,
            password
        })

        //console.log('dados de response', response.data)

        const { id, name, token } = response.data

        setCookie(undefined, '@nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30, 
            path: "/"
        })

        setUser({
            id,
            name,
            email
        })

        //Passar para as proximas requisições o token
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        //Redirecionar o user
        if (typeof window !== 'undefined') {
            router.push('/dashboard');
        }
       

       } catch (error) {
            console.log("erro ao acessar", error)
       }
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

