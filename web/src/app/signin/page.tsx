"use client";

import Button from "@/components/Button";
import { Heading } from "@/components/Heading";
import InputBox from "@/components/InputBox";
import { Loading } from "@/components/Loading";
import SubHeading from "@/components/SubHeading";
import { RightArrow } from "@/icons/RightArrow";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Signin() {
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
        window.location.href = "/dashboard"
    }
  }, [])
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="w-[380px] pb-12 px-5 border-[0.5px] border-[#A3A3A3] border-opacity-50 rounded-lg">
        <Heading label="Sign In" />
        <SubHeading label="Enter your credentials to access your account" />
        <InputBox
          onBlur={(e) => {
            setUsername(e.target.value);
          }}
          label="Username"
          inputType="text"
          placeholder="shyshy17.0"
        />
        <InputBox
          onBlur={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          inputType="password"
          placeholder="••••••••"
        />
        <div className="mt-4">
            <Button
            onClick={async () => {
                setLoading(true);
                try {
                const response = await axios.post(
                    "http://localhost:3001/api/v1/user/signin",
                    {
                    username,
                    password,
                    }
                );
                localStorage.setItem("token", response.data.token);
                toast.success("Signed in successfully");
                setLoading(false);
                router.push("/dashboard");
                } catch (e: any) {
                toast.error(e.response.data.message);
                setLoading(false);
                }
            }}
            label={`${loading ? "" : "Sign in"}`}
            icon={loading ? <Loading /> : <RightArrow />}
            />
        </div>
        <div className="mt-4 flex justify-end text-sm">
          Don't have an account?
          <span
            onClick={() => {
              router.push("/signup");
            }}
            className="ml-1 cursor-pointer underline transition-all duration-75"
          >
            Sign Up
          </span>
        </div>
      </div>
      <div className="cusor-pointer">
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}
