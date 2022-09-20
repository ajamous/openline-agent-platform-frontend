import {useRouter} from "next/router";
import {Menu} from "primereact/menu";


const LayoutMenu = () => {
    const router = useRouter();

    let items = [
        // {
        //     label: 'Users', icon: 'pi pi-mobile', command: () => {
        //         router.push('/user');
        //     }
        // },
        {
            label: 'Cases', icon: 'pi pi-mobile', command: () => {
                router.push('/case');
            }
        },
        {
            label: 'Contacts', icon: 'pi pi-mobile', command: () => {
                router.push('/contact');
            }
        }
    ];

    return (
        <Menu model={items}/>
    );
}

export default LayoutMenu
