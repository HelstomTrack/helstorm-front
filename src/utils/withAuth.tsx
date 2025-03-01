"use client";
import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const router = useRouter();
        const token = Cookies.get("token"); // ✅ Vérification du token avant affichage

        useEffect(() => {
            if (!token) {
                router.replace("/login"); // ✅ Redirection immédiate sans délai
            }
        }, [router, token]);

        // ✅ Si le token est absent, éviter de rendre le composant
        if (!token) return null;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
