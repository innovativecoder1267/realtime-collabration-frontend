
export default function InCallControls({ onLeave,isMuted,onMute}) {
  return (
    <div
      className="
        fixed top-4 right-6 
        flex items-center gap-2
        rounded-xl
       
        px-3 py-2
      
        text-white mr-65
      "
    >
      {/* Mute */}
      <button
        className="
          px-3 py-1.5
          rounded-lg
          text-sm font-medium tracking-tight
          bg-neutral-800 hover:bg-neutral-700
          transition-colors
        "
        onClick={onMute}
      >
        {isMuted? "unmute":"mute"}
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-white/10" />

      {/* Leave */}
      <button
        onClick={onLeave}
        className="
          px-3 py-1.5
          rounded-lg
          text-sm font-medium tracking-tight
          bg-red-500/10 text-red-400
          hover:bg-red-500/20 hover:text-red-300
          transition-colors
        "
      >
        Leave
      </button>
    </div>
  );
}
