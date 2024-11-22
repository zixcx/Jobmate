// ./components/search_input.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function SearchInput({
    className,
    ...inputProps
}: SearchInputProps) {
    return (
        <div className={className}>
            <label className="flex items-center justify-between gap-0 pl-3 overflow-hidden bg-white border rounded-2xl">
                <MagnifyingGlassIcon className="flex items-center justify-center size-6 min-w-6 min-h-6 text-neutral-400" />
                <input
                    className="w-full px-4 py-3 outline-none"
                    {...inputProps}
                />
            </label>
        </div>
    );
}
