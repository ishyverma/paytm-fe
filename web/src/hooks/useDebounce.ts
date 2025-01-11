"use client";

import { useEffect, useState } from "react";

export function useDebounce(params: string) {
    const [value, setValue] = useState<string>(params);
    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(params)
        }, 200)
        return function() {
            clearTimeout(handler)
        }
    }, [params])
    return value
}