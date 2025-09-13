"use client";
import { Dumbbell, Heart } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 py-8 mt-12">
            <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-semibold text-white">Helstorm</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Votre partenaire fitness & nutrition pour progresser au quotidien.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-indigo-400" />
                        <span>Programmes sportifs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-400" />
                        <span>Conseils bien-être</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Helstorm. Tous droits réservés.
            </div>
        </footer>
    )
}