import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

import { DefaultTheme } from 'styled-components';
import dark from '../../styles/theme/dark';
import light from '../../styles/theme/light';

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type ITheme = {
    title: string;

    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        menu: string;

        success: string;
        info: string;
        warning: string;
    }
}

interface AuthContextData {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    theme: DefaultTheme;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
    toggleTheme(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log("Error ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const [theme, setTheme] = useState<ITheme>(dark); // Inicialize com o tema escuro por padrão

    const isAuthenticated = !!user;

    useEffect(() => {
        
        // tentar pegar algo do token
        const {'@nextauth.token': token} = parseCookies()

        if(token){
            api.get('/user/detail').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                //se deu error deslogamos o user
                signOut();
            })
        }
    }, [])

    const toggleTheme = () => {
        setTheme(theme === dark ? light : dark);
      };

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            console.log(response.data)

            const {id, name, token} = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
                path: "/" // Quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email
            })

            //Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com sucesso!")

            //Redirecionar o user para /dashboard
            Router.push('/dashboard')

        }catch(err){
                toast.error("Erro ao acessar!")
                console.log("Error ao acessar", err)
        }
        
    }

    async function signUp({name, email, password}: SignUpProps){
        try{

            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Cadastrado com sucesso!")

            Router.push('/')

        }catch(err){
            toast.error("Erro ao cadastrar!")
            console.log("Erro ao cadastrar", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, theme, toggleTheme, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    )
}


