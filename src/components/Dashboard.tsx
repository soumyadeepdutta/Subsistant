"use client";

import { useState, useMemo } from "react";
import { Header } from "./ui/Header";
import { StatCard } from "./ui/StatCard";
import { EmptyState } from "./ui/EmptyState";
import { AddSubscriptionModal, Subscription } from "./ui/AddSubscriptionModal";
import { IndianRupee, Layers, CalendarClock, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
    const [currency, setCurrency] = useState<"USD" | "INR">("INR");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    // Format INR value
    const formatINR = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Compute stats — always in INR
    const stats = useMemo(() => {
        const recurring = subscriptions.filter((s) => s.billingCycle !== "one-time");
        const oneTime = subscriptions.filter((s) => s.billingCycle === "one-time");

        // Monthly spend: sum of all recurring (yearly ones / 12)
        const monthlySpend = recurring.reduce((sum, s) => {
            const monthlyINR =
                s.billingCycle === "yearly" ? s.amountInINR / 12 : s.amountInINR;
            return sum + monthlyINR;
        }, 0);

        const yearlySpend = monthlySpend * 12;
        const activeCount = recurring.length;

        // One-time total
        const oneTimeTotal = oneTime.reduce((sum, s) => sum + s.amountInINR, 0);

        // Next renewal: closest future date (placeholder — we don't track dates yet, so show "—")
        const nextRenewal = "—";

        return { monthlySpend, yearlySpend, activeCount, oneTimeTotal, nextRenewal };
    }, [subscriptions]);

    const handleSave = (sub: Subscription) => {
        setSubscriptions((prev) => [...prev, sub]);
    };

    const handleDelete = (id: string) => {
        setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    };

    const statCards = [
        {
            title: "Monthly Spend",
            value: formatINR(stats.monthlySpend),
            subtext: `${formatINR(stats.yearlySpend)}/year`,
            icon: IndianRupee,
        },
        {
            title: "Active Subs",
            value: String(stats.activeCount),
            icon: Layers,
        },
        {
            title: "Next Renewal",
            value: stats.nextRenewal,
            icon: CalendarClock,
        },
        {
            title: "One-Time Spent",
            value: stats.oneTimeTotal > 0 ? formatINR(stats.oneTimeTotal) : "—",
            subtext: "recharge / credits",
            icon: Zap,
        },
    ];

    const hasSubscriptions = subscriptions.length > 0;

    return (
        <div className="min-h-screen bg-[#0f172a] px-4 pb-20 pt-4 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Header
                    currency={currency}
                    setCurrency={setCurrency}
                    onAdd={() => setIsAddModalOpen(true)}
                />

                {/* Stats Grid */}
                <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {statCards.map((stat, i) => (
                        <StatCard key={stat.title} {...stat} delay={i * 0.1} />
                    ))}
                </div>

                {/* Subscriptions List or Empty State */}
                <div className="mt-12">
                    {!hasSubscriptions ? (
                        <EmptyState />
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold text-slate-200 mb-4">
                                Your Subscriptions
                            </h2>
                            <div className="grid gap-3">
                                <AnimatePresence>
                                    {subscriptions.map((sub) => (
                                        <motion.div
                                            key={sub.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/50 px-5 py-4 hover:border-teal-400/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400/10 text-teal-400 text-sm font-bold">
                                                    {sub.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-100">{sub.name}</p>
                                                    <p className="text-xs text-slate-500 capitalize">
                                                        {sub.billingCycle}
                                                        {sub.currency === "USD" && (
                                                            <span className="ml-2 text-slate-600">
                                                                (${sub.amount} × ₹{sub.exchangeRate})
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-lg font-semibold text-slate-100">
                                                    {formatINR(sub.amountInINR)}
                                                </p>
                                                <button
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="text-slate-600 hover:text-red-400 transition-colors text-xs"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Modal */}
            <AddSubscriptionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
