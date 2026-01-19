"use client"

export default function SpinnerButton({
  label = "Processing",
}) {
  return (
    <button
      disabled
      className="
        inline-flex items-center gap-3
        rounded-full
        bg-zinc-900/90
        px-6 py-3
        text-sm font-medium
        text-zinc-300
        shadow-md
        opacity-80
        cursor-not-allowed
      "
    >
      {/* Spinner */}
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400/40 border-t-zinc-300" />

      {/* Text */}
      <span>{label}</span>
    </button>
  )
}
