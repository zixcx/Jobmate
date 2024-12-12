// ./app/owner/work/page.tsx
import StaffList from "@/components/owner/StaffList";

export default function OwnerWork() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Staff Management
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StaffList />
                <div className="box bg-white">todo: add components</div>
            </div>
        </div>
    );
}
