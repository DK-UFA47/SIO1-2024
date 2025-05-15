'use client';
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

export default function Inscription() {
    const [form, setForm] = useState({
        Role: "stagiaire",
        Nom: "",
        Prenom: "",
        Email: "",
        Password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Compte créé avec succès !");
                setForm({
                    Role: "stagiaire",
                    Nom: "",
                    Prenom: "",
                    Email: "",
                    Password: ""
                });
                redirect("/connexion");
            } else {
                setMessage(data.error || "Erreur lors de la création du compte.");
            }
        } catch (err) {
            setMessage("Erreur serveur.");
        }
    };

    return (
        <div className="bg-white bg-cover p-8 max-w-md mx-auto mt-10 rounded shadow">
            <h1 className="text-4xl mb-6">Inscription :</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="Nom"
                    placeholder="Nom"
                    value={form.Nom}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="Prenom"
                    placeholder="Prénom"
                    value={form.Prenom}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={form.Email}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="Password"
                    placeholder="Mot de passe"
                    value={form.Password}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                
                <select
                    name="Role"
                    value={form.Role}
                    onChange={handleChange}
                    className="border p-2 rounded w-1/3"
                >
                    <option value="stagiaire">Stagiaire</option>
                    <option value="formateur">Formateur</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Créer un compte
                </button>
            </form>
            {message && <div className="mt-4 text-red-500">{message}</div>}
        </div>
    );
}