"use client"
import { useState } from "react"
import LoginButton from "./google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function Login() {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isSubmitting,setisSubmitting]=useState(false)
    const [Message,SetMessage]=useState("")
async function handleclick() {
  // console.log(process.env.process.env.NEXT_PUBLIC_BACKEND_URL)
  if(isSubmitting)return;
  setisSubmitting(true)
  try {
    const response = await axios.post(`https://realtime-collabration-backend.onrender.com/login`, {
      email: email,
      password: password
    });

    if (response.status === 200) {
      const token=response.data.refreshtoken
      localStorage.setItem("token",token);
      SetMessage("Redirecting to Dashboard")
      

      router.push("/dashboard")
    }
 
   
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        alert("Plz verify the user ");
        setloggedin(false)
      }
      else {        
        alert(error.response.data.message || "Failed to login");
        console.log("error is ",error)
        setloggedin(false)
      }
    } else {
      alert("Cannot connect to server. Maybe backend not running?");
      setloggedin(false)
    }
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-50">
        <div>
            <img src="" alt="" />
        </div>
      <div className="bg-white p-8 rounded-2xl  w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <LoginButton/>
       
      <p className="text-center font-light m-8">Or signin with email</p>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setemail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        />
         
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
          
          className="w-full mb-6 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        />
      
        <div className="text-right ">
    <button
    onClick={() => router.push("/forgot-password")}
    className="text-sm text-gray-500 mb-4 hover:text-black"
  >
    Forgot password?
      </button>
        </div>


        <button  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
        onClick={handleclick}
        >
          {Message||"login"}
           </button>
       
         
      </div>
    </div>
  );
}

