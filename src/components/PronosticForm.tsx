'use client';

import { useState } from 'react';

export default function PronosticForm() {
    const [form, setForm] = useState({
        equipe1: '',
        equipe2: '',
        score: '',
        cote: '',
        pronostic: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Envoyé :', form);
        // ici, tu pourrais envoyer vers une API
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-500">Ajouter un pronostic</h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    name="equipe1"
                    placeholder="Équipe 1"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    required
                />
                <input
                    name="equipe2"
                    placeholder="Équipe 2"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    required
                />
                <input
                    name="score"
                    placeholder="Score (ex: 2-1)"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    required
                />
                <input
                    name="cote"
                    placeholder="Cote"
                    type="number"
                    step="0.01"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    required
                />
            </div>

            <input
                name="pronostic"
                placeholder="Pronostic"
                className="border rounded px-3 py-2 w-full"
                onChange={handleChange}
                required
            />

            <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Ajouter
            </button>
        </form>
    );
}
