import TabBar from "@/components/staff_tabbar";
import React from "react";

export default function TapLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <div className="md:hidden">
                <TabBar />
            </div>
        </div>
    );
}
