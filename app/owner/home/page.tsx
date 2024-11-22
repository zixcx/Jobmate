import { BellIcon } from "@heroicons/react/24/outline";

export default function OwnerHome() {
    return (
        <div className="flex flex-col gap-3 p-10">
            <div className="flex justify-between items-center">
                <span className="title-lg">잡메이트</span>
                <div className="hover:bg-neutral-200 size-9 p-1 rounded-lg flex justify-center items-center relative">
                    <BellIcon className="size-8" />
                    <div className="absolute rounded-full bg-red-500 size-3 min-h-3 min-w-3 max-w-3 max-h-3 bottom-0.5 right-0"></div>
                </div>
            </div>
        </div>
    );
}
