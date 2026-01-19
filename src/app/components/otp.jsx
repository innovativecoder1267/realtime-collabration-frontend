 
"use client"
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function OneTime() {
  const router=useRouter()
  const [email, setemail] = useState("")
  const [otp, setotp] = useState(null)

  async function handleclick() {

    if(otp==null){
      alert("Enter the otp ")
    }
    try {
      const response = await axios.post(
        "https://realtime-collabration-backend.onrender.com/verify",
        { otp: otp }
      )

      if (response.status === 200) {
        alert("User verified successfully")
        router.push("/login")
      }
    } catch (error) {
      console.error(error)
      alert("Verification failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="flex flex-col items-center gap-6">
        
        <p className="text-gray-400">
          Verification code sent to your email
        </p>

        {/* OTP BOX UI */}
     <input
  type="text"
  inputMode="numeric"
  maxLength={6}
  value={otp}
  onChange={(e) => setotp(e.target.value)}
  className="
    w-[340px]
    bg-transparent
   n
    caret-white
    text-2xl
    tracking-[2.2em]
    py-4
    focus:outline-none
    text-black
  "
  style={{
    backgroundImage:
      "repeating-linear-gradient(to right, transparent 0, transparent 34px, #4b5563 34px, #4b5563 36px)",
    backgroundSize: "36px 2px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "bottom",
  }}
/>


       
          <button
            onClick={handleclick}
            className="
              mt-2
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              font-medium
              hover:bg-black
              transition
            "
          >
            Verify OTP
          </button>
   
      </div>
    </div>
  )
}
