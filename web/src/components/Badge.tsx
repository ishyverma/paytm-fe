interface BadgeType {
    label: string;
}

export function Badge({ label }: BadgeType) {
    return <div className="flex justify-center items-center cursor-pointer">
        <span className="bg-[#A3A3A3] text-black text-sm px-[10px] py-[0.1px] rounded-md font-[600]">{label}</span>
    </div>
}