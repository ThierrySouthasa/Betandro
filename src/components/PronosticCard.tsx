interface PronosticCardProps {
    equipe1: string;
    equipe2: string;
    score: string;
    cote: number;
    pronostic: string;
}

export default function PronosticCard({
                                          equipe1,
                                          equipe2,
                                          score,
                                          cote,
                                          pronostic,
                                      }: PronosticCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-medium">{equipe1}</span>
                <span className="text-red-500 font-bold text-lg">{score}</span>
                <span className="text-gray-700 font-medium">{equipe2}</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-between">
                <span>Cote : <strong className="text-gray-700">{cote}</strong></span>
                <span>Pronostic : <strong className="text-red-500">{pronostic}</strong></span>
            </div>
        </div>
    );
}