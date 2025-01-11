interface AvatarType {
    label: string;
    variant?: 'big' | 'small';
}

export function Avatar({ label, variant }: AvatarType) {
    return <div className="avatar placeholder cursor-pointer">
        <div className={`bg-neutral text-neutral-content ${variant ? 'w-16' : 'w-10'} rounded-full`}>
            <span className={`${variant ? 'text-md' : 'text-xs'} font-semibold`}>{label}</span>
        </div>
    </div>
}