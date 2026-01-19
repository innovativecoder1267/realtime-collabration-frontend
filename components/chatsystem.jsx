 "use client";
import React, { useEffect, useRef, useState } from "react";
import socket from "./socket";
import { useSearchParams } from "next/navigation";

export default function ChatSystem({ setChatOpen, avatar }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [Typing, setTyping] = useState(false);

  const params = useSearchParams();
  const roomid = params.get("room");

  const maxmessages = 20;
  const typingRef = useRef(null);

  /* -------------------- TYPING HANDLER -------------------- */
  const handleTyping = (e) => {
    setInput(e.target.value);

    socket.emit("typing", { roomid, Typing: true });

    clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => {
      socket.emit("typing", { roomid, Typing: false });
    }, 2000);
  };

  /* -------------------- TYPING STATUS -------------------- */
  useEffect(() => {
    const handler = (status) => setTyping(status);
    socket.on("typing-status", handler);
    return () => socket.off("typing-status", handler);
  }, []);

  /* -------------------- LOAD CHAT FROM SESSION -------------------- */
  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("chat-history")) || [];
    setMessages(saved);
  }, []);

  /* -------------------- RECEIVE MESSAGE -------------------- */
  useEffect(() => {
    const handler = (messageObj) => {
      setMessages((prev) => {
        const updated = [...prev, messageObj];
        if (updated.length > maxmessages) updated.shift();
        sessionStorage.setItem("chat-history", JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("messages", handler);
    return () => socket.off("messages", handler);
  }, []);

  /* -------------------- SEND MESSAGE -------------------- */
  const handleSend = () => {
    if (!input.trim() || !roomid) return;

    const messageObj = {
      text: input,
      avatar,
      socketId: socket.id,
      time: Date.now(),
    };

    socket.emit("messages", {
      roomid,
      message: messageObj,
    });

    setMessages((prev) => {
      const updated = [...prev, messageObj];
      if (updated.length > maxmessages) updated.shift();
      sessionStorage.setItem("chat-history", JSON.stringify(updated));
      return updated;
    });

    socket.emit("typing", { roomid, Typing: false });
    clearTimeout(typingRef.current);
    setInput("");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 bg-white/80 backdrop-blur-md 
      border border-gray-300 shadow-xl rounded-2xl flex flex-col overflow-hidden z-50">

      {/* Header */}
      <div className="px-4 py-2 bg-gray-100 border-b flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700">Team Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 py-2 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => {
          const isMe = msg.socketId === socket.id;

          return (
            <div
              key={idx}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={msg.avatar}
                  className="h-7 w-7 rounded-full"
                />
              )}

              <div
                className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow
                  ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-blue-600 text-white rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>

              {isMe && (
                <img
                  src={avatar}
                  className="h-7 w-7 rounded-full"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Typing Indicator */}
      {Typing && (
        <div className="flex items-center gap-2 px-4 pb-2 text-sm text-gray-600">
          <img src={avatar} className="h-6 w-6 rounded-full" />
          <span className="animate-pulse">Typing</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm text-black focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}


