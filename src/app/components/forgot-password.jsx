"use client"

import React, { useState } from "react";
import axios from "axios";
export default function Forgot() {
  const [useremail, setuseremail] = useState("");
  const [loading, setloading] = useState(false);
  const [mailsent,setmailsent]=useState(false)
 async function handleclick(){
    setloading(true)
    try {
        const response=await axios.post("https://realtime-collabration-backend.onrender.com/forgot",{
            email:useremail
        })
        if(response.status===200){
            alert("Reset mail has been sended to your mail")
            setmailsent(true)//mail sent is initialized to true
            setloading(false)
        }
    } catch (error) {
        console.log("Error is",error?.message)
        setloading(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter your email and we’ll send you a reset link.
        </p>

        <input
          type="email"
          value={useremail}
          placeholder="Enter your email"
          onChange={(e) => setuseremail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none"
        />

        <button
        onClick={handleclick}
          disabled={loading || !useremail}
          className={`mt-6 w-full rounded-lg py-3 text-sm font-semibold text-white transition
            ${loading || !useremail 
              ? "cursor-not-allowed bg-gray-400" 
              : "bg-black hover:bg-gray-800"}`}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          You’ll receive a secure link if this email exists.
        </p>
      </div>
    </div>
  );
}
