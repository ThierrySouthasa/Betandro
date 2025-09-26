"use client";

import PronosticTable from '@/components/PronosticTable';
import PronosticForm from '@/components/PronosticForm';
import { usePronostics } from '@/hooks/usePronostics';

export default function AdminPage() {
    const { isLoading, error } = usePronostics({ take: 100 });

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-10">
            <h1 className="text-3xl font-bold text-red-500">Espace Admin</h1>

            <PronosticForm />

            {isLoading && <div className="text-sm text-gray-500">Chargement…</div>}
            {error && <div className="text-sm text-red-600">Erreur: {error.message}</div>}
            {!isLoading && !error && <PronosticTable filter="PENDING" />}

            <PronosticTable filter="NON_PENDING" />
        </div>
    );
}