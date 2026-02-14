// "use client"
// import React, { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from "next/navigation"
// import { motion } from "framer-motion"
// import { FaHeart, FaRegStar } from "react-icons/fa"
// import FloatingDots from '../components/FloatingDots'

// export default function LoadingPage() {

//   const FloatingDotsWrapper = ({ count }) => {
//     const [mounted, setMounted] = useState(false)
//     useEffect(() => setMounted(true), [])
//     if (!mounted) return null
//     return <FloatingDots count={count} />
//   }


//   const router = useRouter()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push(`/Results?${searchParams.toString()}`)
//     }, 2500)

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)]">

//       <FaRegStar className='absolute top-10 left-20 text-white animate-bounce opacity-70' />
//       <FaRegStar className='absolute top-10 left-20 text-white text-xl animate-bounce opacity-70' />
//       <FaRegStar className='absolute top-1/4 left-1/4 text-purple-300 text-lg animate-pulse opacity-70' />
//       <FaRegStar className='absolute bottom-20 right-32 text-purple-200 text-lg animate-pulse opacity-70' />
//       <FaRegStar className='absolute top-1/3 right-48 text-yellow-200 text-xs animate-ping opacity-70' />
//       <FaRegStar className='absolute bottom-1/4 left-1/3 text-blue-200 text-lg animate-bounce opacity-70' />


//       <FloatingDotsWrapper count={60} />

//       <motion.div
//         animate={{ x: [0, 40, 0] }}
//         transition={{ repeat: Infinity, duration: 1 }}
//       >
//         <FaHeart className="text-pink-400 text-4xl" />
//       </motion.div>

//       <p className="absolute bottom-40 text-purple-200">
//         Writing something magical...
//       </p>
//     </div>
//   )
// }

"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"

function LoadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/Results?${searchParams.toString()}`)
    }, 2500)

    return () => clearTimeout(timer)
  }, [router, searchParams])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)]">

      <motion.div
        animate={{ x: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="absolute"
      >
        <FaHeart className="text-pink-400 text-4xl" />
      </motion.div>

      <motion.div
        animate={{ x: [40, 0, 40] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="absolute"
      >
        <FaHeart className="text-purple-400 text-4xl" />
      </motion.div>

      <p className="absolute bottom-40 text-purple-200 text-lg">
        Writing something magical...
      </p>
    </div>
  )
}

export default function LoadingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoadingContent />
    </Suspense>
  )
}