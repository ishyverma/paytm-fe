"use client";

import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import Button from "./Button";

export default function User() {
  const [inputVal, setInputVal] = useState<string>("");
  const [data, setData] = useState<null | UserType[]>(null);
  const debouncedValue = useDebounce(inputVal);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/user/bulk?filter=${debouncedValue}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data.users);
      });
  }, [debouncedValue]);
  return (
    <div className="flex mt-4 flex-col mx-4">
      <div>
        <span className="font-bold">Users</span>
      </div>
      <div>
        {/* @ts-ignore */}
        <input
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          className="bg-[#27272A] font-medium mt-2 text-sm px-3 py-[9px] rounded-lg border-[0.5px] focus:outline-[#A3A3A3] focus:outline-none focus:outline-offset-0 border-opacity-50 border-[#A3A3A3] w-full"
          type="text"
          placeholder="Search Users"
        />
        <div className="mt-4">
          {data?.map((u) => (
            <div
              key={u.id}
              className="mt-2 flex gap-2 items-center justify-between"
            >
              <div className="flex items-center w-full gap-2">
                <Avatar label={`${u.firstName[0]}${u.lastName[0]}`} />
                <div>
                  {u.firstName} {u.lastName}
                </div>
              </div>
              <div className="w-48">
                <Button key={u.id} label="Send Money" onClick={() => {
                    router.push(`/send/${u.firstName}-${u.lastName}?id=${u.id}`)
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface UserType {
  firstName: string;
  lastName: string;
  username: string;
  id: number;
}
