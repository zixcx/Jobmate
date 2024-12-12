// ./components/WageChart/types.ts
export interface WageChartProps {
    wageData: ChartData;
    recentThreeMonthsWageData: ChartData;
    recentThreeMonthsHoursData: ChartData;
}

interface ChartData {
    labels: string[];
    datasets: Dataset[];
}

interface Dataset {
    label: string;
    backgroundColor: string[];
    borderColor: string[];
    data: number[];
}
