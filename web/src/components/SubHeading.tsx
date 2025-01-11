"use client";

interface SubHeadingType {
    label: string;
}

export default function SubHeading({ label }: SubHeadingType) {
    return <div className="flex justify-center pt-3 font-satoshi">
        {label}
    </div>
}