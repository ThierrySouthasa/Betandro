"use client";

import { usePronostics } from "@/hooks/usePronostics";

type FilterMode = 'ALL' | 'PENDING' | 'NON_PENDING'

export default function PronosticTable({ filter = 'ALL' }: { filter?: FilterMode }) {
    const { data, isLoading, error } = usePronostics({ take: 100 });

    if (isLoading) {
        return <p className="mt-6 text-sm text-gray-500">Chargement des pronostics…</p>;
    }
    if (error) {
        return <p className="mt-6 text-sm text-red-600">Erreur: {error.message}</p>;
    }
    if (!data || data.length === 0) {
        return <p className="mt-6 text-sm text-gray-500">Aucun pronostic pour le moment.</p>;
    }

    const rows =
        filter === 'PENDING'
            ? data.filter(p => p.result === 'PENDING')
            : filter === 'NON_PENDING'
                ? data.filter(p => p.result !== 'PENDING')
                : data;

    return (
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 mt-8">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3">Équipe A</th>
                <th className="px-4 py-3">Équipe B</th>
                <th className="px-4 py-3">Cote</th>
                <th className="px-4 py-3">Pronostic</th>
                <th className="px-4 py-3">Résultat</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((p) => (
                <tr key={p.id} className="bg-white border-t">
                    <td className="px-4 py-3">{p.sport}</td>
                    <td className="px-4 py-3">{p.teamA}</td>
                    <td className="px-4 py-3">{p.teamB}</td>
                    <td className="px-4 py-3">{p.odds}</td>
                    <td className="px-4 py-3 text-red-500">{p.prediction}</td>
                    <td className="px-4 py-3">{p.result}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
