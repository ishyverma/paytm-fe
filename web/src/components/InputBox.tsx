"use client";

interface InputBoxType {
    label: string;
    inputType: "text" | "password";
    placeholder: string;
    width?: string;
    onBlur?: (e: any) => void;
}

export default function InputBox({ label, inputType, placeholder, width, onBlur }: InputBoxType) {
    return <div className="pt-4 font-satoshi flex flex-col">
        <label className="pr-4 font-semibold" htmlFor={`${placeholder}-${label}`}>{label}</label>
        <input onBlur={onBlur} className={`bg-[#27272A] font-medium mt-2 text-sm px-3 py-[9px] rounded-lg border-[0.5px] focus:outline-[#A3A3A3] focus:outline-none focus:outline-offset-0 border-opacity-50 ${width ? `w-[${width}px]` : 'w-[100%'} border-[#A3A3A3]`} id={`${placeholder}-${label}`} placeholder={`${placeholder}`} type={`${inputType}`} />
    </div>
}