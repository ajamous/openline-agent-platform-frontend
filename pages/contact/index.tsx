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

    // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBUFA6Om9yY2hlc3RyYXRpb24tYnVpbGRlci1hcGkiLCJhdXRoIjoiUk9MRV9BUFBMSUNBVElPTiIsImV4cCI6MTk3MzU3NzIwN30.krsrF3TVMAwNjnDGwIL3hqNIrAR3636u4Tkh7gpk2yQhbb2CxAwS2t6HN8vGb90rF8UGNBzj9hBAkuLvXuf-UA

    useEffect(() => {

        axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/api/flow`, {
            headers: {
                // 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBUFA6Om9yY2hlc3RyYXRpb24tYnVpbGRlci1hcGkiLCJhdXRoIjoiUk9MRV9BUFBMSUNBVElPTiIsImV4cCI6MTk3MzU3NzIwN30.krsrF3TVMAwNjnDGwIL3hqNIrAR3636u4Tkh7gpk2yQhbb2CxAwS2t6HN8vGb90rF8UGNBzj9hBAkuLvXuf-UA`
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
