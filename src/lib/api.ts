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


