"use client";

import { motion } from "framer-motion";
import { Mailbox } from "lucide-react";

export function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20 text-center"
        >
            <div className="relative mb-6">
                {/* 3D-style Mailbox icon effect */}
                <div className="absolute -inset-4 rounded-full bg-teal-400/5 blur-xl" />
                <Mailbox size={64} className="relative z-10 text-slate-500" />
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white shadow-sm">
                    1
                </div>
            </div>

            <h3 className="text-lg font-medium text-slate-200">No subscriptions yet</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
                Get started by adding your first subscription to track your monthly spending.
            </p>
        </motion.div>
    );
}
