import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import '../styles/globals.css'
import "../styles/flow.css";

import { SessionProvider } from "next-auth/react"
import Layout from "../components/layout/layout";

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }: any) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}