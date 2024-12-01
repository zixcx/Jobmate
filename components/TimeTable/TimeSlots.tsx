// ./components/TimeTable/TimeSlots.tsx
interface TimeSlotsProps {
    slots: string[];
    slotsLength: number;
}

export function TimeSlots({ slots, slotsLength }: TimeSlotsProps) {
    return (
        <div className="w-12 h-full overflow-hidden">
            <div className="h-[41px]"></div>
            <div className="relative h-[calc(100%-41px)]">
                {slots.map((time, index) => (
                    <div
                        key={time}
                        className="absolute left-0 right-0 text-xs text-gray-500 px-1 text-right whitespace-nowrap"
                        style={{
                            top: `${(index / (slotsLength - 1)) * 100}%`,
                            transform: "translateY(-50%)",
                            paddingBottom:
                                index === slotsLength - 1 ? "10px" : "0",
                        }}
                    >
                        {time}
                    </div>
                ))}
            </div>
        </div>
    );
}
