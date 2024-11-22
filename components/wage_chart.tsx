// ./components/wage_chart.tsx
"use client";

import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
);

const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    beforeDraw(chart) {
        const { width, height, ctx } = chart;
        const chartData = chart.config.data;
        const total =
            chartData?.datasets?.[0]?.data?.reduce(
                (acc, value) => acc + value,
                0
            ) || 0;
        const lines = chartData?.datasets?.[0]?.label?.includes("시간")
            ? ["총 근무 시간", `${total}시간`]
            : ["총 급여", `${total.toLocaleString()}원`];
        const fontSize = 18;
        const lineHeight = fontSize * 1.5; // 줄 간격을 더 넓게 설정하여 테스트
        const totalHeight = lines.length * lineHeight; // 전체 텍스트 높이 계산

        ctx.save();
        ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textX = width / 2;
        const textY = height / 2 - totalHeight / 2 + lineHeight / 2; // 전체 높이를 고려해 중앙 위치 조정

        // 각 줄을 순서대로 출력
        lines.forEach((line, index) => {
            ctx.fillText(line, textX, textY + (index - 0.5) * lineHeight);
        });

        ctx.restore();
    },
};

export default function WageChart() {
    const [onSetting, setOnSetting] = useState(false);
    const [showDataLabel, setShowDataLabel] = useState(true);
    const [chartType, setChartType] = useState<"DOUGHNUT" | "LINE" | "BAR">(
        "DOUGHNUT"
    );
    const handleShowDataLabel = () => {
        setShowDataLabel(!showDataLabel);
    };
    const toggleSettingModal = () => {
        setOnSetting(!onSetting);
    };
    const handleChartType = (index: "DOUGHNUT" | "LINE" | "BAR") => {
        setChartType(index);
    };

    const labels = ["근무지1", "근무지2", "근무지3", "근무지4"];

    const userData = {
        "8": {
            근무지1: {
                workHours: dayjs().hour(14).minute(0),
                hourlyWage: 10000,
            },
            근무지2: {
                workHours: dayjs().hour(20).minute(0),
                hourlyWage: 15000,
            },
            근무지3: {
                workHours: dayjs().hour(33).minute(0),
                hourlyWage: 12000,
            },
            근무지4: {
                workHours: dayjs().hour(6).minute(0),
                hourlyWage: 20000,
            },
        },
        "9": {
            근무지1: {
                workHours: dayjs().hour(10).minute(0),
                hourlyWage: 10000,
            },
            근무지2: {
                workHours: dayjs().hour(22).minute(0),
                hourlyWage: 15000,
            },
            근무지3: {
                workHours: dayjs().hour(26).minute(0),
                hourlyWage: 12000,
            },
            근무지4: {
                workHours: dayjs().hour(10).minute(0),
                hourlyWage: 20000,
            },
        },
        "10": {
            근무지1: {
                workHours: dayjs().hour(16).minute(0),
                hourlyWage: 10000,
            },
            근무지2: {
                workHours: dayjs().hour(10).minute(0),
                hourlyWage: 15000,
            },
            근무지3: {
                workHours: dayjs().hour(38).minute(0),
                hourlyWage: 12000,
            },
            근무지4: {
                workHours: dayjs().hour(14).minute(0),
                hourlyWage: 20000,
            },
        },
    };

    const colors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(201, 203, 207, 0.5)",
        "rgba(100, 100, 255, 0.5)",
        "rgba(200, 200, 100, 0.5)",
        "rgba(100, 200, 150, 0.5)",
    ];

    const borderColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(201, 203, 207, 1)",
        "rgba(100, 100, 255, 1)",
        "rgba(200, 200, 100, 1)",
        "rgba(100, 200, 150, 1)",
    ];

    // 근무지별 급여 분석 데이터 (현재 달 기준)
    const wageData = {
        labels,
        datasets: [
            {
                label: "급여 데이터",
                backgroundColor: colors,
                borderColor: borderColors,
                data: labels.map((label) => {
                    const currentMonthData = userData["10"] as Record<
                        string,
                        { workHours: dayjs.Dayjs; hourlyWage: number }
                    >;
                    return (
                        (currentMonthData[label]?.workHours?.hour() || 0) *
                        (currentMonthData[label]?.hourlyWage || 0)
                    );
                }),
            },
        ],
    };

    // 최근 3개월간 급여 분석 데이터
    const recentThreeMonthsWageData = {
        labels,
        datasets: [
            {
                label: "최근 3개월 급여 데이터",
                backgroundColor: colors,
                borderColor: borderColors,
                data: labels.map((label) =>
                    Object.values(userData).reduce(
                        (acc, monthData) =>
                            acc +
                            ((monthData as Record<string, any>)[
                                label
                            ]?.workHours?.hour() || 0) *
                                ((monthData as Record<string, any>)[label]
                                    ?.hourlyWage || 0),
                        0
                    )
                ),
            },
        ],
    };

    // 최근 3개월간 근무 시간 분석 데이터
    const recentThreeMonthsHoursData = {
        labels,
        datasets: [
            {
                label: "최근 3개월 근무 시간 데이터",
                backgroundColor: colors,
                borderColor: borderColors,
                data: labels.map((label) =>
                    Object.values(userData).reduce(
                        (acc, monthData) =>
                            acc +
                            ((monthData as Record<string, any>)[
                                label
                            ]?.workHours?.hour() || 0),
                        0
                    )
                ),
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                },
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label(tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const label = dataset?.label || "";
                        const value =
                            dataset?.data?.[tooltipItem.dataIndex] || 0;
                        return `${
                            label.includes("시간") ? "근무 시간" : "급여"
                        }: ${value.toLocaleString()}${
                            label.includes("시간") ? "시간" : "원"
                        }`;
                    },
                },
            },
            datalabels: {
                display: showDataLabel,
                align: "center",
                anchor: "center",
                formatter: (value, context) => {
                    const labels = context?.chart?.data?.labels;
                    const label = context?.dataset?.label || "";
                    if (labels) {
                        return `${
                            labels[context.dataIndex]
                        }\n${value.toLocaleString()}${
                            label.includes("시간") ? "시간" : "원"
                        }`;
                    }
                    return `${value.toLocaleString()}${
                        label.includes("시간") ? "시간" : "원"
                    }`;
                },
                color: "#000",
                font: {
                    size: 12,
                },
            },
        },
    };

    const lineAndBarOptions: ChartOptions<"line" | "bar"> = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                },
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label(tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const label = dataset?.label || "";
                        const value =
                            dataset?.data?.[tooltipItem.dataIndex] || 0;
                        return `${
                            label.includes("시간") ? "근무 시간" : "급여"
                        }: ${value.toLocaleString()}${
                            label.includes("시간") ? "시간" : "원"
                        }`;
                    },
                },
            },
        },
    };

    const dataViewType = [
        "이번달 근무지별 급여 분석",
        "이번달 근무 시간 분석",
        "최근 3개월간 급여 분석",
        "최근 3개월간 근무 시간 분석",
    ] as const;
    type DataViewType = (typeof dataViewType)[number];

    const [showDataViewType, setShowDataViewType] = useState(false);
    const [selectedDataViewType, setSelectedDataViewType] =
        useState<DataViewType>(dataViewType[0]);
    const [chartData, setChartData] = useState(wageData);

    useEffect(() => {
        switch (selectedDataViewType) {
            case "이번달 근무 시간 분석":
                setChartData(recentThreeMonthsHoursData);
                break;
            case "최근 3개월간 급여 분석":
                setChartData(recentThreeMonthsWageData);
                break;
            case "최근 3개월간 근무 시간 분석":
                setChartData(recentThreeMonthsHoursData);
                break;
            default:
                setChartData(wageData);
        }
    }, [selectedDataViewType]);

    const toggleDataViewType = () => {
        setShowDataViewType(!showDataViewType);
    };

    const handleSelectDataViewType = (type: DataViewType) => {
        setSelectedDataViewType(type);
        setShowDataViewType(false);
    };

    const chartTypes = ["DOUGHNUT", "LINE", "BAR"] as const;

    return (
        <div className="flex flex-col justify-center w-full gap-3">
            <div className="relative flex items-center justify-between font-semibold">
                <div
                    onClick={toggleDataViewType}
                    className="flex items-center gap-1 p-2 select-none rounded-xl hover:bg-neutral-100 cursor-pointer"
                >
                    <span>{selectedDataViewType}</span>
                    <ChevronDownIcon
                        width={20}
                        className={`${
                            showDataViewType && "-rotate-180"
                        } transition-transform`}
                        style={{ strokeWidth: "2" }}
                    />
                </div>
                <button
                    onClick={toggleSettingModal}
                    className="p-2 rounded-xl hover:bg-neutral-100"
                >
                    <Cog6ToothIcon width={20} style={{ strokeWidth: "2" }} />
                </button>

                {showDataViewType && (
                    <div className="absolute left-0 top-full mt-1 z-10 bg-white shadow-lg rounded-xl p-2">
                        {dataViewType.map((type, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-2 font-medium rounded-lg hover:bg-neutral-100 cursor-pointer"
                                onClick={() => handleSelectDataViewType(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {onSetting && (
                <div className="flex flex-col w-full gap-3 p-4 bg-neutral-100 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer self-center">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="checkbox size-5"
                            onChange={handleShowDataLabel}
                        />
                        <span className="text-sm select-none">
                            그래프 정보 표시하기
                        </span>
                    </label>
                    <div className="flex gap-4">
                        {["원형", "선형", "막대"].map((type, index) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="chart-type"
                                    defaultChecked={index === 0}
                                    onChange={() =>
                                        handleChartType(chartTypes[index])
                                    }
                                    className="radio size-5"
                                />
                                <span className="text-sm select-none">
                                    {type} 그래프
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center h-[300px] lg:h-[400px]">
                {chartType === "DOUGHNUT" && (
                    <Doughnut
                        options={options}
                        data={chartData}
                        plugins={[centerTextPlugin]}
                    />
                )}
                {chartType === "LINE" && (
                    <Line options={lineAndBarOptions} data={chartData} />
                )}
                {chartType === "BAR" && (
                    <Bar options={lineAndBarOptions} data={chartData} />
                )}
            </div>
        </div>
    );
}
