import TabBar from "@/components/owner_tabbar";
import React from "react";

export default function TapLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="mb-[72px] h-[calc(100dvh-72px)] overflow-y-auto">
                {children}
            </div>
            <TabBar />
        </>
    );
}
