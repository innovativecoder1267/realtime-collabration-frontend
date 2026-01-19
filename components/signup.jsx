 

"use client"
import { useState } from "react"
import LoginButton from "./google"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Register() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setusername] = useState("")
  const [avatar, setavatar] = useState("")
  const router = useRouter()

  const avatarList = [
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=User2",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Alpha",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Bravo",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Sam",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Neo",
    "https://api.dicebear.com/7.x/big-smile/svg?seed=Joy",
    "https://api.dicebear.com/7.x/big-smile/svg?seed=Shadow",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rex",
"    https://api.dicebear.com/7.x/pixel-art/svg?seed=User1",
"https://api.dicebear.com/7.x/pixel-art/svg?seed=User2",
"https://api.dicebear.com/7.x/pixel-art/svg?seed=User3",
"https://api.dicebear.com/7.x/pixel-art/svg?seed=User4",
"https://api.dicebear.com/7.x/pixel-art/svg?seed=User5"

  ]

  async function handleclick() {
    try {
      const response = await axios.post(" https://realtime-collabration-backend.onrender.com/register", {
        email,
        password,
        username,
        avatar,
      })

      if (response.status === 200) {
        alert("congrats you are signedup")
        router.push("/verify")
      }
    } catch (error) {
      if (error.response.status===403||500) {
        alert("User already registered plz signup")
      }
        else {
          alert(error.response.data.message || "Failed to signup")
        }
    
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">
          Sign Up
        </h2>

        <LoginButton />

     

        <p className="text-center text-gray-500 mb-6 text-sm">
          Or sign up with email
        </p>

        {/* INPUT FIELDS */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm 
            focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />
        </div>

        {/* Avatar Preview */}
   

{/* Avatar Preview */}
<div className="text-sm font-semibold mt-6 mb-2">Choose Your Avatar</div>

<div className="flex justify-center mb-4">
  {avatar ? (
    <img
      src={avatar}
      className="w-24 h-24 rounded-full border-4 border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm shadow-inner">
      Preview
    </div>
  )}
</div>

{/* Avatar Grid */}
<div className="grid grid-cols-4 gap-3">
  {avatarList.map((link, index) => (
    <div
      key={index}
      onClick={() => setavatar(link)}
      className={`p-1 rounded-full cursor-pointer transition-all duration-200
        ${
          avatar === link
            ? "ring-2 ring-black scale-110 shadow-md"
            : "hover:scale-105"
        }`}
    >
      <img
        src={link}
        className="w-14 h-14 rounded-full border border-white shadow-sm"
      />
    </div>
  ))}
</div>

        {/* Button */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-semibold mt-6 
          hover:bg-gray-800 transition shadow-md hover:shadow-lg"
          onClick={handleclick}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}





//"http://localhost:4000/register"