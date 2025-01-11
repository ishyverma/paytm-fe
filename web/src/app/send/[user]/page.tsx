"use client";

import { Avatar } from "@/components/Avatar";
import Button from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Loading } from "@/components/Loading";
import { RightArrow } from "@/icons/RightArrow";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Send() {
  const searchParams = useSearchParams();
  const { user } = useParams();
  const params = searchParams.get("id");
  const [money, setMoney] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex h-screen w-screen items-center justify-center font-satoshi">
      <div className="h-[50vh] w-[30vw] border-[0.5px] border-[#A3A3A3] border-opacity-50 rounded-lg px-10">
        <div>
          <Heading label="Send Money" />
        </div>
        <div className="flex gap-2 items-center mt-8">
          <div>
            <Avatar
              variant="big"
              label={`${user?.toString().split("-")[0][0]}${
                user?.toString().split("-")[1][0]
              }`}
            />
          </div>
          <div>
            <span className="text-lg font-semibold">
              {user?.toString().split("-").join(" ")}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-base">Amount (in Rs)</span>
        </div>
        <div className="mt-4">
          <input
            onBlur={(e) => {
                setMoney(parseInt(e.target.value))
            }}
            className="bg-[#27272A] font-medium mt-2 text-sm px-3 py-[9px] rounded-lg border-[0.5px] focus:outline-[#A3A3A3] focus:outline-none focus:outline-offset-0 border-opacity-50 border-[#A3A3A3] w-full"
            type="number"
            placeholder="Enter amount"
          />
        </div>
        <div className="mt-4">
          <Button
            onClick={async () => {
                setLoading(true)
                try {
                    const response = await axios.post("http://localhost:3001/api/v1/account/transfer", {
                        to: parseInt(params as string),
                        amount: money
                    }, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    setLoading(false)
                    toast.success(response.data.message)
                } catch (e: any) {
                    setLoading(false)
                    toast.error(e.response.data.message);
                }
            }} label={loading ? "" : "Initiate Transaction"} icon={loading ? <Loading /> : <RightArrow />} />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
