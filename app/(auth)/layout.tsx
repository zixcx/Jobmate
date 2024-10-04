import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function TapLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />

            <div className="w-full h-16" />
            {children}
        </div>
    );
}
