"use client";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { Toaster } from 'sonner'

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    window.location.href = "/signup"
  }, [])
  return <div className='bg-black'>
    <Toaster position='bottom-right' />
  </div>
}