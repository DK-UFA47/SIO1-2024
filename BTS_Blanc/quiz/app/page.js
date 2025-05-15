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
        <section className="relative flex flex-col h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <button
                onClick={handleSignOff}
                className="absolute top-6 right-10 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow-lg font-semibold"
            >
                Se déconnecter
            </button>
            <div className="flex flex-1 justify-center items-center">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl px-16 py-12 flex flex-col items-center gap-6 border border-blue-200">
                    <h1 className="text-5xl font-bold text-blue-700 mb-6">Mon Profil</h1>
                    {user ? (
                        <div className="space-y-4 text-2xl text-blue-900">
                            <div>
                                <span className="font-semibold">Nom :</span> {user.Nom}
                            </div>
                            <div>
                                <span className="font-semibold">Prénom :</span> {user.Prenom}
                            </div>
                            <div>
                                <span className="font-semibold">Email :</span> {user.Email}
                            </div>
                        </div>
                    ) : (
                        <div className="text-blue-700 text-2xl">Chargement...</div>
                    )}
                </div>
            </div>
        </section>
    );
}