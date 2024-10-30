export default function ScheduleItem() {
    return (
        <div className="w-full h-32 box !p-0 box-border relative">
            <div
                className="w-full h-full"
                style={{ backgroundColor: "dodgerblue" }}
            />
            <div className="absolute top-0 flex flex-col w-full h-full gap-1 p-3 bg-white left-2">
                <div className="flex flex-col">
                    <span className="text-sm text-neutral-500 [line-height:1rem]">
                        오전 10:00 - 오후 01:00
                    </span>
                    <span className="title text-neutral-700">adsasd</span>
                </div>
                <span className="text-sm text-neutral-500">
                    메모가 없습니다
                </span>
            </div>
        </div>
    );
}
