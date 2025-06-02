export default function PronosticTable() {
    const pronostics = [
        { id: 1, equipe1: 'France', equipe2: 'Allemagne', score: '2-1', cote: 2.4, pronostic: 'France' },
        { id: 2, equipe1: 'Brésil', equipe2: 'Argentine', score: '1-3', cote: 1.9, pronostic: 'Argentine' },
    ];

    return (
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 mt-8">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
                <th className="px-4 py-3">Équipe 1</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Équipe 2</th>
                <th className="px-4 py-3">Cote</th>
                <th className="px-4 py-3">Pronostic</th>
            </tr>
            </thead>
            <tbody>
            {pronostics.map((p) => (
                <tr key={p.id} className="bg-white border-t">
                    <td className="px-4 py-3">{p.equipe1}</td>
                    <td className="px-4 py-3 text-red-500 font-semibold">{p.score}</td>
                    <td className="px-4 py-3">{p.equipe2}</td>
                    <td className="px-4 py-3">{p.cote}</td>
                    <td className="px-4 py-3 text-red-500">{p.pronostic}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
