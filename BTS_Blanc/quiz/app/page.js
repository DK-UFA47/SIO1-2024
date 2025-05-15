"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/userInfo");
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        }
        fetchUser();
    }, []);

    const handleSignOff = () => {
        signOut({ callbackUrl: "/connexion" });
    };

    return (
        <section className="flex flex-col h-screen bg-white">
            <button
                onClick={handleSignOff}
                className="absolute top-4 right-8 bg-red-500 text-white px-4 py-2 rounded"
            >
                Se déconnecter
            </button>
            <div className="flex flex-1 justify-center items-center text-right text-4xl">
                {user ? (
                    <div>
                        <div>Nom : {user.Nom}</div>
                        <div>Prénom : {user.Prenom}</div>
                        <div>Email : {user.Email}</div>
                    </div>
                ) : (
                    <div>Chargement...</div>
                )}
            </div>
        </section>
    );
}