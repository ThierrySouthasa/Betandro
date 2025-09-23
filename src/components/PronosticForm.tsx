'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

type SportType = 'FOOTBALL' | 'TENNIS' | 'BASKET';
type BetResult = 'PENDING' | 'WON' | 'LOST';
type SubscriptionType = 'FREE' | 'BASIC' | 'PREMIUM';

const pronosticSchema = z.object({
    sport: z.enum(['FOOTBALL', 'TENNIS', 'BASKET']),
    teamA: z.string().min(1, 'Équipe A est requise'),
    teamB: z.string().min(1, 'Équipe B est requise'),
    odds: z.number().positive('La cote doit être positive'),
    prediction: z.string().min(1, 'Pronostic est requis'),
    result: z.enum(['PENDING', 'WON', 'LOST']),
    visibleTo: z.enum(['FREE', 'BASIC', 'PREMIUM']),
});

export default function PronosticForm() {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({
        sport: 'FOOTBALL' as SportType,
        teamA: '',
        teamB: '',
        odds: '',
        prediction: '',
        result: 'PENDING' as BetResult,
        visibleTo: 'FREE' as SubscriptionType,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedData = {
            ...form,
            odds: parseFloat(String(form.odds).replace(',', '.')),
        };

        const validation = pronosticSchema.safeParse(parsedData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setLoading(true);
        const toastId = toast.loading('Envoi en cours...');

        try {
            const response = await fetch('/api/pronostic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedData),
            });

            if (response.ok) {
                toast.success('✅ Pronostic ajouté avec succès !', { id: toastId });
                setForm({
                    sport: 'FOOTBALL',
                    teamA: '',
                    teamB: '',
                    odds: '',
                    prediction: '',
                    result: 'PENDING',
                    visibleTo: 'FREE',
                });
                queryClient.invalidateQueries({ queryKey: ['pronostics'] });
            } else {
                // Essaie de lire le corps de la réponse pour voir le message d'erreur
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { message: 'Impossible de parser la réponse erreur.' };
                }
                console.error('Erreur API:', errorData);
                toast.error('❌ Échec de l’enregistrement en base.', { id: toastId });
            }
        } catch (err) {
            console.error('Erreur réseau:', err);
            toast.error('❌ Erreur réseau lors de l’envoi.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-500">Ajouter un pronostic</h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    name="teamA"
                    placeholder="Équipe A"
                    className="border rounded px-3 py-2"
                    value={form.teamA}
                    onChange={handleChange}
                    required
                />
                <input
                    name="teamB"
                    placeholder="Équipe B"
                    className="border rounded px-3 py-2"
                    value={form.teamB}
                    onChange={handleChange}
                    required
                />
                <input
                        name="odds"
                        placeholder="Cote"
                        type="number"
                        step="0.01"
                        className="border rounded px-3 py-2 w-full"
                        value={form.odds}
                        onChange={handleChange}
                    />
                    {errors.odds && <p className="text-red-500 text-sm">{errors.odds}</p>}
                </div>

                <div>

                <div>
                    <select name="result" className="border rounded px-3 py-2 w-full" value={form.result} onChange={handleChange}>
                        <option value="PENDING">Pending</option>
                        <option value="WON">Won</option>
                        <option value="LOST">Lost</option>
                    </select>
                    {errors.result && <p className="text-red-500 text-sm">{errors.result}</p>}
                </div>

                <div>
                    <select name="visibleTo" className="border rounded px-3 py-2 w-full" value={form.visibleTo} onChange={handleChange}>
                        <option value="FREE">Free</option>
                        <option value="BASIC">Basic</option>
                        <option value="PREMIUM">Premium</option>
                    </select>
                    {errors.visibleTo && <p className="text-red-500 text-sm">{errors.visibleTo}</p>}
                </div>
            </div>

            <div>
                <input
                    name="prediction"
                    placeholder="Pronostic"
                    className="border rounded px-3 py-2 w-full"
                    value={form.prediction}
                onChange={handleChange}
                required
                />
                {errors.prediction && <p className="text-red-500 text-sm">{errors.prediction}</p>}
            </div>

            <button
                type="submit"
                className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
            >
                {loading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>}
                {loading ? 'Envoi en cours...' : 'Ajouter'}
            </button>
        </form>
    );
}
