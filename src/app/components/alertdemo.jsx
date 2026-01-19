"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";

export function AlertDemo({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <Alert
            className="
              flex items-center gap-3
              rounded-xl border border-white/10
              bg-black/70 text-white
              backdrop-blur-md
              shadow-2xl
              mt-1
            "
          >
            <CheckCircle2Icon className="h-5 w-5 opacity-80" />
            <AlertTitle className="text-sm font-medium">
              {message}
            </AlertTitle>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
