 
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Copy, X } from "lucide-react";

export default function Invite() {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const roomParam = params.get("room");

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function createRoomAndRedirect() {
      try {
        const res = await axios.post(
          "https://realtime-collabration-backend.onrender.com/roomid",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const roomId = res.data.data.roomId;
        const inviteURL = `https://realtime-collabration-frontend.vercel.app/dashboard?room=${roomId}`;
        setUrl(inviteURL);

        if (!roomParam) {
          router.replace(`/dashboard?room=${roomId}`);
        }
      } catch (error) {
        console.error("❌ Room create failed:", error);
      }
    }

    async function verifyAndJoin() {
      try {
        await axios.post(
          "https://realtime-collabration-backend.onrender.com/entrypoint",
          { roomid: roomParam }
        );
        setUrl(window.location.href);
      } catch (error) {
        alert("❌ Invalid or expired room");
        router.replace("/dashboard");
      }
    }

    if (roomParam) verifyAndJoin();
    else createRoomAndRedirect();
  }, []);

  /* =========================
     COPY WITH FALLBACK LOGIC
     ========================= */
  const handleCopy = async () => {
    // Modern way
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        triggerCopied();
        return;
      } catch (err) {
        // fallback below
      }
    }

    // 🔁 Old-school fallback (still reliable)
    try {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      triggerCopied();
    } catch (err) {
      alert("❌ Copy failed, please copy manually");
    }
  };

  const triggerCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[420px] rounded-2xl bg-[#1c1d22] text-white shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Live collaboration</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-white/70 mb-1 block">
              Invite link
            </label>

            <div className="flex items-center gap-2 bg-[#2a2b31] border border-white/10 rounded-xl px-3 py-2">
              <input
                value={url}
                readOnly
                className="flex-1 bg-transparent outline-none text-sm text-white/90 truncate"
              />

              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-300
                  ${
                    copied
                      ? "bg-green-600 scale-105"
                      : "bg-[#6c6cff] hover:bg-[#7d7dff]"
                  }
                `}
              >
                {copied ? (
                  <span className="flex items-center gap-1 animate-fade-in">
                    ✅ Copied
                  </span>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="text-xs text-white/60 leading-relaxed pt-2 border-t border-white/10">
            🔒 Your session is end-to-end encrypted and fully private.  
            Only invited members can join this room.
          </div>
        </div>
      </div>
    </div>
  );
}



