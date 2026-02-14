"use client"
import React, { useEffect, useState } from 'react'
import { FaRegStar, FaRegMoon } from 'react-icons/fa'
import FloatingDots from './components/FloatingDots'
import Link from 'next/link'

export default function Home() {
  const FloatingDotsWrapper = ({ count }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return <FloatingDots count={count} />
  }

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)]'>

      <FaRegStar className='absolute top-10 left-20 text-white text-xl animate-bounce opacity-70' />
      <FaRegStar className='absolute top-1/4 left-1/4 text-purple-300 text-lg animate-pulse opacity-70' />
      <FaRegStar className='absolute top-10 left-20 text-white animate-bounce opacity-70' />
      <FaRegStar className='absolute top-10 left-20 text-white text-xl animate-bounce opacity-70' />
      <FaRegStar className='absolute top-1/4 left-1/4 text-purple-300 text-lg animate-pulse opacity-70' />
      <FaRegStar className='absolute bottom-20 right-32 text-purple-200 text-lg animate-pulse opacity-70' />
      <FaRegStar className='absolute top-1/3 right-48 text-yellow-200 text-xs animate-ping opacity-70' />
      <FaRegStar className='absolute bottom-1/4 left-1/3 text-blue-200 text-lg animate-bounce opacity-70' />


      <FloatingDotsWrapper count={50} />

      <div className='relative p-10 text-center w-100'>
        <FaRegMoon className='mx-auto text-yellow-300 text-6xl animate-pulse opacity-80 mb-6' />

        <h1
          style={{
            fontFamily: "var(--font-sour-gummy)",
          }}
          className='text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-white to-yellow-300 bg-clip-text text-transparent'>
          Love Poem Generator
        </h1>

        <p style={{
          fontFamily: "var(--font-imperial)",
        }}
          className='text-3xl text-purple-100 mb-8'>
          Write love poems among the stars
        </p>

        <Link href="/Form">
          <button className='relative px-8 py-3 rounded-full font-semibold text-white bg-[linear-gradient(to_right,#a855f7_0%,#0a0e17_100%)] '>
            Begin Journey ✨
          </button>
        </Link>
      </div>
    </div>
  )
}