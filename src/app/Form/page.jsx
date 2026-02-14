"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { FaRegStar, FaArrowAltCircleLeft } from 'react-icons/fa'
import Link from 'next/link'

export default function Page() {

    const router = useRouter()

    const [form, setForm] = useState({
        name: "",
        nickname: "",
        mood: "Romantic",
        color: "#ec4899",
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name.trim() || !form.nickname.trim()) {
            alert("Please fill in the name and nickname 💖")
            return
        }

        const query = new URLSearchParams(form).toString()
        router.push(`/Loading?${query}`)
    }

    return (
        <div className='relative min-h-screen flex px-6 sm:px-0 items-center justify-center bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)]'>

            <FaRegStar className='absolute top-10 left-20 text-white animate-bounce opacity-70' />
            <FaRegStar className='absolute top-10 left-20 text-white text-xl animate-bounce opacity-70' />
            <FaRegStar className='absolute top-1/4 left-1/4 text-purple-300 text-lg animate-pulse opacity-70' />
            {/* <FaRegStar className='absolute bottom-20 right-32 text-purple-200 text-lg animate-pulse opacity-70' />
            <FaRegStar className='absolute top-1/3 right-48 text-yellow-200 text-xs animate-ping opacity-70' />
            <FaRegStar className='absolute bottom-1/4 left-1/3 text-blue-200 text-lg animate-bounce opacity-70' /> */}
            

            <div className="relative w-full max-w-md px-6 py-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">

                <form onSubmit={handleSubmit} className="space-y-6 text-yellow-300">

                    <Link href="/">
                        <FaArrowAltCircleLeft />
                    </Link>

                    <h2 className='text-center text-2xl mt-6'>
                        Tell the stars about your love
                    </h2>

                    {/* <input
            type="text"
            placeholder="Enter name..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/10 rounded-lg px-4 py-3"
          /> */}



                    <div className="mt-6">
                        <label className="block mb-2 text-sm sm:text-base">To whom</label>
                        <input
                            type="text"
                            placeholder="Enter name..."
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-white/5 border border-purple-500 rounded-lg px-4 py-3 text-white 
                             placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 
                             focus:border-transparent transition-all duration-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">Choose Color</label>
                        <div className="flex gap-4">
                            {[
                                "#ec4899",
                                "#3b82f6",
                                "#22c55e",
                                "#f59e0b",
                                "#a855f7",
                            ].map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setForm({ ...form, color })}
                                    className={`w-7 h-7 rounded-full cursor-pointer border-2 transition hover:scale-110 ${form.color === color
                                        ? "border-white scale-110"
                                        : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* <input
            type="text"
            placeholder="Sweet nickname..."
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            className="w-full bg-white/10 rounded-lg px-4 py-3"
          /> */}

                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Nickname</label>
                        <input
                            type="text"
                            placeholder="Sweet nickname..."
                            value={form.nickname}
                            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                            className="w-full bg-white/5 border border-purple-500 rounded-lg px-4 py-3 text-white placeholder-white/30 
                            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Relationship</label>
                        <select
                            value={form.relationship}
                            onChange={(e) =>
                                setForm({ ...form, relationship: e.target.value })
                            }
                            className="w-full bg-black border border-purple-500 rounded-lg px-4 py-3 text-white 
                             focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                        >
                            <option value="friend">Friend</option>
                            <option value="partner">Partner</option>
                            <option value="crush">Crush</option>
                            <option value="spouse">Spouse</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {["Romantic", "Playful", "Funny", "Tender"].map(item => (
                            <div
                                key={item}
                                onClick={() => setForm({ ...form, mood: item })}
                                className={`p-3 text-center rounded-xl cursor-pointer ${form.mood === item ? "bg-purple-400 text-black" : "bg-white/10"
                                    }`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-purple-600 hover:scale-105 transition"
                    >
                        Weave the stars ✨
                    </button>
                </form>
            </div>
        </div>
    )
}