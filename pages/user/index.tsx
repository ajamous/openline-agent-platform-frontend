import type {NextPage} from 'next'
import {DataTable} from 'primereact/datatable';
import {useEffect, useState} from "react";
import {Column} from "primereact/column";
import axios from "axios";
import {Button} from "primereact/button";
import {useRouter} from "next/router";
import {Toolbar} from 'primereact/toolbar';
import {Fragment} from "preact";


const UserList: NextPage = () => {
    const router = useRouter();
    const [data, setData] = useState([] as any);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/user`)
            .then(res => {
                setData(res.data.content);
            })
    }, []);

    const leftContents = (
        <Fragment>
            <Button icon="pi pi-plus" className="p-button-info" onClick={() => router.push(`/user/new`)}/>
        </Fragment>
    );

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const onSelectionChange = (event: any) => {
        const value = event.value;
        setSelectedRecords(value);
        setSelectAll(value.length === data.length);
    }

    const onSelectAllChange = (event: any) => {
        const selectAll = event.checked;

        if (selectAll) {
            setSelectAll(true);
            setSelectedRecords(data);
        } else {
            setSelectAll(false);
            setSelectedRecords([]);
        }
    }

    return (
        <>
            <Toolbar left={leftContents}/>
            <DataTable value={data} selection={selectedRecords} onSelectionChange={onSelectionChange}
                       selectAll={selectAll} onSelectAllChange={onSelectAllChange}>
                <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                <Column field="firstName" header="First name"></Column>
                <Column field="lastName" header="Last name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
            </DataTable>
        </>
    );
}

export default UserList
