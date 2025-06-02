'use client';

import React, { useState } from 'react';

export default function AuthPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistering && form.password !== form.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        if (isRegistering) {
            console.log("Inscription :", form);
        } else {
            console.log("Connexion :", form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
                {isRegistering ? "Créer un compte" : "Se connecter"}
            </h1>

            <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded"
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
                className="w-full px-4 py-2 border rounded"
                onChange={handleChange}
            />
            {isRegistering && (
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    required
                    className="w-full px-4 py-2 border rounded"
                    onChange={handleChange}
                />
            )}

            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
                {isRegistering ? "S'inscrire" : "Se connecter"}
            </button>

            <div className="text-center mt-4 text-sm text-gray-600">
                {isRegistering ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
                <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-red-500 hover:underline"
                >
                    {isRegistering ? "Se connecter" : "S'inscrire"}
                </button>
            </div>
        </form>
    );
}
