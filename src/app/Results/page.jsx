// "use client"

// import { useEffect, useState } from "react"
// import { generatePoem } from "@/lib/generatePoem"
// import html2canvas from "html2canvas"
// import { FaRedo, FaDownload, FaHome, FaLink } from "react-icons/fa"
// import Link from "next/link"
// import { useSearchParams } from "next/navigation"

// export default function ResultsPage() {

//   const searchParams = useSearchParams()

//   const [poem, setPoem] = useState("")
//   const [displayed, setDisplayed] = useState("")
//   const [form, setForm] = useState(null)
//   const [showShare, setShowShare] = useState(false)
//   const [isSharedView, setIsSharedView] = useState(false)

//   // LOAD FROM URL ONLY (single source of truth)
//   useEffect(() => {

//     const name = searchParams.get("name")
//     const nickname = searchParams.get("nickname")
//     const mood = searchParams.get("mood")
//     const color = searchParams.get("color")
//     const poemFromURL = searchParams.get("poem")

//     // Shared mode
//     if (poemFromURL) {
//       setIsSharedView(true)
//       setPoem(decodeURIComponent(poemFromURL))
//       setForm({
//         name: decodeURIComponent(name || ""),
//         nickname: decodeURIComponent(nickname || ""),
//         color: decodeURIComponent(color || "#ec4899"),
//       })
//       return
//     }

//     // Normal generation
//     if (name && nickname && mood) {
//       const parsed = {
//         name,
//         nickname,
//         mood,
//         color,
//       }
//       setForm(parsed)
//       setPoem(generatePoem(parsed))
//     }

//   }, [])

//   // Typing animation
//   useEffect(() => {
//     if (!poem) return
//     let i = 0
//     setDisplayed("")
//     const interval = setInterval(() => {
//       setDisplayed(poem.slice(0, i + 1))
//       i++
//       if (i >= poem.length) clearInterval(interval)
//     }, 30)
//     return () => clearInterval(interval)
//   }, [poem])

//   const handleRewrite = () => {
//     if (!form) return
//     setPoem(generatePoem(form))
//   }

//   const downloadCard = async () => {
//     const element = document.getElementById("capture-card")
//     if (!element) return

//     const canvas = await html2canvas(element, {
//       backgroundColor: null,
//       scale: 2,
//     })

//     const link = document.createElement("a")
//     link.download = "love-poem.png"
//     link.href = canvas.toDataURL()
//     link.click()
//   }

//   const copyLink = async () => {
//     const encodedPoem = encodeURIComponent(poem)
//     const encodedName = encodeURIComponent(form?.name || "")
//     const encodedNickname = encodeURIComponent(form?.nickname || "")
//     const encodedColor = encodeURIComponent(form?.color || "#ec4899")

//     const shareURL =
//       `${window.location.origin}/Results?poem=${encodedPoem}&name=${encodedName}&nickname=${encodedNickname}&color=${encodedColor}`

//     await navigator.clipboard.writeText(shareURL)
//     setShowShare(false)
//   }

//   const Card = ({ text }) => (
//     <div
//       style={{
//         background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)`
//       }}
//       className="relative py-10 px-6 rounded-3xl shadow-2xl text-center w-full"
//     >
//       {/* Decorative */}
//       <div className="absolute top-6 left-6 opacity-20 text-xl">💖</div>
//       <div className="absolute bottom-32 right-6 opacity-20 text-xl">✨</div>
//       <div className="absolute top-10 right-10 opacity-10 text-3xl">🌙</div>

//       {/* Name */}
//       {form?.name && (
//         <h1 className="uppercase text-white text-2xl tracking-widest">
//           {form.name}
//         </h1>
//       )}

//       {/* Nickname */}
//       {form?.nickname && (
//         <p className="text-white/80 text-sm italic mt-2">
//           “{form.nickname}”
//         </p>
//       )}

//       <div className="w-full h-0.5 bg-white/50 my-8" />

//       {/* Poem */}
//       <h2 className="text-white whitespace-pre-line leading-relaxed">
//         {text}
//       </h2>

