// ./app/staff/home/page.tsx
import {
    BanknotesIcon,
    BriefcaseIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

import { getStaffHomeData, getWageChartData } from "./actions";
import { WageChartProps } from "@/components/WageChart/types";
import WageChart from "@/components/WageChart";

interface StaffHomeData {
    expectedWage: number;
    totalWorkHours: number;
    registeredJobs: number;
}

export default async function StaffHome() {
    const staffHomeData: StaffHomeData = await getStaffHomeData();
    const wageChartData: WageChartProps = await getWageChartData();

    return (
        <div className="flex flex-col gap-6 p-10">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="title-lg">잡메이트</h1>
                <p className="text-neutral-600">알바생 급여 관리 플랫폼</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Quick Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl box">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <BanknotesIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600">
                                이번 달 예상 급여
                            </p>
                            <p className="text-xl font-semibold">
                                {staffHomeData.expectedWage.toLocaleString()}원
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl box">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <ClockIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600">
                                이번 달 총 근무시간
                            </p>
                            <p className="text-xl font-semibold">
                                {staffHomeData.totalWorkHours}시간
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl box">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <BriefcaseIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600">
                                등록된 일자리
                            </p>
                            <p className="text-xl font-semibold">
                                {staffHomeData.registeredJobs}개
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="flex flex-col w-full bg-white box">
                    <WageChart
                        wageData={wageChartData.wageData}
                        recentThreeMonthsWageData={
                            wageChartData.recentThreeMonthsWageData
                        }
                        recentThreeMonthsHoursData={
                            wageChartData.recentThreeMonthsHoursData
                        }
                    />
                </div>
            </div>
        </div>
    );
}
