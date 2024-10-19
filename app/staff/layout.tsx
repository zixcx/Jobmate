import TabBar from "@/components/staff_tabbar";
import React from "react";

export default function TapLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="mb-[72px] h-[calc(100vh-72px)] overflow-y-auto">
                {children}
            </div>
            <TabBar />
        </>
    );
}
