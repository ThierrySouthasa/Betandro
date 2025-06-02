import Link from "next/link";
import { UserCircle } from "lucide-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-red-500">Betandro</h1>

                <div className="flex items-center space-x-3">
                    <Link href="/">
                        <button
                            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            Accueil
                        </button>
                    </Link>

                    <Link href="/player">
                        <button
                            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            Joueur
                        </button>
                    </Link>

                    <Link href="/admin">
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                            Admin
                        </button>
                    </Link>

                    <Link href="/auth">
                        <button
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            <UserCircle className="w-5 h-5 text-gray-500"/>
                            <span>Connexion</span>
                        </button>
                    </Link>
                </div>
            </div>
        </header>

    );
}

export default Header;