
"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
export default function OneTime() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [Otp,setotp]=useState("")
  const params=useSearchParams();
  
  useEffect(()=>{
    const otp=params.get("otp")
    setotp(otp)
  },[])

  async function handleClick() {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(
        "https://realtime-collabration-backend.onrender.com/verify",
        { otp }
      )

      if (response.status === 200) {
        alert("User verified successfully 🎉")
        router.push("/login")
      }
    } catch (error) {
      console.error(error)
      alert("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-[380px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Verify your email
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            We’ve sent a 6-digit verification code to your email
          </p>
        </div>

        {/* OTP INPUT */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="
            w-full
            text-center
            text-2xl
            tracking-[0.6em]
            py-4
            rounded-xl
            border
            border-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-black
            focus:border-black
            transition
          "
          placeholder="••••••"
        />

        {/* Button */}
        <button
          onClick={handleClick}
          disabled={loading || otp.length !== 6}
          className={`
            mt-6
            w-full
            py-3
            rounded-xl
            font-medium
            transition
            ${
              otp.length === 6
                ? "bg-black text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
          <p>
        otp is{Otp} for demo purposes 
        </p>

      </div>
    </div>
  )
}
