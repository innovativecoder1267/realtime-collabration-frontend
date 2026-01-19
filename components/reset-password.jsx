"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function ResetPassword() {
  const route=useRouter();
    const searchparams=useSearchParams()
    const token=searchparams.get("token")
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    async function handleclick() {
        try {
            const response=await axios.post(" https://realtime-collabration-backend.onrender.com/reset",{
                token,
                newPassword,
                confirmPassword,
                
            })
            if(response.status===200){
              alert("Your password has been changed")
              route.push("/login")
            }
        } catch (error) {
            console.log("Error is:",error?.message)
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter a new password for your account.
        </p>

        <input
          type="password"
          value={newPassword}
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none"
        />

        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none"
        />

        <button
        onClick={handleclick}
          disabled={!newPassword || !confirmPassword}
          className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition
            ${!newPassword || !confirmPassword
              ? "cursor-not-allowed bg-gray-400"
              : "bg-black hover:bg-gray-800"}`}
        >
          Reset password
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Make sure both passwords match before submitting.
        </p>
      </div>
    </div>
  );
}
