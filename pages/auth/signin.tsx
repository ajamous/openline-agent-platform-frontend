import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Signin() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        // if (status === "unauthenticated") {
        //     void signIn("fusionauth");
        // } else if (status === "authenticated") {
            void router.push("/");
        // }
    }, [status, router]);

    return <div></div>;
}