//       <div className="mt-6 text-white/60 text-sm">
//         ✨ From your Love ✨
//       </div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)] px-6">

//       <div className="max-w-md w-full">
//         <Card text={isSharedView ? poem : displayed} />
//       </div>

//       {/* BUTTONS (hidden in shared mode) */}
//       {!isSharedView && (
//         <div className="mt-10 space-y-5 w-full max-w-md">

//           {/* Download */}
//           <button
//             onClick={downloadCard}
//             className="
//               group w-full py-4 rounded-2xl
//               bg-white/10 backdrop-blur-xl
//               border border-white/20
//               text-white font-semibold tracking-wide
//               flex items-center justify-center gap-3
//               transition-all duration-300
//               hover:scale-105 hover:bg-white/20
//               hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
//               active:scale-95
//             "
//           >
//             <FaDownload className="text-pink-300 group-hover:scale-110 transition" />
//             Download Card
//           </button>

//           {/* Rewrite */}
//           <button
//             onClick={handleRewrite}
//             className="
//               group w-full py-4 rounded-2xl
//               bg-linear-to-r from-purple-600 to-pink-600
//               text-white font-semibold tracking-wide
//               flex items-center justify-center gap-3
//               transition-all duration-300
//               hover:scale-105
//               hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]
//               active:scale-95
//             "
//           >
//             <FaRedo className="group-hover:rotate-180 transition duration-500" />
//             Write Another
//           </button>

//           {/* Share */}
//           <button
//             onClick={() => setShowShare(!showShare)}
//             className="
//               group w-full py-4 rounded-2xl
//               bg-pink-500/80 backdrop-blur-xl
//               text-white font-semibold tracking-wide
//               flex items-center justify-center gap-3
//               transition-all duration-300
//               hover:scale-105 hover:bg-pink-500
//               hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
//               active:scale-95
//             "
//           >
//             <FaLink className="group-hover:rotate-12 transition" />
//             Share With Crush
//           </button>

//           {/* Home */}
//           <Link href="/">
//             <button
//               className="
//                 group w-full py-4 rounded-2xl
//                 bg-white/5 backdrop-blur-xl
//                 border border-purple-400/40
//                 text-purple-200 font-semibold tracking-wide
//                 flex items-center justify-center gap-3
//                 transition-all duration-300
//                 hover:scale-105 hover:border-purple-300
//                 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
//                 active:scale-95
//               "
//             >
//               <FaHome className="group-hover:scale-110 transition" />
//               Back to Home
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* SHARE POPUP */}
//       {showShare && !isSharedView && (
//         <div className="fixed bottom-10 bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
//           <input
//             value={`${window.location.origin}/Results?poem=${encodeURIComponent(poem)}&name=${encodeURIComponent(form?.name || "")}&nickname=${encodeURIComponent(form?.nickname || "")}&color=${encodeURIComponent(form?.color || "#ec4899")}`}
//             readOnly
//             className="w-full p-2 rounded-lg border mb-3 text-sm"
//           />
//           <button
//             onClick={copyLink}
//             className="w-full py-2 rounded-lg bg-pink-500 text-white"
//           >
//             Copy Link
//           </button>
//         </div>
//       )}

//       {/* HIDDEN DOWNLOAD CARD */}
//       {!isSharedView && (
//         <div
//           style={{ position: "fixed", left: "-9999px", top: 0, background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)` }}>
//           <div
//             id="capture-card"
//             style={{
//               width: "1080px",
//               padding: "120px",
//               background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)` ,
//               borderRadius: "40px",
//               textAlign: "center",
//               boxShadow: "0 0 100px rgba(0,0,0,0.2)",
//             }}
//           >
//             <div className="absolute top-6 left-6 opacity-10 text-xl">💖</div>
//             <div className="absolute bottom-32 right-6 text-xl">✨</div>
//             <div className="absolute top-10 right-10 text-3xl">🌙</div>

