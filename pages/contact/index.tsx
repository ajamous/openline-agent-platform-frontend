import type {NextPage} from 'next'
import {DataTable} from 'primereact/datatable';
import {useEffect, useState} from "react";
import {Column} from "primereact/column";
import axios from "axios";
import {Button} from "primereact/button";
import {useRouter} from "next/router";


const Index: NextPage = () => {
    const router = useRouter();
    const [flows, setFlows] = useState([] as any);

    useEffect(() => {

        axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/api/flow`, {
            headers: {
            }
        })
            .then(res => {
                setFlows(res.data.content);
            })

    }, []);

    const actionsColumn = (rowData: any) => {
        return <Button icon="pi pi-eye" className="p-button-info"
                       onClick={() => router.push(`/editor/${rowData.id}`)}/>;
    }

    return (
        <DataTable value={flows}>
            <Column field="name" header="Name"></Column>
            <Column field="state" header="State"></Column>
            <Column field="actions" header="Actions" align={'right'} body={actionsColumn}></Column>
        </DataTable>
    );
}

export default Index
