"use client";

import { useEffect, useRef, useState } from "react";

export function useDebounce(params: string) {
    const [value, setValue] = useState<any>(params);
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