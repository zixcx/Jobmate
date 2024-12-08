// ./app/owner/home/page.tsx
import { BellIcon } from "@heroicons/react/24/outline";
import StaffApplications from "@/components/owner/StaffApplications";
import MonthlyPaymentSummary from "@/components/owner/MonthlyPaymentSummary";

export default function OwnerHome() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                    잡메이트
                </span>
                <div className="hover:bg-gray-200 size-9 p-1 rounded-lg flex justify-center items-center relative">
                    <BellIcon className="size-8 text-gray-600" />
                </div>
            </div>
            <StaffApplications />
            <MonthlyPaymentSummary />
        </div>
    );
}
