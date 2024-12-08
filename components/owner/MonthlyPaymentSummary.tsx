// ./components/owner/MonthlyPaymentSummary.tsx
"use client";

import { useState, useEffect } from "react";
import { getMonthlyPaymentSummary } from "@/components/owner/actions";

interface PaymentSummary {
    totalAmount: number;
    staffCount: number;
}

export default function MonthlyPaymentSummary() {
    const [summary, setSummary] = useState<PaymentSummary | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getMonthlyPaymentSummary();
                setSummary(data);
            } catch (error) {
                console.error("Error fetching monthly payment summary:", error);
            }
        };

        fetchSummary();
    }, []);

    if (!summary) {
        return (
            <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Monthly Payment Summary
            </h2>
            <p className="text-gray-700">
                Total Amount:{" "}
                <span className="font-semibold">
                    ₩{summary.totalAmount.toLocaleString()}
                </span>
            </p>
            <p className="text-gray-700">
                Number of Staff:{" "}
                <span className="font-semibold">{summary.staffCount}</span>
            </p>
        </div>
    );
}
