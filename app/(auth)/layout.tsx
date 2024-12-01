// ./app/(auth)/layout.tsx
import Navbar from "@/components/navbar/navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <main className="flex-grow overflow-hidden bg-neutral-50">
                {children}
            </main>
        </div>
    );
}
