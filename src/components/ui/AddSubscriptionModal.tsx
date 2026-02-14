"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Subscription {
    id: string;
    name: string;
    amount: number;           // Amount in original currency
    currency: "USD" | "INR";
    billingCycle: "monthly" | "yearly" | "one-time";
    exchangeRate?: number;    // $1 = ? INR (only if currency is USD)
    amountInINR: number;      // Final calculated INR amount
    createdAt: string;
}

interface AddSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (subscription: Subscription) => void;
}

export function AddSubscriptionModal({ isOpen, onClose, onSave }: AddSubscriptionModalProps) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState<"USD" | "INR">("INR");
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "one-time">("monthly");
    const [exchangeRate, setExchangeRate] = useState("83");

    // Calculate INR amount
    const calculatedINR = currency === "USD"
        ? parseFloat(amount || "0") * parseFloat(exchangeRate || "0")
        : parseFloat(amount || "0");

    // Reset form on open
    useEffect(() => {
        if (isOpen) {
            setName("");
            setAmount("");
            setCurrency("INR");
            setBillingCycle("monthly");
            setExchangeRate("83");
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !amount || parseFloat(amount) <= 0) return;

        const sub: Subscription = {
            id: crypto.randomUUID(),
            name: name.trim(),
            amount: parseFloat(amount),
            currency,
            billingCycle,
            exchangeRate: currency === "USD" ? parseFloat(exchangeRate) : undefined,
            amountInINR: calculatedINR,
            createdAt: new Date().toISOString(),
        };

        onSave(sub);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-100">Add Subscription</h2>
                            <button
                                onClick={onClose}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Netflix, Spotify, AWS..."
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-colors"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-colors"
                                />
                            </div>

                            {/* Currency Toggle */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Currency
                                </label>
                                <div className="flex gap-2">
                                    {(["INR", "USD"] as const).map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setCurrency(c)}
                                            className={cn(
                                                "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                                                currency === c
                                                    ? "bg-teal-400 text-slate-900 shadow-md"
                                                    : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                                            )}
                                        >
                                            {c === "INR" ? "₹ INR" : "$ USD"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Exchange Rate (only for USD) */}
                            <AnimatePresence>
                                {currency === "USD" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                            $1 = ? INR
                                        </label>
                                        <input
                                            type="number"
                                            value={exchangeRate}
                                            onChange={(e) => setExchangeRate(e.target.value)}
                                            placeholder="83"
                                            min="0"
                                            step="0.01"
                                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-colors"
                                        />
                                        {amount && parseFloat(amount) > 0 && (
                                            <p className="mt-1.5 text-xs text-teal-400/80">
                                                = ₹{new Intl.NumberFormat("en-IN").format(calculatedINR)}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Billing Cycle */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                                    Billing Cycle
                                </label>
                                <div className="flex gap-2">
                                    {(["monthly", "yearly", "one-time"] as const).map((cycle) => (
                                        <button
                                            key={cycle}
                                            type="button"
                                            onClick={() => setBillingCycle(cycle)}
                                            className={cn(
                                                "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all duration-200",
                                                billingCycle === cycle
                                                    ? "bg-teal-400 text-slate-900 shadow-md"
                                                    : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                                            )}
                                        >
                                            {cycle === "one-time" ? "One-time" : cycle}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="flex-1 rounded-lg bg-teal-400 py-2.5 text-sm font-semibold text-slate-900 hover:bg-teal-300 transition-colors shadow-md"
                                >
                                    Save
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
