"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CurrencyToggleProps {
    currency: "USD" | "INR";
    onToggle: (currency: "USD" | "INR") => void;
}

export function CurrencyToggle({ currency, onToggle }: CurrencyToggleProps) {
    return (
        <div className="relative flex h-9 w-32 items-center rounded-lg bg-slate-800 p-1">
            <div className="flex w-full">
                <button
                    onClick={() => onToggle("USD")}
                    className={cn(
                        "relative z-10 w-1/2 text-sm font-medium transition-colors duration-200",
                        currency === "USD" ? "text-slate-900" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    USD
                </button>
                <button
                    onClick={() => onToggle("INR")}
                    className={cn(
                        "relative z-10 w-1/2 text-sm font-medium transition-colors duration-200",
                        currency === "INR" ? "text-slate-900" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    INR
                </button>
            </div>
            <motion.div
                className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-md bg-teal-400 shadow-sm"
                animate={{
                    x: currency === "USD" ? 0 : "100%",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        </div>
    );
}
