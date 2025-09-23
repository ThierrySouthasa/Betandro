"use client";

import PronosticTable from "@/components/PronosticTable";
import PronosticCard from "@/components/PronosticCard";
import { usePronostics } from "@/hooks/usePronostics";

export default function PlayerPage() {
    const { data, isLoading, error } = usePronostics({ take: 100 });
    const pending = (data ?? []).filter(p => p.result === 'PENDING');
    const topTwo = pending.slice(0, 2);

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-10">
            <h1 className="text-3xl font-bold text-red-500">Espace Joueur</h1>
            <h3 className="text-xl font-bold text-red-500">Prono du jour</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && <div className="text-sm text-gray-500">Chargement…</div>}
                {error && <div className="text-sm text-red-600">Erreur: {error.message}</div>}
                {!isLoading && !error && topTwo.map(p => (
                    <PronosticCard
                        key={p.id}
                        equipe1={p.teamA}
                        equipe2={p.teamB}
                        score=""
                        cote={p.odds}
                        pronostic={p.prediction}
                    />
                ))}
            </div>

            <h3 className="text-xl font-bold text-red-500">Derniers pronos</h3>
            <PronosticTable filter="NON_PENDING" />
        </div>
    );
}
