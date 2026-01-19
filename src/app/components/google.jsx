"use client"
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function LoginButton() {

  const router=useRouter()
  useEffect(()=>{
    console.log("component mounted")
  },[])
  return (
    <GoogleLogin
      onSuccess={async(res)=>{
        console.log("here we go")
        try {
          const response=await axios.post("http://localhost:4000/authgoogle",{
          token:res.credential
          })
          if(response.status===200){
            alert("user logged in successfully!")
            console.log("GOOGLE RESPONSE ",response.data)
            router.push("/dashboard")
          }
          if(response.status===401){
          throw new console.error("Error occured-cant find the credential");
          
          }
        } catch (error) {
          
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}




 