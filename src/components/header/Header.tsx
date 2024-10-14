import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { PopoverGroup } from '@headlessui/react';

export default function Example() {

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img alt="" src="src/assets/Betandro-logo.png" className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link to="/daily-bet" className="text-sm font-semibold leading-6 text-gray-900">
                        Pronostic du jour
                    </Link>
                    <Link to="/paris" className="text-sm font-semibold leading-6 text-gray-900">
                        Mes paris
                    </Link>
                    <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                        Qui sommes-nous ?
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Se connecter <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}
