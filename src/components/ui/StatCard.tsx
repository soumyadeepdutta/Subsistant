"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    subtext?: string;
    icon: LucideIcon;
    delay?: number;
}

export function StatCard({ title, value, subtext, icon: Icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={cn(
                "rounded-xl border border-slate-800 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm",
                "hover:border-teal-400/30 hover:bg-slate-800 transition-colors duration-300"
            )}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-400">{title}</h3>
                <div className="rounded-lg bg-teal-400/10 p-2 text-teal-400">
                    <Icon size={20} />
                </div>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-bold text-slate-100">{value}</div>
                {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
            </div>
        </motion.div>
    );
}
