export type Pronostic = {
    id: number;
    sport: 'FOOTBALL' | 'TENNIS' | 'BASKET';
    teamA: string;
    teamB: string;
    odds: number;
    prediction: string;
    result: 'PENDING' | 'WON' | 'LOST';
    visibleTo: 'FREE' | 'BASIC' | 'PREMIUM';
    createdAt: string;
    updatedAt: string;
};

export async function fetchPronostics(params?: { take?: number; skip?: number }): Promise<Pronostic[]> {
    const query = new URLSearchParams();
    if (params?.take != null) query.set('take', String(params.take));
    if (params?.skip != null) query.set('skip', String(params.skip));

    const res = await fetch(`/api/pronostic${query.toString() ? `?${query.toString()}` : ''}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    });
    if (!res.ok) {
        const details = await res.text().catch(() => '');
        throw new Error(`Failed to fetch pronostics (${res.status}): ${details}`);
    }
    return res.json();
}

export async function updatePronosticResult(id: number, result: 'WON' | 'LOST'): Promise<Pronostic> {
    const res = await fetch('/api/pronostic', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, result }),
    });
    if (!res.ok) {
        const details = await res.text().catch(() => '');
        throw new Error(`Failed to update pronostic (${res.status}): ${details}`);
    }
    return res.json();
}


