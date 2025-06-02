'use client';

import React, { useState } from 'react';
import PronosticCard from "@/components/PronosticCard";

export default function HomePage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Message envoyé :', form);
    };

    return (
        <div className="space-y-20 px-4 py-12 max-w-screen-xl mx-auto">
            <section className="text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Le Meilleur Pronostiqueur</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Fort d une expérience de plusieurs années dans le monde du pari sportif, j'analyse chaque match avec
                    précision. Mon objectif : vous faire gagner !
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-red-500 text-center mb-6">Offres et Abonnements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Formule Débutant</h3>
                        <p className="text-gray-500 mb-4">3 pronostics / semaine</p>
                        <p className="text-2xl font-bold text-red-500">9,99 €</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Formule Pro</h3>
                        <p className="text-gray-500 mb-4">1 pronostic / jour</p>
                        <p className="text-2xl font-bold text-red-500">19,99 €</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">VIP 30J</h3>
                        <p className="text-gray-500 mb-4">Accès à tous les paris + conseils</p>
                        <p className="text-2xl font-bold text-red-500">39,99 €</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-red-500 text-center mb-6">Exemples de Paris Récents</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            equipe1: 'Real Madrid',
                            equipe2: 'Barcelone',
                            score: '2-1',
                            cote: 2.2,
                            pronostic: 'Real Madrid'
                        },
                        {equipe1: 'PSG', equipe2: 'OM', score: '3-0', cote: 1.8, pronostic: 'PSG'},
                        {
                            equipe1: 'Manchester City',
                            equipe2: 'Arsenal',
                            score: '2-2',
                            cote: 3.1,
                            pronostic: 'Match nul'
                        },
                    ].map((p, i) => (
                        <PronosticCard key={i} {...p} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-red-500 text-center mb-6">Me Contacter</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-xl mx-auto space-y-4"
                >
                    <input
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        required
                        className="w-full border px-4 py-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        required
                        className="w-full border px-4 py-2 rounded"
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="Votre message"
                        rows={4}
                        required
                        className="w-full border px-4 py-2 rounded"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                        Envoyer
                    </button>
                </form>
            </section>
        </div>
    );
}
