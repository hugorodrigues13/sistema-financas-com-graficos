import React, { ReactNode, useContext } from "react";
import { AppProps } from "next/app"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from "styled-components";
import dark from "../../styles/theme/dark";
import light from "../../styles/theme/light";
import { Layout } from "@/components/Layout";
import { AuthProvider, AuthContext } from '@/contexts/AuthContext'
import { GlobalStyle } from '../../styles/GlobalStyles'; // Importe o estilo global aqui

function MyApp({ Component, pageProps}: AppProps){
    const {theme} = useContext(AuthContext);

    return (
        <>
            <AuthProvider>
                <ThemeProvider theme={dark}>
                        <Layout>
                            <Component {...pageProps}/>
                        </Layout>
                    <ToastContainer autoClose={2000} />
                </ThemeProvider>
            </AuthProvider>
            <GlobalStyle />
        </>
    )
    
}

export default MyApp