// ./app/owner/home/page.tsx
import StaffApplications from "@/components/owner/StaffApplications";
import MonthlyPaymentSummary from "@/components/owner/MonthlyPaymentSummary";

export default function OwnerHome() {
    return (
        <div className="flex flex-col gap-6">
            <span className="text-2xl font-bold text-gray-800">잡메이트</span>

            <StaffApplications />
            <MonthlyPaymentSummary />
        </div>
    );
}
