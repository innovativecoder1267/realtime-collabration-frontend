"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function RolePopup({ visible, message }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            fixed top-6 right-6 z-[99999]
            flex items-center gap-3
            px-5 py-3
            rounded-xl
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-lg
            shadow-xl
            border border-gray-200/40 dark:border-gray-700/40
            text-gray-900 dark:text-white
          "
        >
          <CheckCircle className="text-green-500" size={22} />

          <span className="text-sm font-medium">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}