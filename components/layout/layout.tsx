import Header from "./header";
import LayoutMenu from "./menu";
import {useRouter} from "next/router";

export default function Layout({ children }: any) {
    const router = useRouter();

    return (
        <>
            <Header/>

            <div className="flex" style={{height: 'calc(100vh - 100px)'}}>

                {
                    router.pathname.indexOf("/editor") === -1 &&
                    <div className="flex-grow-0 flex"
                         style={{width: '200px', height: '100%'}}>

                        <div style={{width: '100%', height: '100%', padding: '10px 0px 10px 10px', overflow: 'hidden'}}>

                            <LayoutMenu/>

                        </div>

                    </div>
                }

                <div className="flex-grow-1 flex" style={{height: '100%'}}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        margin: '10px',
                        border: '1px solid #0b213f',
                        borderRadius: '6px'
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}