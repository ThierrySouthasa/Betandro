import PronosticCard from '@/components/PronosticCard';
import PronosticTable from '@/components/PronosticTable';
import PronosticForm from '@/components/PronosticForm';

export default function AdminPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-10">
            <h1 className="text-3xl font-bold text-red-500">Espace Admin</h1>

            <PronosticForm />

            <PronosticTable />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <PronosticCard
                    equipe1="France"
                    equipe2="Allemagne"
                    score="2-1"
                    cote={2.4}
                    pronostic="France"
                />
                <PronosticCard
                    equipe1="Brésil"
                    equipe2="Argentine"
                    score="1-3"
                    cote={1.9}
                    pronostic="Argentine"
                />
            </div>
        </div>
    );
}