import {useRouter} from "next/router";

function CaseDetails() {
    const router = useRouter();
    const {id} = router.query;

    return (
        <div style={{width: '100%', height: '100%'}}>
            contact details
        </div>
    );
}

export default CaseDetails