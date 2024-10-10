import { InputHTMLAttributes } from "react";

interface InputsProps {
    name: string;
    errors?: string[];
}

export default function Input({
    name,
    errors = [],
    ...rest
}: InputsProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col w-full gap-2">
            <input
                name={name}
                className="w-full input input-bordered"
                {...rest}
            />
            {errors.map((error, idx) => (
                <span
                    key={idx}
                    className="-mt-1 text-sm font-medium text-red-500"
                >
                    {error}
                </span>
            ))}
        </div>
    );
}
