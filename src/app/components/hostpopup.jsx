"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function HostVoicePopup({
  name,
  avatar,
  onAccept,
  onReject,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 right-6 z-[999999]
                   w-80 rounded-2xl bg-white shadow-2xl p-4"
      >
        <div className="flex items-center gap-3">
          <img src={avatar} className="h-12 w-12 rounded-full border" />
          <div>
            <h3 className="text-black font-semibold">Voice Request</h3>
            <p className="text-xs text-gray-500">{name} wants to talk</p>
          </div>
        </div>

        <div className="my-4 h-px bg-gray-200" />

        <div className="flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 py-2 rounded bg-gray-200"
          >
            Reject
          </button>

          <button
            onClick={onAccept}
            className="flex-1 py-2 rounded bg-indigo-600 text-white"
          >
            Accept
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}