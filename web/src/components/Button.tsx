"use client";

import React from "react";

interface ButtonType {
    label?: string;
    icon?: React.ReactElement
    onClick?: () => void;
}

export default function Button({ label, icon, onClick }: ButtonType) {
    return <div className="font-satoshi">
        <button onClick={onClick} className="bg-[#18181A] hover:bg-[#27272A] transition-all duration-75 px-3 py-[9px] w-full p-5 rounded-lg border-[0.5px] border-[#A3A3A3] border-opacity-50">
            <div className="flex justify-center items-center gap-2">
                {label}
                {icon}
            </div>
        </button>
    </div>
}