import WageChart from "@/components/wage_chart";

export default function StaffHome() {
    return (
        <div className="flex flex-col gap-3 p-10">
            <span className="title-lg">잡메이트</span>
            <div className="flex flex-col w-full bg-white box">
                <WageChart />
            </div>
        </div>
    );
}
