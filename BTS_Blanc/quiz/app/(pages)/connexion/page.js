'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ConnexionPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (res.ok) {
            router.push('/');
        } else {
            setError('Identifiants invalides');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md w-80">
                <h1 className="text-2xl mb-6 text-center">Connexion</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 mb-6 border rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Se connecter
                </button>
            </form>
        </div>
    );
}