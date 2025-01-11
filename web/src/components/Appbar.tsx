"use client";

import { useEffect, useState } from "react";
import { Badge } from "./Badge";
import axios from "axios";
import { Avatar } from "./Avatar";
import { rupeeConverter } from "@/lib/rupeeConverter";
import { Exit } from "@/icons/Exit";
import { useRouter } from "next/navigation";

export function AppBar() {
  const [info, setInfo] = useState<null | UserInfoType>(null);
  const [allUsers, setUsers] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter()
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/user/me", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setInfo(response.data);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mx-4 font-satoshi pt-4">
        <div className="flex gap-2 justify-center items-center">
          <span className="text-2xl font-semibold">Paytm</span>
          <div className="mt-1">
            <Badge label="Beta" />
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-base font-medium">
              Hello! {info?.firstName} {info?.lastName}
            </span>
            <div
              onClick={() => {
                setOpen(prev => !prev)
              }}
              className="flex flex-col"
            >
              <Avatar label={`${info?.firstName[0]}${info?.lastName[0]}`} />
            </div>
          </div>
          <div className="flex justify-end absolute right-4 mt-1 items-center">
            {open ? <div className="bg-[#27272A] h-10 w-32 flex items-center justify-center rounded-lg">
              <span onClick={() => {
                localStorage.removeItem("token")
                router.push("/signin")
              }} className="flex cursor-pointer text-red-500 gap-2 font-semibold text-md justify-center items-center">
                Logout
                <Exit />
              </span>
            </div> : ""}
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-start items-center mx-4 mt-4">
        <div>
          <span className="font-medium">Your Balance:</span>
        </div>
        <div>
          <span>
            {
              // @ts-ignore
              rupeeConverter(info?.account[0].balance | 0)
            }
          </span>
        </div>
      </div>
    </div>
  );
}

interface UserInfoType {
  firstName: string;
  lastName: string;
  username: string;
  account: { balance: number }[];
}
