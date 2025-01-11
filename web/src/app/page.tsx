"use client";

import { useEffect } from 'react';
import { Toaster } from 'sonner'

export default function Home() {
  useEffect(() => {
    window.location.href = "/signup"
  }, [])
  return <div className='bg-black'>
    <Toaster position='bottom-right' />
  </div>
}