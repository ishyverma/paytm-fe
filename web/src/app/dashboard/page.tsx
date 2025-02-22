"use client";

import { AppBar } from "@/components/Appbar";
import User from "@/components/User";
import { useEffect } from "react";

export default function Dashboard() {
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            window.location.href = "/signup"
        }
    }, [])
    return <div className="bg-black h-screen w-screen">
        <AppBar />
        <User />
    </div>    
}