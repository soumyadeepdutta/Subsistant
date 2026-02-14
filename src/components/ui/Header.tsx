"use client";

import { Plus } from "lucide-react";
import { CurrencyToggle } from "./CurrencyToggle";
import { motion } from "framer-motion";

interface HeaderProps {
    currency: "USD" | "INR";
    setCurrency: (currency: "USD" | "INR") => void;
    onAdd: () => void;
}

export function Header({ currency, setCurrency, onAdd }: HeaderProps) {
    return (
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-teal-400">
                    Subsistant
                </h1>
                <p className="mt-1 text-slate-400">Keep your subscriptions in check</p>
            </div>

            <div className="flex items-center gap-4">
                <CurrencyToggle currency={currency} onToggle={setCurrency} />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAdd}
                    className="flex items-center gap-2 rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md hover:bg-teal-300 transition-colors"
                >
                    <Plus size={18} />
                    <span>Add</span>
                </motion.button>
            </div>
        </header>
    );
}