//             <h1
//               style={{
//                 color: "#ffffff",
//                 fontSize: "60px",
//                 letterSpacing: "4px",
//                 marginBottom: "20px",
//                 textTransform: "uppercase",
//               }}
//             >
//               {form?.name}
//             </h1>

//             <div
//               style={{
//                 height: "2px",
//                 width: "100%",
//                 background: "rgba(255,255,255,0.5)",
//                 margin: "50px 0",
//               }}
//             />

//             <p
//               style={{
//                 color: "#ffffff",
//                 fontSize: "42px",
//                 lineHeight: "1.6",
//                 whiteSpace: "pre-line",
//               }}
//             >
//               {poem}
//             </p>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { generatePoem } from "@/lib/generatePoem"
import html2canvas from "html2canvas"
import { FaRedo, FaDownload, FaHome, FaLink } from "react-icons/fa"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResultsPage() {

  const searchParams = useSearchParams()

  const [poem, setPoem] = useState("")
  const [displayed, setDisplayed] = useState("")
  const [form, setForm] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const [isSharedView, setIsSharedView] = useState(false)

  // LOAD FROM URL ONLY (single source of truth)
  useEffect(() => {

    const name = searchParams.get("name")
    const nickname = searchParams.get("nickname")
    const mood = searchParams.get("mood")
    const color = searchParams.get("color")
    const poemFromURL = searchParams.get("poem")

    // Shared mode
    if (poemFromURL) {
      setIsSharedView(true)
      setPoem(decodeURIComponent(poemFromURL))
      setForm({
        name: decodeURIComponent(name || ""),
        nickname: decodeURIComponent(nickname || ""),
        color: decodeURIComponent(color || "#ec4899"),
      })
      return
    }

    // Normal generation
    if (name && nickname && mood) {
      const parsed = {
        name,
        nickname,
        mood,
        color,
      }
      setForm(parsed)
      setPoem(generatePoem(parsed))
    }

  }, [])

  // Typing animation
  useEffect(() => {
    if (!poem) return
    let i = 0
    setDisplayed("")
    const interval = setInterval(() => {
      setDisplayed(poem.slice(0, i + 1))
      i++
      if (i >= poem.length) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [poem])

  const handleRewrite = () => {
    if (!form) return
    setPoem(generatePoem(form))
  }

  const downloadCard = async () => {
    const element = document.getElementById("capture-card")
    if (!element) return

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    })

    const link = document.createElement("a")
    link.download = "love-poem.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const copyLink = async () => {
    const encodedPoem = encodeURIComponent(poem)
    const encodedName = encodeURIComponent(form?.name || "")
    const encodedNickname = encodeURIComponent(form?.nickname || "")
    const encodedColor = encodeURIComponent(form?.color || "#ec4899")

    const shareURL =
      `${window.location.origin}/Results?poem=${encodedPoem}&name=${encodedName}&nickname=${encodedNickname}&color=${encodedColor}`

    await navigator.clipboard.writeText(shareURL)
    setShowShare(false)
  }

  const Card = ({ text }) => (
    <div
      style={{
        background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)`
      }}
      className="relative py-10 px-6 rounded-3xl shadow-2xl text-center w-full"
    >
      {/* Decorative */}
      <div className="absolute top-6 left-6 opacity-20 text-xl">💖</div>
      <div className="absolute bottom-32 right-6 opacity-20 text-xl">✨</div>
      <div className="absolute top-10 right-10 opacity-10 text-3xl">🌙</div>

      {/* Name */}
      {form?.name && (
        <h1 className="uppercase text-white text-2xl tracking-widest">
          {form.name}
        </h1>
      )}

      {/* Nickname */}
      {form?.nickname && (
        <p className="text-white/80 text-sm italic mt-2">
          “{form.nickname}”
        </p>
      )}

      <div className="w-full h-0.5 bg-white/50 my-8" />

      {/* Poem */}
      <h2 className="text-white whitespace-pre-line leading-relaxed">
        {text}
      </h2>

      <div className="mt-6 text-white/60 text-sm">
        ✨ From your Love ✨
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_center,#1a103c_0%,#0a0e17_100%)] px-6">

      <div className="max-w-md w-full">
        <Card text={isSharedView ? poem : displayed} />
      </div>

      {/* BUTTONS (hidden in shared mode) */}
      {!isSharedView && (
        <div className="mt-10 space-y-5 w-full max-w-md">

          {/* Download */}
          <button
            onClick={downloadCard}
            className="
              group w-full py-4 rounded-2xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white font-semibold tracking-wide
              flex items-center justify-center gap-3
              transition-all duration-300
              hover:scale-105 hover:bg-white/20
              hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
              active:scale-95
            "
          >
            <FaDownload className="text-pink-300 group-hover:scale-110 transition" />
            Download Card
          </button>

          {/* Rewrite */}
          <button
            onClick={handleRewrite}
            className="
              group w-full py-4 rounded-2xl
              bg-linear-to-r from-purple-600 to-pink-600
              text-white font-semibold tracking-wide
              flex items-center justify-center gap-3
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]
              active:scale-95
            "
          >
            <FaRedo className="group-hover:rotate-180 transition duration-500" />
            Write Another
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShare(!showShare)}
            className="
              group w-full py-4 rounded-2xl
              bg-pink-500/80 backdrop-blur-xl
              text-white font-semibold tracking-wide
              flex items-center justify-center gap-3
              transition-all duration-300
              hover:scale-105 hover:bg-pink-500
              hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
              active:scale-95
            "
          >
            <FaLink className="group-hover:rotate-12 transition" />
            Share With Crush
          </button>

          {/* Home */}
          <Link href="/">
            <button
              className="
                group w-full py-4 rounded-2xl
                bg-white/5 backdrop-blur-xl
                border border-purple-400/40
                text-purple-200 font-semibold tracking-wide
                flex items-center justify-center gap-3
                transition-all duration-300
                hover:scale-105 hover:border-purple-300
                hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
                active:scale-95
              "
            >
              <FaHome className="group-hover:scale-110 transition" />
              Back to Home
            </button>
          </Link>
        </div>
      )}

      {/* SHARE POPUP */}
      {showShare && !isSharedView && (
        <div className="fixed bottom-10 bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
          <input
            value={`${window.location.origin}/Results?poem=${encodeURIComponent(poem)}&name=${encodeURIComponent(form?.name || "")}&nickname=${encodeURIComponent(form?.nickname || "")}&color=${encodeURIComponent(form?.color || "#ec4899")}`}
            readOnly
            className="w-full p-2 rounded-lg border mb-3 text-sm"
          />
          <button
            onClick={copyLink}
            className="w-full py-2 rounded-lg bg-pink-500 text-white"
          >
            Copy Link
          </button>
        </div>
      )}

      {/* HIDDEN DOWNLOAD CARD */}
      {!isSharedView && (
        <div
          style={{ position: "fixed", left: "-9999px", top: 0, background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)` }}>
          <div
            id="capture-card"
            style={{
              width: "1080px",
              padding: "120px",
              background: `linear-gradient(145deg, ${form?.color || "#ec4899"}, #ffffff22)` ,
              borderRadius: "40px",
              textAlign: "center",
              boxShadow: "0 0 100px rgba(0,0,0,0.2)",
            }}
          >
            <div className="absolute top-6 left-6 opacity-10 text-xl">💖</div>
            <div className="absolute bottom-32 right-6 text-xl">✨</div>
            <div className="absolute top-10 right-10 text-3xl">🌙</div>

            <h1
              style={{
                color: "#ffffff",
                fontSize: "60px",
                letterSpacing: "4px",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              {form?.name}
            </h1>

            <div
              style={{
                height: "2px",
                width: "100%",
                background: "rgba(255,255,255,0.5)",
                margin: "50px 0",
              }}
            />

            <p
              style={{
                color: "#ffffff",
                fontSize: "42px",
                lineHeight: "1.6",
                whiteSpace: "pre-line",
              }}
            >
              {poem}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}