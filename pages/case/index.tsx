import type {NextPage} from 'next'
import {DataTable} from 'primereact/datatable';
import {useEffect, useState} from "react";
import {Column} from "primereact/column";
import axios from "axios";
import {Button} from "primereact/button";
import {useRouter} from "next/router";
import {Toolbar} from "primereact/toolbar";
import {Fragment} from "preact";
import Layout from "../../components/layout/layout";


const Index: NextPage = () => {
    const router = useRouter();
    const SockJsClient = require('react-stomp');

    const [cases, setCases] = useState([] as any);
    const [initializeWebsocket, setInitializeWebsocket] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/case`)
            .then(res => {
                setCases(res.data.content);
                setInitializeWebsocket(true);
            })
    }, []);

    const actionsColumn = (rowData: any) => {
        return <Button icon="pi pi-eye" className="p-button-info"
                       onClick={() => router.push(`/case/${rowData.id}`)}/>;
    }

    const leftContents = (
        <Fragment>
        </Fragment>
    );

    const handleWebsocketMessage = function (msg: any) {
        console.log("Got a new case!");
        axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/case`)
            .then(res => {
                setCases(res.data.content);
            });
    }

    return (
        <>
            <Layout>
                {
                    initializeWebsocket &&
                    <SockJsClient
                        url={`${process.env.NEXT_PUBLIC_WEBSOCKET_PATH}/websocket`}
                        topics={[`/queue/cases`]}
                        onConnect={console.log("Connected!")}
                        onDisconnect={console.log("Disconnected!")}
                        onMessage={(msg: any) => handleWebsocketMessage(msg)}
                        debug={true}
                    />
                }

                <Toolbar left={leftContents}/>
                <DataTable value={cases}>
                    <Column field="userName" header="Name"></Column>
                    <Column field="state" header="State"></Column>
                    <Column field="actions" header="Actions" align={'right'} body={actionsColumn}></Column>
                </DataTable>
            </Layout>
        </>
    );
}

export default Index
