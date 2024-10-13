import TabBar from "@/components/owner_tabbar";
import React from "react";

export default function TapLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <div className="w-full h-20" />
            <TabBar />
        </div>
    );
}
