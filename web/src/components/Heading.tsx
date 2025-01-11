"use client";

interface HeadingType {
    label: string;
}

export function Heading({ label }: HeadingType) {
    return <div className="flex text-3xl font-semibold font-satoshi pt-6 justify-center">
        {label}
    </div>
}