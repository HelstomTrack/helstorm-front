import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// ✅ Définition d'un type pour le composant enfant
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = Cookies.get("token");

            if (!token) {
                router.push("/login"); // ✅ Redirection si pas de token
            } else {
                setLoading(false);
            }
        }, [router]); // ✅ Ajout du router dans les dépendances pour éviter les re-renders inutiles

        if (loading) return <p>Chargement...</p>;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
