// ./components/TimeTable/EventTooltip.tsx
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Event } from "./types";

interface EventTooltipProps {
    event: Event;
    position: { x: number; y: number };
    onClose: () => void;
}

export function EventTooltip({ event, position, onClose }: EventTooltipProps) {
    return (
        <div
            className="fixed bg-white border pl-3 pr-6 py-3 rounded-lg shadow-md z-50"
            style={{
                top: position.y,
                left: position.x,
            }}
        >
            <div className="flex flex-col">
                <p className="font-semibold">{event.title}</p>
                <p className="text-xs text-neutral-500">
                    {event.start.format("HH:mm")}
                    {" - "}
                    {event.end.format("HH:mm")}
                </p>
                <p className="text-xs text-neutral-500">{event.subtitle}</p>
            </div>
            <button
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                onClick={onClose}
            >
                <XMarkIcon
                    width={16}
                    style={{
                        strokeWidth: "2",
                    }}
                />
            </button>
        </div>
    );
}
